import os
import sys
import time
import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

import google.generativeai as genai
from dotenv import load_dotenv

from openclaw import calendar_module, gmail_module, tasks_module, sheets_module
from flask import Flask, request, jsonify
import threading
import queue

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Menggunakan Gemini 3.1 Flash Lite untuk Kecepatan & Limit Tinggi
model = genai.GenerativeModel('gemini-3.1-flash-lite')

TARGET_PHONE = "6285191769521"
SENDER_FILTER = "goldnation" 
# ID Spreadsheet untuk Log (Anda bisa ganti dengan ID sheet Anda nanti)
LOG_SHEET_ID = None 

# Antrean pesan dari Webhook
message_queue = queue.Queue()
# Antrean jadwal (list of dicts)
scheduled_tasks = []
app = Flask(__name__)

@app.route('/webhook/order', methods=['POST'])
def order_webhook():
    data = request.json
    print(f"📦 Webhook: Pesanan baru diterima dari {data.get('buyerName')}")
    
    # Generate Pesan Konfirmasi via Gemini
    prompt = f"""
    Kamu adalah asisten kasual OpenClaw. Buat pesan konfirmasi pesanan WhatsApp yang sangat ramah dan kasual.
    Detail Pesanan:
    - Nama Pembeli: {data.get('buyerName')}
    - Produk: {data.get('product')}
    - Total: Rp {data.get('total', 0):,}
    - Alamat: {data.get('location')}
    
    Estimasi waktu pengantaran: 30-60 menit (kasih info ini secara ramah).
    Gunakan emoji yang sesuai. Sebutkan bahwa pembayaran sudah diterima.
    Hanya berikan teks pesan saja.
    """
    ai_message = get_gemini_response(prompt)
    
    # Masukkan ke antrean untuk dikirim via Selenium
    message_queue.put({
        "phone": data.get("waNumber"),
        "text": ai_message
    })
    
    return jsonify({"status": "queued", "message": ai_message}), 200

@app.route('/webhook/schedule', methods=['POST'])
def schedule_webhook():
    data = request.json
    print(f"⏰ Webhook: Jadwal baru diterima untuk {data.get('time')}")
    
    # 1. Tambahkan ke Google Calendar menggunakan module yang ada
    try:
        cal_service = calendar_module.get_calendar_service()
        # Event start/end (buat durasi 30 menit)
        start_time = data.get('time')
        # Parse ISO string to add 30 mins
        dt = datetime.datetime.fromisoformat(start_time.replace('Z', '+00:00'))
        end_time = (dt + datetime.timedelta(minutes=30)).isoformat()
        
        calendar_module.add_calendar_event(
            cal_service, 
            f"🚀 Post Promosi: {data.get('product', 'Campaign')}", 
            data.get('text'), 
            dt.isoformat(), 
            end_time
        )
        print("✅ Event ditambahkan ke Google Calendar.")
    except Exception as e:
        print(f"⚠️ Gagal ke Calendar: {e}")

    # 2. Simpan ke list tugas terjadwal
    scheduled_tasks.append({
        "time": data.get('time'),
        "text": data.get('text'),
        "target": data.get('target', 'GROUP'),
        "done": False
    })
    
    return jsonify({"status": "scheduled"}), 200

def run_flask():
    app.run(port=5001, use_reloader=False)

def get_gemini_response(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error AI: {e}"

def send_wa_message_stable(driver, message):
    """Mengirim pesan via WA menggunakan metode JS Paste yang lebih stabil"""
    try:
        chat_box_selector = 'div[data-testid="conversation-compose-box-input"]'
        chat_box = driver.find_element(By.CSS_SELECTOR, chat_box_selector)
        
        script = """
        var dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', arguments[1]);
        var event = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true,
            cancelable: true
        });
        arguments[0].focus();
        arguments[0].dispatchEvent(event);
        """
        driver.execute_script(script, chat_box, message)
        time.sleep(1)
        chat_box.send_keys(Keys.ENTER)
        return True
    except:
        return False

def process_wa_intent(text, cal_service, gmail_service):
    """Menganalisis pesan untuk Kalender, Task, Log, Email, atau Chat biasa"""
    prompt = f"""
    Analisis pesan: "{text}"
    Tentukan apakah user ingin:
    1. Menambah Jadwal Kalender (is_calendar: true)
    2. Menambah Tugas/To-do (is_task: true)
    3. Mencatat sesuatu ke Log/Sheets (is_log: true)
    4. Mengirim Email (is_email: true)
    5. Ngobrol santai atau tanya jawab (is_chat: true)

    Waktu sekarang: {datetime.datetime.now().isoformat()}

    Kembalikan format persis JSON berikut:
    {{
        "type": "calendar" | "task" | "log" | "email" | "chat",
        "summary": "judul kalender, tugas, isi log, isi email, atau jawaban ngobrol",
        "notes": "catatan tambahan jika ada",
        "start_iso": "YYYY-MM-DDTHH:MM:SS",
        "end_iso": "YYYY-MM-DDTHH:MM:SS",
        "email_to": "emailtujuan@example.com (hanya jika type email)",
        "email_subject": "subjek email (hanya jika type email)",
        "reply": "jawaban bot yang ramah dan kasual (hanya jika type chat)"
    }}
    Hanya JSON mentah tanpa markdown.
    """
    response_text = get_gemini_response(prompt)
    try:
        import json
        clean_json = response_text.replace('```json', '').replace('```', '').strip()
        data = json.loads(clean_json)
        
        if data.get('type') == 'calendar':
            calendar_module.add_calendar_event(cal_service, data['summary'], data.get('notes', ''), data['start_iso'], data['end_iso'])
            return f"✅ Jadwal '{data['summary']}' ditambahkan ke Kalender!"
        
        elif data.get('type') == 'task':
            tasks_module.add_task(data['summary'], data.get('notes', ''))
            return f"📌 Tugas '{data['summary']}' ditambahkan ke Google Tasks!"
            
        elif data.get('type') == 'log' and LOG_SHEET_ID:
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            sheets_module.append_to_sheet(LOG_SHEET_ID, "Sheet1!A1", [[now, "User Log", data['summary']]])
            return f"📝 Catatan '{data['summary']}' telah disimpan di Sheets!"
            
        elif data.get('type') == 'email':
            gmail_module.send_email(gmail_service, data.get('email_to'), data.get('email_subject'), data.get('summary'))
            return f"📧 Email dengan subjek '{data.get('email_subject')}' berhasil dikirim ke {data.get('email_to')}!"
            
        elif data.get('type') == 'chat':
            return data.get('reply', 'Maaf, saya tidak begitu paham maksud Anda. Ada yang bisa dibantu?')
            
    except Exception as e:
        print("Error memproses AI Intent:", e)
        pass
    return None

def main():
    global LOG_SHEET_ID
    print("=== OpenClaw AI Assistant (Gemini 3.1 Flash Lite) ===", flush=True)
    
    cal_service = calendar_module.get_calendar_service()
    gmail_service = gmail_module.get_gmail_service()
    
    # Inisialisasi Log Sheet jika belum ada
    if not LOG_SHEET_ID:
        try:
            LOG_SHEET_ID = sheets_module.create_new_sheet(f"OpenClaw_Log_{datetime.date.today()}")
            print(f"✅ Log Sheet dibuat: {LOG_SHEET_ID}")
        except:
            print("⚠️ Gagal membuat Log Sheet, melewati fitur logging.")

    print("Membuka WhatsApp Web...", flush=True)
    profile_dir = os.path.join(os.getcwd(), "whatsapp_profile")
    chrome_options = Options()
    chrome_options.add_argument(f"user-data-dir={profile_dir}")
    chrome_options.add_argument("--log-level=3")
    
    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 120)
    
    driver.get(f"https://web.whatsapp.com/send?phone={TARGET_PHONE}")
    wait.until(EC.presence_of_element_located((By.ID, 'main')))
    print("✅ WhatsApp Terhubung.", flush=True)

    # Jalankan Flask di Background
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    print("🚀 Webhook Server jalan di port 5001", flush=True)

    last_wa_message = ""
    processed_email_ids = set()

    try:
        while True:
            # 1. CEK GMAIL
            email = gmail_module.get_latest_unread_email(gmail_service, sender_filter=SENDER_FILTER)
            if email and email['id'] not in processed_email_ids:
                processed_email_ids.add(email['id'])
                msg = f"📩 *Email Baru dari {SENDER_FILTER}!*\n\n*Subjek:* {email['subject']}\n*Isi:* {email['body']}..."
                print(f"📧 Notifikasi email: {email['subject']}", flush=True)
                send_wa_message_stable(driver, msg)

            # 2. CEK WHATSAPP (Input AI) - Auto Reply DIHIDUPKAN
            try:
                unread_badges = driver.find_elements(By.XPATH, "//span[@aria-label and contains(@aria-label, 'unread message')]")
                if unread_badges:
                    for badge in unread_badges:
                        # Buka chat
                        chat_div = badge.find_element(By.XPATH, "../../..")
                        chat_div.click()
                        time.sleep(2)
                        
                        # Ambil teks pesan masuk terakhir
                        messages = driver.find_elements(By.CSS_SELECTOR, "div.message-in span.selectable-text")
                        if messages:
                            last_text = messages[-1].text
                            print(f"📥 Pesan WA masuk: {last_text}", flush=True)
                            
                            # Proses menggunakan AI
                            reply = process_wa_intent(last_text, cal_service, gmail_service)
                            if reply:
                                send_wa_message_stable(driver, reply)
                                print(f"🤖 Membalas: {reply}", flush=True)
                                time.sleep(2)
                                
                        # Kembali ke target utama agar tidak terpaku pada satu chat
                        driver.get(f"https://web.whatsapp.com/send?phone={TARGET_PHONE}")
                        wait.until(EC.presence_of_element_located((By.ID, 'main')))
            except Exception as e:
                pass

            # 3. CEK ANTREAN WEBHOOK (Pesanan Baru)
            while not message_queue.empty():
                order = message_queue.get()
                print(f"📤 Mengirim konfirmasi pesanan ke {order['phone']}...", flush=True)
                # Navigasi ke nomor pembeli
                driver.get(f"https://web.whatsapp.com/send?phone={order['phone']}")
                try:
                    wait.until(EC.presence_of_element_located((By.ID, 'main')))
                    time.sleep(2) # Tunggu sebentar agar stabil
                    send_wa_message_stable(driver, order['text'])
                    print(f"✅ Konfirmasi pesanan terkirim ke {order['phone']}!", flush=True)
                    # Kembalikan ke target utama (opsional)
                    driver.get(f"https://web.whatsapp.com/send?phone={TARGET_PHONE}")
                    wait.until(EC.presence_of_element_located((By.ID, 'main')))
                except:
                    print(f"❌ Gagal mengirim ke {order['phone']}")

            # 4. CEK JADWAL PROMOSI
            now = datetime.datetime.now()
            for task in scheduled_tasks:
                if not task["done"]:
                    task_time = datetime.datetime.fromisoformat(task["time"].replace('Z', '+00:00')).replace(tzinfo=None)
                    if now >= task_time:
                        print(f"🚀 Saatnya posting promosi terjadwal!", flush=True)
                        # Navigasi ke target (Asumsi: Untuk grup, user harus sedia chat-nya atau pakai link)
                        # Kita gunakan target phone sebagai fallback atau pencarian grup
                        # Di sini kita kirim ke TARGET_PHONE (Grup Kampus)
                        send_wa_message_stable(driver, f"*Pesan Terjadwal Otomatis:*\n\n{task['text']}")
                        task["done"] = True
                        print(f"✅ Promosi terjadwal berhasil dikirim!", flush=True)

            time.sleep(10) # Cek lebih cepat (10 detik)

    except KeyboardInterrupt:
        print("\nBerhenti.", flush=True)
    finally:
        driver.quit()

if __name__ == "__main__":
    main()


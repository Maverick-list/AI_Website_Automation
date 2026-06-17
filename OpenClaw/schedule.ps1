# schedule.ps1 - Skrip triple broadcast otomatis WhatsApp OpenClaw
# PERINGATAN TEGAS: SCRIPT INI HANYA UNTUK BROADCAST SATU ARAH KE GROUP ID.
# SCRIPT INI TIDAK AKAN PERNAH MEMBALAS CHAT KONTAK ORANG LAIN (TIDAK ADA AUTO-REPLY).

$GroupID = "120363401263735503@g.us"

# Konfigurasi Broadcast 1
$MessagePath1 = "$PSScriptRoot\message.txt"
$MessageText1 = Get-Content -Raw -Encoding UTF8 $MessagePath1

# Konfigurasi Broadcast 2
$MessagePath2 = "$PSScriptRoot\message2.txt"
if (Test-Path $MessagePath2) {
    $MessageText2 = Get-Content -Raw -Encoding UTF8 $MessagePath2
} else {
    $MessageText2 = "Pesan Broadcast 2 (message2.txt tidak ditemukan)"
}

# Konfigurasi Broadcast 3
$MessagePath3 = "$PSScriptRoot\message3.txt"
if (Test-Path $MessagePath3) {
    $MessageText3 = Get-Content -Raw -Encoding UTF8 $MessagePath3
} else {
    $MessageText3 = "Pesan Broadcast 3 (message3.txt tidak ditemukan)"
}

# Interval dalam detik (Masing-masing 5 menit)
$Interval1 = 5 * 60 # 5 menit
$Interval2 = 5 * 60 # 5 menit
$Interval3 = 5 * 60 # 5 menit

# Set waktu jalan berikutnya (Jeda 2 menit antar broadcast)
$NextRun1 = (Get-Date)
$NextRun2 = (Get-Date).AddMinutes(2)
$NextRun3 = (Get-Date).AddMinutes(4)

Write-Host "=========================================================="
Write-Host "         AUTOMASI TRIPLE BROADCAST (SATU ARAH)            "
Write-Host "=========================================================="
Write-Host "[INFO TEGAS] Script ini HANYA mengirim broadcast."
Write-Host "[INFO TEGAS] TIDAK AKAN PERNAH membalas chat kontak lain."
Write-Host "=========================================================="
Write-Host "Broadcast 1 (Ayam Geprek) : Setiap 5 Menit"
Write-Host "Broadcast 2 (Piscok)      : Setiap 5 Menit"
Write-Host "Broadcast 3 (Crunchy Roll): Setiap 5 Menit"
Write-Host "Jeda Antar Tipe Broadcast : 2 Menit"
Write-Host "=========================================================="

while ($true) {
    # Cek log gateway apakah ada kata "BERHENTI!" dari nomor Bos
    $logDir = "$env:LOCALAPPDATA\Temp\openclaw"
    $latestLog = Get-ChildItem "$logDir\openclaw-*.log" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if ($latestLog) {
        $stopCommand = Select-String -Path $latestLog.FullName -Pattern "6285191769521" | Where-Object { $_.Line -match "BERHENTI!" }
        if ($stopCommand) {
            [console]::beep(500, 1000)
            Write-Host "Dibatalkan karena ditemukan pesan BERHENTI! dari nomor Bos di log."
            break
        }
    }

    $Now = Get-Date

    # Cek & Kirim Broadcast 1
    if ($Now -ge $NextRun1) {
        Write-Host "[$Now] Mengirim Broadcast 1..."
        node send1.cjs
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$Now] Broadcast 1 Berhasil Terkirim!"
            $NextRun1 = $Now.AddSeconds($Interval1)
        } else {
            Write-Host "[$Now] Gagal mengirim Broadcast 1. Mencoba lagi dalam 1 menit..."
            $NextRun1 = $Now.AddSeconds(60)
        }
        Write-Host "-> Jadwal Broadcast 1 berikutnya: $NextRun1"
    }

    # Cek & Kirim Broadcast 2
    if ($Now -ge $NextRun2) {
        Write-Host "[$Now] Mengirim Broadcast 2..."
        node send2.cjs
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$Now] Broadcast 2 Berhasil Terkirim!"
            $NextRun2 = $Now.AddSeconds($Interval2)
        } else {
            Write-Host "[$Now] Gagal mengirim Broadcast 2. Mencoba lagi dalam 1 menit..."
            $NextRun2 = $Now.AddSeconds(60)
        }
        Write-Host "-> Jadwal Broadcast 2 berikutnya: $NextRun2"
    }

    # Cek & Kirim Broadcast 3
    if ($Now -ge $NextRun3) {
        Write-Host "[$Now] Mengirim Broadcast 3..."
        node send3.cjs
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$Now] Broadcast 3 Berhasil Terkirim!"
            $NextRun3 = $Now.AddSeconds($Interval3)
        } else {
            Write-Host "[$Now] Gagal mengirim Broadcast 3. Mencoba lagi dalam 1 menit..."
            $NextRun3 = $Now.AddSeconds(60)
        }
        Write-Host "-> Jadwal Broadcast 3 berikutnya: $NextRun3"
    }

    Start-Sleep -Seconds 10
}

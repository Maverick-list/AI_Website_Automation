$GroupID = "120363401263735503@g.us"

# Pesan & Gambar Broadcast 1
$Msg1 = Get-Content -Raw -Encoding UTF8 "E:\AI_Automation_Website\OpenClaw\message.txt"
$Photo1 = "E:\AI_Automation_Website\EQUIRISE.jpeg"

# Pesan & Gambar Broadcast 2
$Msg2 = Get-Content -Raw -Encoding UTF8 "E:\AI_Automation_Website\OpenClaw\message2.txt"
$Photo2 = "E:\AI_Automation_Website\PushCup.jpeg"

$cliPath = "C:\Users\MAVERICK\AppData\Roaming\npm\node_modules\openclaw\openclaw.mjs"

# Interval dalam detik
$Interval1 = 30 * 60 # 30 menit
$Interval2 = 25 * 60 # 25 menit

# Set waktu jalan berikutnya
$NextRun1 = (Get-Date)
$NextRun2 = (Get-Date).AddMinutes(5) # Selang awal 5 menit

Write-Host "============================================="
Write-Host "    AUTOMASI DUAL BROADCAST (SENDER ONLY)    "
Write-Host "============================================="
Write-Host "Broadcast 1 (EQUIRISE) : Setiap 30 Menit"
Write-Host "Broadcast 2 (PushCup)  : Setiap 25 Menit"
Write-Host "Jeda Awal Antar Pesan  : 5 Menit"
Write-Host "============================================="

while ($true) {
    $Now = Get-Date

    # Cek & Kirim Broadcast 1
    if ($Now -ge $NextRun1) {
        Write-Host "[$Now] Mengirim Broadcast 1 (EQUIRISE)..."
        node $cliPath message send --target $GroupID --media $Photo1 --message $Msg1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$Now] Broadcast 1 Berhasil Terkirim!"
        } else {
            Write-Host "[$Now] Gagal mengirim Broadcast 1."
        }
        
        $NextRun1 = $Now.AddSeconds($Interval1)
        Write-Host "-> Jadwal Broadcast 1 berikutnya: $NextRun1"
    }

    # Cek & Kirim Broadcast 2
    if ($Now -ge $NextRun2) {
        Write-Host "[$Now] Mengirim Broadcast 2 (PushCup)..."
        node $cliPath message send --target $GroupID --media $Photo2 --message $Msg2
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$Now] Broadcast 2 Berhasil Terkirim!"
        } else {
            Write-Host "[$Now] Gagal mengirim Broadcast 2."
        }
        
        $NextRun2 = $Now.AddSeconds($Interval2)
        Write-Host "-> Jadwal Broadcast 2 berikutnya: $NextRun2"
    }

    # Cek setiap 10 detik agar CPU tidak terbebani
    Start-Sleep -Seconds 10
}

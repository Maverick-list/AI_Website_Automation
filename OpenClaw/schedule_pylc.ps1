# schedule_pylc.ps1 - Skrip broadcast kedua (FR PYLC) OpenClaw per 5 menit
$MessagePath = "$PSScriptRoot\message2.txt"
$PhotoPath = "E:\AI_Automation_Website\Broadcast_2_stitched.jpg"
$GroupID = "120363401263735503@g.us"
$MessageText = Get-Content -Raw -Encoding UTF8 $MessagePath

$isPaused = $false
$logDir = "$env:LOCALAPPDATA\Temp\openclaw"

Write-Host "Automasi Broadcast FR PYLC dimulai. Akan mengirim setiap 5 menit..."

while ($true) {
    if (-not $isPaused) {
        $sent = $false
        while (-not $sent) {
            if (Test-Path $PhotoPath) {
                Write-Host "Mengirim pesan dengan gambar Broadcast_2_stitched..."
                openclaw message send --target $GroupID --media $PhotoPath --message $MessageText
            } else {
                Write-Host "Gambar Broadcast_2_stitched.jpg tidak ditemukan, mengirim pesan teks saja..."
                openclaw message send --target $GroupID --message $MessageText
            }

            if ($LASTEXITCODE -eq 0) {
                $sent = $true
                Write-Host "Pesan terkirim."
            } else {
                Write-Host "Gagal mengirim. Mencoba lagi dalam 1 menit..."
                Start-Sleep -Seconds 60
            }
        }
    } else {
        Write-Host "Status PAUSED. Menunggu perintah LANJUT! dari Bos."
    }

    # Responsive sleep & check for 5 minutes (300 seconds)
    # Cek log setiap 10 detik
    for ($i = 0; $i -lt 300; $i += 10) {
        $latestLog = Get-ChildItem "$logDir\openclaw-*.log" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($latestLog) {
            $commands = Select-String -Path $latestLog.FullName -Pattern "6285191769521" | Where-Object { $_.Line -match "STOP!" -or $_.Line -match "LANJUT!" } | Select-Object -Last 1
            if ($commands) {
                if ($commands.Line -match "STOP!") {
                    if (-not $isPaused) {
                        Write-Host "Dibatalkan/Dihentikan karena ditemukan pesan STOP! dari Bos."
                        $isPaused = $true
                    }
                } elseif ($commands.Line -match "LANJUT!") {
                    if ($isPaused) {
                        Write-Host "Dilanjutkan kembali karena ditemukan pesan LANJUT! dari Bos. Mengirim segera..."
                        $isPaused = $false
                        $i = 300 # Force break sleep loop
                    }
                }
            }
        }
        Start-Sleep -Seconds 10
    }
}

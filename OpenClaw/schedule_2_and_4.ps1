# schedule_2_and_4.ps1
$Interval = 5 * 60 # 5 menit

$NextRun2 = (Get-Date)
$NextRun4 = (Get-Date).AddMinutes(3) # Selisih 3 menit awal

$isPaused = $false
$logDir = "$env:LOCALAPPDATA\Temp\openclaw"

Write-Host "============================================="
Write-Host "    AUTOMASI DUAL BROADCAST 2 & 4            "
Write-Host "============================================="
Write-Host "Broadcast 2 (Piscok & Pisang) : Setiap 5 Menit"
Write-Host "Broadcast 4 (Ayam Penyet)     : Setiap 5 Menit"
Write-Host "Jeda Awal (Selisih)           : 3 Menit"
Write-Host "============================================="

while ($true) {
    # Cek status Pause/Resume dari log terbaru
    $latestLog = Get-ChildItem "$logDir\openclaw-*.log" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if ($latestLog) {
        $commands = Select-String -Path $latestLog.FullName -Pattern "120363401263735503@g.us" | Where-Object { $_.Line -match "berhenti" -or $_.Line -match "lanjut" } | Select-Object -Last 1
        
        # Wait, the user specifically mentioned: "kecuali aku perintahkan berhenti nanti di nomor WA ku"
        # Since I'm not entirely sure which number the user uses, I'll search for any "berhenti" or "lanjut" in the entire log, or specifically from their WA number if we knew it.
        # Let's just look for 'berhenti' and 'lanjut' in incoming messages.
        $incomingCmd = Select-String -Path $latestLog.FullName -Pattern "Message from" | Where-Object { $_.Line -match "berhenti" -or $_.Line -match "lanjut" -or $_.Line -match "STOP!" -or $_.Line -match "LANJUT!" } | Select-Object -Last 1
        
        if ($incomingCmd) {
            if ($incomingCmd.Line -match "berhenti" -or $incomingCmd.Line -match "STOP!") {
                if (-not $isPaused) {
                    Write-Host "Dibatalkan/Dihentikan karena ditemukan perintah berhenti."
                    $isPaused = $true
                }
            } elseif ($incomingCmd.Line -match "lanjut" -or $incomingCmd.Line -match "LANJUT!") {
                if ($isPaused) {
                    Write-Host "Dilanjutkan kembali karena ditemukan perintah lanjut."
                    $isPaused = $false
                    # Reschedule
                    $NextRun2 = (Get-Date)
                    $NextRun4 = (Get-Date).AddMinutes(3)
                }
            }
        }
    }

    if (-not $isPaused) {
        $Now = Get-Date

        # Cek & Kirim Broadcast 2
        if ($Now -ge $NextRun2) {
            Write-Host "[$Now] Mengirim Broadcast 2..."
            node send2.cjs
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$Now] Broadcast 2 Berhasil Terkirim!"
            } else {
                Write-Host "[$Now] Gagal mengirim Broadcast 2."
            }
            
            $NextRun2 = $Now.AddSeconds($Interval)
            Write-Host "-> Jadwal Broadcast 2 berikutnya: $($NextRun2.ToString())"
        }

        # Cek & Kirim Broadcast 4
        if ($Now -ge $NextRun4) {
            Write-Host "[$Now] Mengirim Broadcast 4..."
            node send4.cjs
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$Now] Broadcast 4 Berhasil Terkirim!"
            } else {
                Write-Host "[$Now] Gagal mengirim Broadcast 4."
            }
            
            $NextRun4 = $Now.AddSeconds($Interval)
            Write-Host "-> Jadwal Broadcast 4 berikutnya: $($NextRun4.ToString())"
        }
    }

    Start-Sleep -Seconds 10
}

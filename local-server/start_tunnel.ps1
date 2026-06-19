while ($true) {
    Write-Host "Starting tunnel.js..."
    node tunnel.js
    Write-Host "Tunnel died or closed. Waiting 20 seconds to reclaim URL..."
    Start-Sleep -Seconds 20
}

# start_server.ps1
# Script untuk menjalankan Local API Server OpenClaw

$Dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Dir

Write-Host "Memulai OpenClaw Local Server..." -ForegroundColor Cyan
node server.js

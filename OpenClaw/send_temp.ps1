$GroupID = "120363401263735503@g.us"
$Photo1 = "E:\AI_Automation_Website\EQUIRISE.jpeg"
$Msg1 = Get-Content -Raw -Encoding UTF8 "E:\AI_Automation_Website\OpenClaw\message.txt"

$Photo2 = "E:\AI_Automation_Website\PushCup.jpeg"
$Msg2 = Get-Content -Raw -Encoding UTF8 "E:\AI_Automation_Website\OpenClaw\message2.txt"

Write-Host "Sending first broadcast..."
openclaw message send --target $GroupID --media $Photo1 --message $Msg1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error sending first broadcast"
}

Write-Host "Waiting 5 minutes..."
Start-Sleep -Seconds 300

Write-Host "Sending second broadcast..."
openclaw message send --target $GroupID --media $Photo2 --message $Msg2

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error sending second broadcast"
}

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Speak('Kedua broadcast sudah berhasil dikirimkan ke grup, Bos.')

$GroupID="120363401263735503@g.us"
$PhotoPath2="e:\AI_Automation_Website\PushCup.jpeg"
$MessageText2=Get-Content -Raw -Encoding UTF8 "e:\AI_Automation_Website\openclaw\message2.txt"
$openclawBin="C:\Users\MAVERICK\AppData\Roaming\npm\node_modules\openclaw\openclaw.mjs"
$cmdArgs=@($openclawBin, "message", "send", "--target", $GroupID, "--media", $PhotoPath2, "--message", $MessageText2)
& node @cmdArgs

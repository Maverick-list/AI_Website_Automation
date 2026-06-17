# show_qr.ps1 – Generate WhatsApp QR code for OpenClaw
# This will start the WhatsApp channel login flow and print the QR string.
# Copy the printed QR string into any online QR generator (e.g., https://goqr.me) and scan with WhatsApp.

openclaw channels login --channel whatsapp

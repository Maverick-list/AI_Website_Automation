const fs = require('fs');
const path = require('path');

const pages = [
  '/inbox', '/wapos', '/phonebook/contact', '/phonebook/group', '/phonebook/wa-group', 
  '/phonebook/google-contact', '/phonebook/google-csv', '/phonebook/blacklist', 
  '/message/new', '/message/schedule', '/message/auto-responder', '/message/reminder', 
  '/message/auto-reply', '/message/quick-reply', '/message/forward', '/message/campaign', 
  '/message/check-phone', '/payment/subscription', '/payment/invoice', '/payment/recurring', 
  '/referral', '/report', '/setting/label', '/setting/channel', '/setting/widget', 
  '/setting/profile', '/setting/password-histories', '/setting/change-password', 
  '/api-keys', '/ai-bots', '/team', '/support', '/upload-file', '/documentation'
];

pages.forEach(p => {
  const dir = path.join('src', 'app', p);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const file = path.join(dir, 'page.tsx');
  if (!fs.existsSync(file)) {
    const title = p.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')).join(' - ');
    const content = `
export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">${title}</h1>
      <div className="bg-sidebar border border-sidebar-border p-6 rounded-xl">
        <p className="text-foreground/70">
          Fitur ini sedang dalam tahap pengembangan. Tampilan ini adalah placeholder untuk struktur navigasi baru ala Wablas.
        </p>
      </div>
    </div>
  );
}
    `.trim();
    fs.writeFileSync(file, content);
  }
});

console.log('Successfully generated ' + pages.length + ' placeholder pages.');

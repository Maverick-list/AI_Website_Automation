const localtunnel = require('localtunnel');

async function startTunnel() {
  try {
    const tunnel = await localtunnel({ port: 5000, subdomain: 'mavecode-api' });
    console.log(`Tunnel running at: ${tunnel.url}`);

    if (tunnel.url !== 'https://mavecode-api.loca.lt') {
        console.log("Subdomain taken or invalid. Retrying in 15 seconds...");
        tunnel.close();
        setTimeout(startTunnel, 15000);
        return;
    }

    tunnel.on('close', () => {
      console.log('Tunnel closed by server. Restarting...');
      setTimeout(startTunnel, 5000);
    });
    
    tunnel.on('error', (err) => {
        console.error('Tunnel error:', err);
        tunnel.close();
    });

  } catch (err) {
    console.error('Failed to start tunnel:', err);
    setTimeout(startTunnel, 5000);
  }
}

startTunnel();

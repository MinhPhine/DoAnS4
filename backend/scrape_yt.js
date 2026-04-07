const https = require('https');

const queries = [
  'mkbhd iphone 15 pro max review',
  'mkbhd samsung s24 ultra review',
  'xiaomi 14 ultra review the verge',
  'oppo find x7 ultra mkbhd',
  'macbook pro 14 m3 pro dave2d',
  'asus rog zephyrus g14 dave2d 2024',
  'dell xps 15 review dave2d',
  'lenovo thinkpad x1 carbon gen 11 review',
  'airpods pro 2 usb-c review',
  'sony wh-1000xm5 mkbhd',
  'samsung galaxy buds 3 pro review',
  'meta quest 3 mkbhd',
  'dji mavic 3 pro review',
  'playstation 5 slim review mkbhd',
  'razer blackwidow v4 pro review randomfrankp',
  'logitech g pro x superlight 2 review',
  'nintendo switch oled review'
];

async function search(q) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const match = body.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
        if (match) resolve(match[1]);
        else resolve("FAIL");
      });
    }).on('error', reject);
  });
}

(async () => {
  for (let q of queries) {
    const id = await search(q);
    console.log(`'${q}': '${id}',`);
  }
})();

const https = require('https');

const ids = [
  '1611162617474-5b21e879e113', // iPhone/Tech
  '1517336714731-489689fd1ca8', // MacBook
  '1558655146-d3937192bc52', // Design
  '1550745165-9bc0b252726f', // Computer
  '1518546305927-5a555bb7020d', // Bitcoin
  '1639762681485-074b7f4fc8fd', // Web3
  '1677442136019-21780ecad995', // AI
  '1526374965328-7f61d4dc18c5', // Robot
  '1593508512255-86ab42a8e620', // VR
  '1499951360447-b19be8fe80f5'  // Workspace
];

let checkCount = 0;
for(let id of ids) {
    https.request({
        method: 'HEAD',
        hostname: 'images.unsplash.com',
        path: `/photo-${id}?w=800`
    }, res => {
        if(res.statusCode === 200) {
            console.log(`OK: ${id}`);
        } else {
            console.log(`FAIL ${res.statusCode}: ${id}`);
        }
    }).end();
}

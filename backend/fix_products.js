const fs = require('fs');

const goodIds = [
  '1526374965328-7f61d4dc18c5',
  '1499951360447-b19be8fe80f5',
  '1550745165-9bc0b252726f',
  '1593508512255-86ab42a8e620',
  '1611162617474-5b21e879e113',
  '1517336714731-489689fd1ca8',
  '1677442136019-21780ecad995',
  '1518546305927-5a555bb7020d'
];

let content = fs.readFileSync('seed-products.js', 'utf8');

let count = 0;
content = content.replace(/photo-[a-zA-Z0-9-]+/g, (match) => {
    // Avoid double replacing if it's already a good ID
    const extracted = match.replace('photo-', '');
    if (goodIds.includes(extracted)) return match;

    const id = goodIds[count % goodIds.length];
    count++;
    return `photo-${id}`;
});

fs.writeFileSync('seed-products.js', content, 'utf8');
console.log('Fixed IDs in seed-products.js');

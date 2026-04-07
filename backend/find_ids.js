const https = require('https');
const fs = require('fs');
const queries = [
    'Trên tay Samsung Galaxy S24 Ultra',
    'Sony WH-1000XM5 review',
    'Build PC Gaming 30 triệu',
    'Bàn phím cơ Custom giá rẻ',
    'DJI Pocket 3 review',
    'MacBook Pro M3 Max review',
    'Top 5 phụ kiện công nghệ đáng mua',
    'Kinh nghiệm dùng AI',
    'kịch bản video AI',
    'quay video đẹp',
    'build PC gaming giá rẻ'
];

let results = {};
let promises = queries.map(query => {
    return new Promise(resolve => {
        https.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
                if(match) results[query] = match[1];
                resolve();
            });
        });
    });
});

Promise.all(promises).then(() => {
    fs.writeFileSync('youtube_ids.json', JSON.stringify(results, null, 2));
    console.log("Done");
});

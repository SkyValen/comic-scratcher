import axios from "axios";
import * as cheerio from 'cheerio';
import fs from 'node:fs';
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
if (!fs.existsSync('cache')) {
    fs.mkdirSync('cache');
}


const url = 'https://readcomic.top/the-walking-dead-deluxe/issue-1/'
for (let i = 1; i < 12; i++) {
    let cachePath = `cache/${i}.html`;
    let data;
    if (!fs.existsSync(cachePath)) {
        await sleep(1000);
        let res = await axios.get(url + i);
        //CACHE
        fs.writeFileSync(cachePath, res.data);
        data = res.data;
        console.log("LIVE REQUEST!");
    } else {
        data = fs.readFileSync(cachePath);
        const $ = cheerio.load(data)
        let img = $('div.chapter-container img');
        console.log(img.attr('src'));
        console.log(img.attr('alt'));
    }
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(t)
        }, t * 1000)
    })
}

const exec = require('child_process').exec;
function runExec(cmdStr) {
    return new Promise((resolve, reject) => {
        exec(cmdStr, { maxBuffer: 1024 * 1024 * 1024 }, function (err, stdout, stderr) {
            if (err) {
                console.log('runExec error:' + stderr, cmdStr);
                reject();
            } else {
                // console.log(stdout);
                resolve(JSON.parse(stdout));
            }
        });
    });
}
async function toast(title, msg) {

    const curl = `curl 'https://api.day.app/Rtc5iqSSpG9NqfyXVqCTGQ/${title}/${msg}' \
  -H 'authority: api.day.app' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
  --compressed`
    await runExec(curl)
}

const path = require('path');
const ePath = path.join(__dirname, '/ChromeExtension/ajax-tools');
console.log("🚀 ~ ePath:", ePath);

const puppeteer = require('puppeteer');

const PAGE_SIZE = 20; // 每页数据量
const request = require('request');
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (error, res, body) => {
            if (error) reject(error);
            resolve(body);
        });
    });
}
async function getGoods(page, order = 'ASC') {
    // 计算偏移量
    const host = 'http://59.110.168.213:3000';
    // const host = 'http://localhost:3000';
    const url = `${host}/getGood?page=${page}&order=${order}`;
    const res = await fetchData(url)
    const dd = JSON.parse(res)
    // console.log("🚀 ~ getGoods ~ dd:", dd)
    // const res = await runExec(curl)
    return dd.data
}
async function getGoodsPage(arr) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < arr?.length; i++) {
            const it = arr[i];
            const code = it?.code
            const url = `https://www.macklin.cn/products/${code}`;
            const browser = await puppeteer.launch({
                headless: 'new',
                // headless: false,
                // devtools: true,
                args: [
                    `--disable-extensions-except=${ePath}`,
                    `--load-extension=${ePath}`,
                    '--allow-running-insecure-content'
                ]
            });
            const page = await browser.newPage();
            console.log("🚀 ~ getGoodsPage page.goto ~ url:", url)
            // await page.goto(url);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            const content = await page.content();
            const regex = /很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断/;
            const match = regex.exec(content);
            if (match) {
                await toast('麦克林被限制了', '很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断')
                return reject('很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断')
            }
            const isNext = await page.$('#nocaptcha');
            if (isNext) {
                console.log('需要验证码');
                await toast('麦克林被限制了', '需要验证码')
                return reject('需要验证码')
            }
            // await page.waitForTimeout(1000);
            await sleep(2)
            await browser.close()
            const t = getRandomNumber(2, 5)
            await sleep(t)
        }
        return resolve(true)
    })
}
async function getProducts() {
    const total = 10000
    const totalPage = Math.ceil(total / PAGE_SIZE)
    console.log(totalPage, "🚀 ~ getProducts1 ~ total:", total)
    for (let p = 5; p <= totalPage; p++) {
        const arr = await getGoods(p)
        if (arr.length > 0) {
            await getGoodsPage(arr)
        } else {
            await toast('麦克林刷完了', '麦克林刷完了')
        }
    }
}

async function getProducts2() {
    const total = 10000
    const totalPage = Math.ceil(total / PAGE_SIZE)
    console.log(totalPage, "🚀 ~ getProducts2 ~ total:", total)
    for (let p = 10; p <= totalPage; p++) {
        const arr = await getGoods(p, 'DESC')
        if (arr.length > 0) {
            await getGoodsPage(arr)
        } else {
            await toast('麦克林刷完了', '麦克林刷完了')
        }
    }
}

async function getProducts3() {
    const total = 10000
    const totalPage = Math.ceil(total / PAGE_SIZE)
    console.log(totalPage, "🚀 ~ getProducts3 ~ total:", total)
    for (let p = 20; p <= totalPage; p++) {
        const arr = await getGoods(p)
        if (arr.length > 0) {
            await getGoodsPage(arr)
        } else {
            await toast('麦克林刷完了', '麦克林刷完了')
        }
    }
}
async function getProducts4() {
    const total = 10000
    const totalPage = Math.ceil(total / PAGE_SIZE)
    console.log(totalPage, "🚀 ~ getProducts4 ~ total:", total)
    for (let p = 30; p <= totalPage; p++) {
        const arr = await getGoods(p, 'DESC')
        if (arr.length > 0) {
            await getGoodsPage(arr)
        } else {
            await toast('麦克林刷完了', '麦克林刷完了')
        }
    }
}

// getProducts()
getProducts2()
// getProducts3()
// getProducts4()



process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});
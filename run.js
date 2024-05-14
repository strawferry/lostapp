const host = 'http://59.110.168.213:3000';
// const host = 'http://localhost:3000';


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

const PAGE_SIZE = 30; // 每页数据量
const request = require('request');
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (error, res, body) => {
            if (error) reject(error);
            resolve(body);
        });
    });
}
async function postData(data) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `${host}/postData`,
            json: {
                url: '/setGoodOffline',
                data: data
            }
        };
        // console.log("🚀 ~ postData ~ options:", options);
        request.post(options, (error, res, body) => {
            if (error) reject(error);
            resolve(body);
        });
    });
}

async function getGoods(page, order = 'ASC') {
    // 计算偏移量
    const url = `${host}/getGood?page=${page}&order=${order}`;
    const res = await fetchData(url)
    const dd = JSON.parse(res)
    // console.log("🚀 ~ getGoods ~ dd:", dd)
    // const res = await runExec(curl)
    return dd.data
}
async function getGoodCount() {
    // 计算偏移量
    const url = `${host}/getGoodInfo`;
    const res = await fetchData(url)
    const dd = JSON.parse(res)
    // console.log("🚀 ~ getGoods ~ dd:", dd)
    // const res = await runExec(curl)
    return dd.data.count
}
async function getGoodsPage(arr, p) {
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
                    '--no-sandbox',
                    `--disable-extensions-except=${ePath}`,
                    `--load-extension=${ePath}`,
                    '--allow-running-insecure-content'
                ]
            });
            const page = await browser.newPage();
            console.log(`Page: ${p} index: ${i}`, "🚀 ~ getGoodsPage page.goto ~ url:", url)
            // await page.goto(url);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await sleep(0.5)
            const content = await page.content();
            const regex = /很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断/;
            const match = regex.exec(content);
            if (match) {
                await toast('麦克林被限制了', '很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断')
                return reject('很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断')
            }
            const regex2 = /该产品尚未上线，敬请期待/;
            const match2 = regex2.exec(content);
            if (match2) {
                console.log('该产品尚未上线，敬请期待', code);
                await postData({ item_code: code })
            }
            const isNext = await page.$('#nocaptcha');
            if (isNext) {
                console.log('需要验证码');
                await toast('麦克林被限制了', '需要验证码')
                return reject('需要验证码')
            }
            // await page.waitForTimeout(1000);
            await sleep(0.5)
            await browser.close()
            const t = getRandomNumber(2, 5)
            await sleep(t)
        }
        return resolve(true)
    })
}
async function getProducts() {
    let p = 1;
    const counts = await getGoodCount()
    const totalPage = Math.ceil(counts / PAGE_SIZE)
    if (totalPage === 0) {
        console.log('麦克林刷完了');
        await toast('麦克林刷完了', '麦克林刷完了 getProducts1 0000')
        process.exit(1);
    }
    console.log(`还剩页数: ${totalPage}`, "🚀 ~ getProducts1 ASC ~ 剩余产品数量:", counts, "page:", p)
    if (p <= totalPage) {
        const arr = await getGoods(p)
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        getProducts()
    }
}

async function getProducts2() {
    let p = 1;
    const counts = await getGoodCount()
    const totalPage = Math.ceil(counts / PAGE_SIZE)
    if (totalPage === 0) {
        console.log('麦克林刷完了');
        await toast('麦克林刷完了', '麦克林刷完了 getProducts2 0000 DESC')
        process.exit(1);
    }
    console.log(`还剩页数: ${totalPage}`, "🚀 ~ getProducts2 DESC ~ 剩余产品数量:", counts, "page:", p)
    if (p <= totalPage) {
        const arr = await getGoods(p, 'DESC')
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        getProducts2()
    }
}


async function getProducts3(pp) {
    let p = pp || 3;
    const counts = await getGoodCount()
    const totalPage = Math.ceil(counts / PAGE_SIZE)
    if (totalPage === 0) {
        console.log('麦克林刷完了');
        await toast('麦克林刷完了', '麦克林刷完了 getProducts3 000')
        process.exit(1);
    }
    console.log(`还剩页数: ${totalPage}`, "🚀 ~ getProducts1 ASC ~ 剩余产品数量:", counts, "page:", p)
    if (p < totalPage) {
        const arr = await getGoods(p)
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        getProducts3()
    } else if (p === totalPage) {
        const arr = await getGoods(p)
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        if (p === 1) {
            await toast('麦克林刷完了', '麦克林刷完了 getProducts3  === 1 ASC')
            process.exit(1);
        } else {
            p = p - 1
            getProducts3(p)
        }
    }
}

async function getProducts4(pp) {
    let p = pp || 3;
    const counts = await getGoodCount()
    const totalPage = Math.ceil(counts / PAGE_SIZE)
    if (totalPage === 0) {
        console.log('麦克林刷完了');
        await toast('麦克林刷完了', '麦克林刷完了 getProducts4 0000 DESC')
        process.exit(1);
    }
    console.log(`还剩页数: ${totalPage}`, "🚀 ~ getProducts4 DESC ~ 剩余产品数量:", counts, "page:", p)
    if (p < totalPage) {
        const arr = await getGoods(p, 'DESC')
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        getProducts4()
    } else if (p === totalPage) {
        const arr = await getGoods(p, 'DESC')
        if (arr.length > 0) {
            await getGoodsPage(arr, p)
        }
        if (p === 1) {
            await toast('麦克林刷完了', '麦克林刷完了 getProducts4  === 1 DESC')
            process.exit(1);
        } else {
            p = p - 1
            getProducts4(p)
        }
    }
}
// getProducts()
// getProducts2()
getProducts3()
// getProducts4()



process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

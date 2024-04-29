const nodeSchedule = require('node-schedule');

const exec = require('child_process').exec;
function runExec(cmdStr) {
    console.log("🚀 ~ runExec ~ cmdStr:", cmdStr)
    return new Promise((resolve, reject) => {
        exec(cmdStr, { maxBuffer: 1024 * 1024 * 1024 }, function (err, stdout, stderr) {
            if (err) {
                console.log('runExec error:' + stderr, cmdStr);
                reject();
            } else {
                console.log(stdout);
                let stdoutT = stdout
                try {
                    stdoutT = JSON.parse(stdout)
                } catch (error) {
                    stdoutT = stdout
                }
                resolve(stdoutT);
            }
        });
    });
}


async function setScheduler() {
    nodeSchedule.scheduleJob('30分钟触发一次构建', '*/30 * * * *', async () => {
        console.log('----------------30分钟触发一次构建------------------');
        runShell()
    })
}

async function runShell() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const day = new Date().getDay()
    const now = new Date().toLocaleString()
    console.log("🚀 ~ runShell ~ now:", now, year, month, day);
    await runExec(`echo ${now} >> temp/${year}-${month}-${day}.txt`)
    await runExec('git add .')
    await runExec(`git commit -m "update ${now}"`)
    await runExec('git push')
}


setScheduler()
runShell()
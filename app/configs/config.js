



/*
* 颜色
* */
const themeBlue = "#3F96D9"; // 主题蓝
const BGColor = "#F5F5F5"; // 背景色
const startColor = "#FEC42E"; // 评分黄色
const titleFontColor = "#000000"; // 主要的显眼字体色
const otherFontColor = "#919191"; // 次要字体颜色 以及 间隔色
const sipColor = "#EDEDED"; // 间隔色
const whiteColor = "#fff"; // 白色
const arrowRightColor = "#737373"; // 箭头颜色
const iconBorderColor = "#eaeaea"; // 箭头颜色


/*
* 服务器接口
* */
const DEV = "DEV"; // 开发
const APP = "APP"; // 线上
let serverUrl,
    devServerUrl = "http://localhost:5566", // 开发 url
    serverVersion = "v1", // 开发 url
    prdServerUrl = "http://dev.ferryvip.com"; // 线上 测试 url, 此处可以替换成你自己部署的线上地址
    // prdServerUrl = "http://www.ferryvip.com"; // 发布 url
/*******------设置发布状态------**********/

const SET_ENV = APP; // 设置开发还是线上

const newVersion = 1;  // 新版本,用于控制 appintro 的; 初版为 0(从本地存储的下来), 每次发一版叠加上去

/*******------设置发布状态------**********/

if(SET_ENV === DEV){serverUrl = devServerUrl;}else{serverUrl = prdServerUrl;}


/*******------设置某些第三个SDK的key------**********/


/*******------设置某些第三个SDK的key------**********/


export default config = {
    color: {themeBlue,BGColor,startColor,titleFontColor,otherFontColor,sipColor,whiteColor,arrowRightColor,iconBorderColor},
    serverUrl,
    serverVersion,
    newVersion,
}
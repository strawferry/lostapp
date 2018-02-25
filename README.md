
# 小型失物招领 App 客户端(iOS && 安卓)

## 项目说明

本身是搞 iOS 的后面入了 ReactNative 的坑,慢慢的就比较多的接触 JavaScript ,还有就是 JavaScript 慢慢的可以做的东西越来越多;
不仅可以做前端网页,还可以做移动端 App(ReactNative),还能做后端(Node.js),还有其他的;

这个 App 是为了搭配[小型失物招领后端](https://github.com/strawferry/lostserver)所做的,同时也使用了 `redux` `react-navigation` 等的做数据管理以及路由切换;

目前主要的 Feature:  
1. 用户登录注册;
2. 基本的管理员权限管理;
3. 失物招领信息发布,关注收藏,通知审核等;
4. 管理员的基本功能的管理与审核;
5. 极光推送对接,使内容实时推送给用户;

## 本地运行条件

* 需要相应后端服务开启,本地 server 服务或者线上 server,下面会有相应的配置说明;


## 基础配置
* 代码热更新配置(可不配置);

> ![iOS](http://ww1.sinaimg.cn/large/8bbf0afbly1forvmdtezxj21r41084bn.jpg)
> ![Android](http://ww1.sinaimg.cn/large/8bbf0afbly1forvzfmss4j228g1huniw.jpg)

* 极光推送 appkey 配置 

>![iOS](http://ww1.sinaimg.cn/large/8bbf0afbly1forvmdt6kmj21ts0xen9o.jpg)
>![Android](http://ww1.sinaimg.cn/large/8bbf0afbly1forvzfndrzj21q81hudzn.jpg)

* 后端服务器地址配置

把在相应的服务地址填入对应环境中,设置 `SET_ENV` `DEV` 为开发地址 `APP` 为线上地址

> ![config](http://ww1.sinaimg.cn/large/8bbf0afbly1forw8hqeqyj21ri1i4ard.jpg)

## 仓库地址

[服务器地址 GitHub 地址,具体配置看文档](https://github.com/strawferry/lostserver)

[App 地址,具体配置看文档](https://github.com/strawferry/lostapp)


# 个人博客
### **博客地址: [`https://cblog.ferryvip.com/`](https://cblog.ferryvip.com/)**

/*
*
*  请求小封装
*  具体按照还需要修改
*
* */

import Toast from 'react-native-root-toast';

export const Get = (url, token) => {

    console.log('------Get--url-----------');
    console.log(url);
    let fetchPromise = new Promise((resolve, reject) => {
        let headers = {'Content-Type': 'application/json;charset=utf-8'};
        if(token){headers["x-access-token"] = token}
        fetch(url, {
            method: "GET",
            headers,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((error) => {
                let toast = Toast.show("请求服务器开小差了,请稍后再试!", {duration: 500, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                reject(error);
            });
    });
    let timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
            // let toast = Toast.show('"请求超时!"', {duration: 100, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
            reject({code: 404, msg: "请求超时!"});
        }, 10000)
    });

    return Promise.race([fetchPromise, timeoutPromise]);
};

export const Post = (url, token, body) => {
    console.log('------Post--url-----------');
    console.log(url);
    let fetchPromise = new Promise((resolve, reject) => {
        let headers = {'Content-Type': 'application/json;charset=utf-8'};
        if(token){headers["x-access-token"] = token}
        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((error) => {
                let toast = Toast.show("请求服务器开小差了,请稍后再试!", {duration: 500, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                reject(error);
            });
    });
    let timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
            // let toast = Toast.show("请求超时!", {duration: 100, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
            reject({code: 404, msg: "请求超时!"});
        }, 15000)
    });
    return Promise.race([fetchPromise, timeoutPromise]);
};

export const Upload = (url, token, image) => {
    console.log('------Post--url-----------');
    console.log(url);
    let fetchPromise = new Promise((resolve, reject) => {
        let headers = {'Content-Type':'multipart/form-data'};
        let formData = new FormData();
        let file = {uri: image,type:'multipart/form-data',name:'image.png'};
        formData.append('files',file);
        if(token){headers["x-access-token"] = token}
        fetch(url, {
            method: "POST",
            headers,
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((error) => {
                let toast = Toast.show("请求服务器开小差了,请稍后再试!", {duration: 500, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                reject(error);
            });
    });
    let timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
            // let toast = Toast.show("请求超时!", {duration: 100, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
            reject({code: 404, msg: "请求超时!"});
        }, 20000)
    });
    return Promise.race([fetchPromise, timeoutPromise]);
};

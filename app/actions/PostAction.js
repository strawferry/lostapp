


export const SET_ID = "SET_ID";
export const SET_DATA = "SET_DATA";
export const SET_TYPE = "SET_TYPE";

import { Get, Post, Upload } from './../configs/RequestUtil';
import url from './../configs/url';

import { start, stop } from './GlobalAction';

import Toast from 'react-native-root-toast';

/*
 * 设置启事类型
 * */
export function set_type(type) {
    return {
        type: SET_TYPE,
        lx: type,
    }
}
/*
 * 设置 id
 * */
export function setDetailID(id) {
    return {
        type: SET_ID,
        id: id,
    }
}
/*
 * 设置 data
 * */
export function setDetailData(data) {
    return {
        type: SET_DATA,
        data: data,
    }
}

/*
 * 获取 all 某 postID 前后数据;
 * postID sort 同时-可选
 * limit 可选
 * */
let isGetDetail = false;
export function getDetail(id, isFontRun, callback) {
    return dispatch => {
        if (!isGetDetail) {
            isGetDetail = true;
            isFontRun && dispatch(start());
            let uri = `${url.detail}/${id}`;

            Get(uri)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    if(data.code === 0){
                        dispatch(setDetailData(data.data));
                        setTimeout(()=>{
                            callback();
                        }, 100);
                    }
                    isGetDetail = false;
                    isFontRun && dispatch(stop());
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetDetail = false;
                isFontRun && dispatch(stop());
            });
        }
    }
}

/*
 * 获取类型的列表数据;
 * type 必选
 * postID sort 同时-可选
 * limit 可选
 * */
let isPostAdd = false;
export function postAdd(token, body) {
    return dispatch => {
        if (!isPostAdd) {
            isPostAdd = true;
        dispatch(start());

        Post(url.add, token, body).then((data) => {
            console.log('---then-data---');
                console.log(data);
            isPostAdd = false;
                dispatch(stop());
        }).catch((err) => {
            console.log('---catch-err---');
            console.log(err);
            isPostAdd = false;
            dispatch(stop());
        });
    }
    }
}

/*
 * 获取类型的列表数据;
 * type 必选
 * postID sort 同时-可选
 * limit 可选
 * */
let isGetLostStatus = false;
export function getLostStatus(lostStatus, postID, sort, limit) {
    return dispatch => {
        if (!isGetLostStatus) {
            isGetLostStatus = true;
        dispatch(start());
        let uri;
        if(limit){
            if(postID){
                uri = `${url.list}?lostStatus=${lostStatus}&postID=${postID}&sort=${sort}&limit=${limit}`;
            }else{
                uri = `${url.list}?lostStatus=${lostStatus}&limit=${limit}`;
            }
        }else{
            if(postID){
                uri = `${url.list}?lostStatus=${lostStatus}&postID=${postID}&sort=${sort}`;
            }else{
                uri = `${url.list}?lostStatus=${lostStatus}`;
            }
        }
        Get(uri).then((data) => {
                console.log('---data---');
                console.log(data);
            isGetLostStatus = false;
                dispatch(stop());
            }).catch((err) => {

            console.log('---catch-err---');
            console.log(err);
            isGetLostStatus = false;
            dispatch(stop());
        });
    }}
}


/*
 * 修改 lostStatus;
 * lostStatus 必选
 * */
let isSetLostStatus = false;
export function setLostStatus(_id, lostStatus, token, callback) {
    return dispatch => {
        if (!isSetLostStatus) {
            isSetLostStatus = true;
            let uri = `${url.setloststatus}?_id=${_id}&lostStatus=${lostStatus}`;
            Get(uri, token).then((data) => {
                if(data.code === 0){
                    let toast = Toast.show("修改状态成功!", {duration: 1000, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    callback && callback();
                }else{
                    let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                }
                isSetLostStatus = false;
            }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isSetLostStatus = false;
            });
        }}
}


/*
 * 修改 status;
 * status 必选
 * */
let isSetStatus = false;
export function setStatus(_id, status, token, callback) {
    return dispatch => {
        if (!isSetStatus) {
            isSetStatus = true;
            let uri = `${url.setstatus}?_id=${_id}&status=${status}`;
            Get(uri, token).then((data) => {
                if(data.code === 0){
                    let toast = Toast.show("修改审核成功!", {duration: 1000, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    callback && callback();
                }else{
                    let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                }
                isSetStatus = false;
            }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isSetStatus = false;
            });
        }}
}

/*
 * 发布 启事;
 *
 * */
let isTweet = false;
export function tweet(title, date, location, desc, imgarr, type, token) {
    return dispatch => {
        if (!isTweet) {
            isTweet = true;

            if (title && date && location && desc && imgarr){
                if(imgarr.length >0 ){
                    let arr = [];
                    imgarr.map((item, index)=>{
                        let p = new Promise((resolve, reject) => {
                            // 要上传新图片
                            Upload(url.uploadFile, token, item).then((data)=>{
                                // console.log(`---${index}--data---`);
                                // console.log(data);
                                if(data.code === 0){
                                    resolve(data.data)
                                }else{
                                    reject(`upload-err-in-${index}-msg:${data.msg}`);
                                }
                            }).catch((err)=>{
                                reject(`catch-err-in-${index}-err:${JSON.stringify(err)}`);
                            });
                        });
                        return arr.push(p);
                    });
                    Promise.all(arr).then((resault)=>{
                        // console.log(resault);
                        let body = {
                            title: title,
                            date: date,
                            location: location,
                            desc: desc,
                            type: type,
                            images: resault
                        };
                        Post(url.add, token, body).then((data) => {
                            if(data.code === 0){
                                let toast = Toast.show("发布启事成功,请耐心等待管理员审核!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }else{
                                let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                            isTweet = false;
                        }).catch((err) => {
                            console.log('---catch-err---');
                            console.log(err);
                            let toast = Toast.show("发布启事失败!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            isTweet = false;
                        });
                    }).catch((err)=>{
                        isTweet = false;
                        let toast = Toast.show("发布启事失败!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                        console.log(`--Promise.all--err:${JSON.stringify(err)}`);
                    });
                }else{
                    isTweet = false;
                    let toast = Toast.show("至少选择一张图片!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                }

            }else{
                isTweet = false;
                let toast = Toast.show("所以参数不能为空!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
            }





        }}
}
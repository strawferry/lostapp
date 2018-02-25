


export const INIT = "INIT";
export const ADD_MORE = "ADD_MORE";
export const ADD_NEW = "ADD_NEW";
export const NEW_LOADING_STATUS = "NEW_LOADING_STATUS";
export const MORE_LOADING_STATUS = "MORE_LOADING_STATUS";
export const CHANGE_LIST_FINISH = `@@首页/改变-列表-加载`;

import Toast from 'react-native-root-toast';

import { Get, Post } from './../configs/RequestUtil';
import url from './../configs/url';

import { start, stop  } from './GlobalAction';

// LX 修改,每次重新加载的时候重置加载完成标志!
export function initFinish() {
    return {
        type:CHANGE_LIST_FINISH,
        finish:false
    }
}
export function endFinish() {
    return {
        type:CHANGE_LIST_FINISH,
        finish:true
    }
}

export function new_start() {
    return {
        type: NEW_LOADING_STATUS,
        isLoading: true,
    };
}
export function new_stop() {
    return {
        type: NEW_LOADING_STATUS,
        isLoading: false,
    };
}

export function more_start() {
    return {
        type: MORE_LOADING_STATUS,
        isLoading: true,
    };
}
export function more_stop() {
    return {
        type: MORE_LOADING_STATUS,
        isLoading: false,
    };
}

/*
 * 传入 type 和 data;
 * */
export function type_data(type, data) {
    return {
        type: type,
        data: data,
    };
}


/*
 * 获取 all 某 postID 前后数据;
 * postID sort 同时-可选
 * limit 可选
 * */
let isGetAll = false;
export function getAll(isInit, postID, sort, limit) {
    return dispatch => {
        if (!isGetAll) {
            isGetAll = true;
            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if(postID || sort){
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(start());
                }
            }


            let uri;
            if (limit) {
                if (postID) {
                    uri = `${url.list}?postID=${postID}&sort=${sort}&limit=${limit}`;
                } else {
                    uri = `${url.list}?limit=${limit}`;
                }
            } else {
                if (postID) {
                    uri = `${url.list}?postID=${postID}&sort=${sort}`;
                } else {
                    uri = `${url.list}`;
                }
            }

            Get(uri)
                .then((data) => {
                    // console.log('---then-data---');
                    // console.log(data);
                    if (data.code === 0) {
                        if (isInit) {
                            dispatch(type_data(INIT, data.data));
                        } else {
                            if (data.data.length > 0) {
                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(INIT, data.data));
                                }

                            } else {
                                console.log("没有新数据");
                                dispatch(endFinish());
                                let toast = Toast.show('没有新数据', {
                                    duration: 500,
                                    position: Toast.positions.BOTTOM,
                                    shadow: false,
                                    animation: true,
                                    hideOnPress: true,
                                    delay: 0,
                                    onShow: () => {
                                        // calls on toast\`s appear animation start
                                    },
                                    onShown: () => {
                                        // calls on toast\`s appear animation end.
                                    },
                                    onHide: () => {
                                        // calls on toast\`s hide animation start.
                                    },
                                    onHidden: () => {
                                        // calls on toast\`s hide animation end.
                                    }
                                });
                            }
                        }
                    }
                    isGetAll = false;
                    if (isInit){
                        dispatch(new_stop());
                    }else{
                    if(postID || sort){
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }}
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetAll = false;
                if (isInit){
                    dispatch(new_stop());
                }else{
                    if(postID || sort){
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }}
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
let isGetType = false;
export function getType(isInit, type, postID, sort, limit) {
    return dispatch => {
        if (!isGetType) {
            isGetType = true;
            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if(postID || sort){
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(start());
                }
            }
        let uri;
        if(limit){
            if(postID){
                uri = `${url.list}?type=${type}&postID=${postID}&sort=${sort}&limit=${limit}`;
            }else{
                uri = `${url.list}?type=${type}&limit=${limit}`;
            }
        }else{
            if(postID){
                uri = `${url.list}?type=${type}&postID=${postID}&sort=${sort}`;
            }else{
                uri = `${url.list}?type=${type}`;
            }
        }

            Get(uri)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(INIT, data.data));
                        }else {
                        if (data.data.length > 0) {

                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(INIT, data.data));
                                }

                        } else {
                            console.log("没有新数据");
                            dispatch(endFinish());
                            let toast = Toast.show('没有新数据', {
                                duration: 500,
                                position: Toast.positions.BOTTOM,
                                shadow: false,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                                onShow: () => {
                                    // calls on toast\`s appear animation start
                                },
                                onShown: () => {
                                    // calls on toast\`s appear animation end.
                                },
                                onHide: () => {
                                    // calls on toast\`s hide animation start.
                                },
                                onHidden: () => {
                                    // calls on toast\`s hide animation end.
                                }
                            });
                        }}
                    }
                    isGetType = false;
                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if(postID || sort){
                            if(sort === 'new'){
                                dispatch(new_stop());
                            }else{
                                dispatch(more_stop());
                            }
                        }else{
                            dispatch(stop());
                        }
                    }
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetType = false;
                if (isInit){
                    dispatch(new_stop());
                }else{
                    if(postID || sort){
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }
                }
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
export function getLostStatus(isInit,lostStatus, postID, sort, limit) {
    return dispatch => {
        if (!isGetLostStatus) {
            isGetLostStatus = true;
            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if(postID || sort){
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(start());
                }
            }
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

            Get(uri)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(INIT, data.data));
                        }else {
                            if (data.data.length > 0) {

                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(INIT, data.data));
                                }

                            } else {
                                console.log("没有新数据");
                                dispatch(endFinish());
                                let toast = Toast.show('没有新数据', {
                                    duration: 500,
                                    position: Toast.positions.BOTTOM,
                                    shadow: false,
                                    animation: true,
                                    hideOnPress: true,
                                    delay: 0,
                                    onShow: () => {
                                        // calls on toast\`s appear animation start
                                    },
                                    onShown: () => {
                                        // calls on toast\`s appear animation end.
                                    },
                                    onHide: () => {
                                        // calls on toast\`s hide animation start.
                                    },
                                    onHidden: () => {
                                        // calls on toast\`s hide animation end.
                                    }
                                });
                            }
                        }
                    }
                    isGetLostStatus = false;
                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if(postID || sort){
                            if(sort === 'new'){
                                dispatch(new_stop());
                            }else{
                                dispatch(more_stop());
                            }
                        }else{
                            dispatch(stop());
                        }
                    }
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetLostStatus = false;
                if (isInit){
                    dispatch(new_stop());
                }else{
                    if(postID || sort){
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }
                }
            });
    }}
}




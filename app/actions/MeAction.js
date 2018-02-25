


export const REGISTER = "REGISTER";

export const NEW_LOADING_STATUS = "NEW_LOADING_STATUS";
export const MORE_LOADING_STATUS = "MORE_LOADING_STATUS";

export const XW_INIT = "XW_INIT";
export const XW_ADD_MORE = "XW_ADD_MORE";
export const XW_ADD_NEW = "XW_ADD_NEW";

export const ZL_INIT = "ZL_INIT";
export const ZL_ADD_MORE = "ZL_ADD_MORE";
export const ZL_ADD_NEW = "ZL_ADD_NEW";

export const SC_INIT = "SC_INIT";
export const SC_ADD_MORE = "SC_ADD_MORE";
export const SC_ADD_NEW = "SC_ADD_NEW";

export const SH_INIT = "SH_INIT";
export const SH_ADD_MORE = "SH_ADD_MORE";
export const SH_ADD_NEW = "SH_ADD_NEW";

// 启事列表
export const QS_INIT = "QS_INIT";
export const QS_ADD_MORE = "QS_ADD_MORE";
export const QS_ADD_NEW = "QS_ADD_NEW";

// 人员列表
export const RY_INIT = "RY_INIT";
export const RY_ADD_MORE = "RY_ADD_MORE";
export const RY_ADD_NEW = "RY_ADD_NEW";

// 用户页
export const YH_INIT = "YH_INIT";
export const YH_ADD_MORE = "YH_ADD_MORE";
export const YH_ADD_NEW = "YH_ADD_NEW";

export const CLEAR = "CLEAR";
export const CLEAR_YH = "CLEAR_YH";
export const SET_MAIL = "SET_MAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_USER = "SET_USER";
export const SET_MENU = "SET_MENU";
export const SET_PERSON = "SET_PERSON";


export const CHANGE_LIST_FINISH = `@@改变-列表-重复加载`;

import { Get, Post, Upload } from './../configs/RequestUtil';
import url from './../configs/url';

import Toast from 'react-native-root-toast';
import { start, stop } from './GlobalAction';
import { POP, PUSH, Reset } from './RouterAction';

import JPushModule from 'jpush-react-native';

import {
    AsyncStorage
} from 'react-native';


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

export function clearData() {
    return {
        type: CLEAR,
    };
}
export function clearYHData() {
    return {
        type: CLEAR_YH,
    };
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
export function set_mail(mail) {
    return {
        type: SET_MAIL,
        mail: mail
    };
}
export function set_password(password) {
    return {
        type: SET_PASSWORD,
        password: password
    };
}
export function set_user(user) {
    return {
        type: SET_USER,
        user: user
    };
}
export function set_menu(menu) {
    return {
        type: SET_MENU,
        menu: menu
    };
}

export function set_person(person) {
    return {
        type: SET_PERSON,
        person: person
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
 * 注册;
 * email password 必选
 * */

// 判断是否是手机号码
const isMail = 	/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
// 判断密码
const Password = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
_isMail = (str) => {
    return (isMail.test(str));
};


let isRegister = false;
export function register(email,password) {
    return dispatch => {
        if (!isRegister) {
            isRegister = true;
            dispatch(start());
            if (_isMail(email)){

                if (password){
                    Post(url.register, null, {email: email, password: password})
                        .then((data) => {
                            isRegister = false;
                            console.log(data);
                            dispatch(stop());
                            if(data.code === 0){
                                let toast = Toast.show(data.data, {
                                    duration: 1000,
                                    position: Toast.positions.CENTER,
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
                                        dispatch(set_mail(email));
                                        dispatch(set_password(password));
                                        dispatch(POP());
                                    }
                                });
                            }else {
                                let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                        }).catch((err) => {
                        console.log(err);
                        isRegister = false;
                        let toast = Toast.show('服务器错误!', {duration: 500, position: Toast.positions.TOP, shadow: false, animation: true, hideOnPress: true, delay: 0});
                        dispatch(stop());
                    });
                }else{
                    isRegister = false;
                    dispatch(stop());
                    let toast = Toast.show('请输入密码',  {duration: 500, position: Toast.positions.TOP, shadow: false, animation: true, hideOnPress: true, delay: 0});
                }

            }else {
                isRegister = false;
                dispatch(stop());
                let toast = Toast.show('邮箱格式有误,请输入正确邮箱!', {duration: 500, position: Toast.positions.TOP, shadow: false, animation: true, hideOnPress: true, delay: 0});
            }


        }
    }
}


/*
 * 登录;
 * email password 必选
 * */
let isLogin = false;
export function login(email,password) {
    return dispatch => {
        if (!isLogin) {
            isLogin = true;
        dispatch(start());
            // if (_isMail(email)) {
            if (2>1) {

                if (password) {
                    Post(url.login, null, {email: email, password: password})
                        .then((data) => {
                            console.log(data);

                            // dispatch(NavigationActions.navigate({ routeName: 'Me' }));
                            isLogin = false;
                            dispatch(stop());

                            if(data.code === 0){
                                let toast = Toast.show('登录成功', {duration: 1000, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
                                let userStr = JSON.stringify(data.data);
                                console.log(userStr);

                                if(data.data.role > 0){

                                    JPushModule.setTags(["role"], () => {
                                        // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                                        console.log('success set tag in role');
                                    }, () => {
                                        // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                                        console.log('fail set tag  in role');
                                    });
                                }

                                JPushModule.setAlias(data.data._id, () => {
                                        // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                                        console.log('success set setAlias 用户 id');
                                    }, () => {
                                        // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                                        console.log('fail set setAlias 用户 id');
                                    });

                                
                                // 本地化
                                AsyncStorage.setItem( 'user', userStr ).then(
                                    ()=>{
                                        // redux 赋值
                                        console.log('---AsyncStorage-setItem-user------');
                                        console.log('user--存储成功');
                                        dispatch(set_user(data.data));
                                        dispatch(POP());
                                    }
                                ).catch(
                                    (error)=>{console.log('user--存储失败')}
                                );
                            }else {
                                let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                        }).catch((err) => {
                        console.log(err);
                        isLogin = false;
                        dispatch(stop());
                    });
                }else{
                    isLogin = false;
                    dispatch(stop());
                    let toast = Toast.show('请输入密码',  {duration: 500, position: Toast.positions.TOP, shadow: false, animation: true, hideOnPress: true, delay: 0});
                }
            }else {
                isLogin = false;
                dispatch(stop());
                let toast = Toast.show('邮箱格式有误,请输入正确邮箱!', {duration: 500, position: Toast.positions.TOP, shadow: false, animation: true, hideOnPress: true, delay: 0});
            }
    }}
}



/*
 * 同步登陆状态;
 * email password 必选
 * */
let isSync = false;
export function sync(token) {
    return dispatch => {
        if (!isSync) {
            isSync = true;
          Get(url.syncstatus, token).then((data)=>{
              console.log('---sync-data---');
              console.log(data);
              if(data.code === 0){
                  let userStr = JSON.stringify(data.data);

                  if(data.data.role > 0){
                          JPushModule.setTags(["role"], () => {
                              // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                              console.log('sync success set tag in role');
                          }, () => {
                              // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                              console.log('sync fail set tag  in role');
                          });
                  }else{
                      JPushModule.deleteTags(["role"], () => {
                          // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                          console.log('sync success deleteTags  in role');
                      }, () => {
                          // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                          console.log('sync fail set deleteTags  in role');
                      });
                  }


                  // 本地化
                  AsyncStorage.setItem( 'user', userStr ).then(
                      ()=>{
                          // redux 赋值
                          console.log('---AsyncStorage-setItem-user------');
                          console.log('user--存储成功');
                          dispatch(set_user(data.data));
                      }
                  ).catch(
                      (error)=>{console.log('user--存储失败')}
                  );
              }else{
                  let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
              }
              isSync = false;
          }).catch((err)=>{
              console.log(err);
              isSync = false;
          });

        }
    }
}

/*
 * 退出;
 * */
export function logout() {
    return dispatch => {

            JPushModule.cleanTags(() => {
                console.log('logout - success cleanTags');
            }, () => {
                console.log('logoutfail cleanTags');
            });
            JPushModule.deleteAlias(() => {
                console.log('logout - success deleteAlias');
            }, () => {
                console.log('logoutfail deleteAlias');
            });


        // 删除本地化的文件
        // removeItem
        AsyncStorage.removeItem( 'user' ).then(
            ()=>{
                // redux 赋值
                console.log('---AsyncStorage-removeItem-user------');
                console.log('user--清除存储成功');
                dispatch(POP());
                dispatch(set_user(null));
            }
        ).catch(
            (error)=>{console.log('user--清除存储失败')}
        );

        }
}


/*
 * 修改密码;
 * email password 必选
 * */
let isForgot = false;
export function forgot(email,oldpassword,newpassword) {
    return dispatch => {
        if (!isForgot) {
            isForgot = true;
            dispatch(start());
            Post(url.forgot, null, {email: email, oldpassword: oldpassword, newpassword: newpassword})
                .then((data) => {
                    console.log(data);
                    // dispatch(NavigationActions.navigate({ routeName: 'Me' }));
                    console.log('----NavigationActions');
                    isForgot = false;
                    dispatch(stop());
                }).catch((err) => {
                console.log(err);
                isForgot = false;
                dispatch(stop());
            });
        }}
}

/*
 * 收藏启事;
 *
 * */
let isAddCollectiont = false;
export function addCollection(id, token, callback) {
    return dispatch => {
        if (!isAddCollectiont) {
            isAddCollectiont = true;
            let uri= `${url.addcollection}/${id}`;
            Get(uri, token)
                .then((data) => {
                    if(data.code === 0){
                            JPushModule.setTags([`post_${id}`], () => {
                                // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                                console.log('success set addCollection tag');
                            }, () => {
                                // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                                console.log('fail set addCollection tag');
                            });
                        callback && callback();
                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    }
                    isAddCollectiont = false;
                }).catch((err) => {
                console.log(err);
                isAddCollectiont = false;
            });
        }}
}


/*
 * 取消收藏启事;
 *
 * */
let isDelCollection = false;
export function delCollection(id, token, callback) {
    return dispatch => {
        if (!isDelCollection) {
            isDelCollection = true;
            let uri= `${url.delcollection}/${id}`;
            Get(uri, token)
                .then((data) => {
                    if(data.code === 0){

                        // 等待 jpush 设置取消接口

                        callback && callback();
                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    }
                    isDelCollection = false;
                }).catch((err) => {
                console.log(err);
                isDelCollection = false;
            });
        }}
}

/*
 * 我的寻物启事;
 * postID sort 同时-可选
 * limit 可选
 * */
let isMyxwlist = false;
export function myxwlist(isInit, lostStatus, postID, sort, token, limit) {
        return dispatch => {
            if (!isMyxwlist) {
                isMyxwlist = true;
                if (isInit){
                    dispatch(new_start());
                    dispatch(initFinish());
                }else{
                    if (postID || sort) {
                        if(sort === 'new'){
                            dispatch(new_start());
                        }else{
                            dispatch(more_start());
                        }
                    }else{
                        dispatch(start());
                        dispatch(initFinish());
                    }
                }

                let uri;
                if (limit) {
                    if(lostStatus === 0 || lostStatus === 1){
                        if (postID) {
                            uri = `${url.myxwlist}?lostStatus=${lostStatus}&type=0&postID=${postID}&sort=${sort}&limit=${limit}`;
                        } else {
                            uri = `${url.myxwlist}?lostStatus=${lostStatus}&type=0&limit=${limit}`;
                        }
                    }else{
                        if (postID) {
                            uri = `${url.myxwlist}?type=0&postID=${postID}&sort=${sort}&limit=${limit}`;
                        } else {
                            uri = `${url.myxwlist}?type=0&limit=${limit}`;
                        }
                    }
                } else {
                    if(lostStatus === 0 || lostStatus === 1){
                        if (postID) {
                            uri = `${url.myxwlist}?lostStatus=${lostStatus}&type=0&postID=${postID}&sort=${sort}`;
                        } else {
                            uri = `${url.myxwlist}?lostStatus=${lostStatus}&type=0`;
                        }
                    }else{
                        if (postID) {
                            uri = `${url.myxwlist}?type=0&postID=${postID}&sort=${sort}`;
                        } else {
                            uri = `${url.myxwlist}?type=0`;
                        }
                    }

                }

                Get(uri, token)
                    .then((data) => {
                        console.log('---then-data---');
                        console.log(data);
                        isMyxwlist = false;
                        if(data.code === 0){
                            if (isInit){
                                dispatch(type_data(XW_INIT, data.data));
                            }else{
                                if (data.data.length > 0) {
                                    if (postID || sort) {
                                        if (sort === 'new') {
                                            dispatch(type_data(XW_ADD_NEW, data.data));
                                        } else {
                                            dispatch(type_data(XW_ADD_MORE, data.data));
                                        }
                                    } else {
                                        dispatch(type_data(XW_INIT, data.data));
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
                                        delay: 0
                                    });
                                }
                            }

                        }else{
                            let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                        }

                        if (isInit){
                            dispatch(new_stop());
                        }else{
                            if (postID || sort) {
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
                    isMyxwlist = false;
                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if (postID || sort) {
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
 * 我的招领启事;
 * postID sort 同时-可选
 * limit 可选
 * */
let isMyzllist = false;
export function myzllist(isInit, lostStatus, postID, sort, token, limit) {
    return dispatch => {
        if (!isMyzllist) {
            isMyzllist = true;
            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if (postID || sort) {
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
                if(lostStatus === 0 || lostStatus === 1){
                    if (postID) {
                        uri = `${url.myzllist}?lostStatus=${lostStatus}&type=1&postID=${postID}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.myzllist}?lostStatus=${lostStatus}&type=1&limit=${limit}`;
                    }
                }else{
                    if (postID) {
                        uri = `${url.myzllist}?type=1&postID=${postID}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.myzllist}?type=1&limit=${limit}`;
                    }
                }
            } else {
                if(lostStatus === 0 || lostStatus === 1){
                    if (postID) {
                        uri = `${url.myzllist}?lostStatus=${lostStatus}&type=1&postID=${postID}&sort=${sort}`;
                    } else {
                        uri = `${url.myzllist}?lostStatus=${lostStatus}&type=1`;
                    }
                }else{
                    if (postID) {
                        uri = `${url.myzllist}?type=1&postID=${postID}&sort=${sort}`;
                    } else {
                        uri = `${url.myzllist}?type=1`;
                    }
                }

            }

            Get(uri, token)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    isMyzllist = false;
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(ZL_INIT, data.data));
                        }else{
                            if (data.data.length > 0) {
                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(ZL_ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(ZL_ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(ZL_INIT, data.data));
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

                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                    }

                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if (postID || sort) {
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
                isMyzllist = false;
                if (isInit){
                    dispatch(new_stop());
                }else{
                    if (postID || sort) {
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
 * 我的收藏启事;
 * postID sort 同时-可选
 * limit 可选
 * */
let isMycollection = false;
export function mycollection(collection_id, sort, token, limit) {
    return dispatch => {
        if (!isMycollection) {
            isMycollection = true;
            if(collection_id || sort){
                if(sort === 'new'){
                    dispatch(new_start());
                }else{
                    dispatch(more_start());
                }
            }else{
                dispatch(start());
                dispatch(initFinish());
            }
            let uri;
            if (limit) {
                    if (collection_id) {
                        uri = `${url.mycollection}?collection_id=${collection_id}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.mycollection}?limit=${limit}`;
                    }

            } else {
                    if (collection_id) {
                        uri = `${url.mycollection}?collection_id=${collection_id}&sort=${sort}`;
                    } else {
                        uri = `${url.mycollection}`;
                    }

            }
            Get(uri, token)
                .then((data) => {
                    console.log(data);
                    if(data.code === 0){
                            if (data.data.length > 0) {
                                if (collection_id || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(SC_ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(SC_ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(SC_INIT, data.data));
                                }
                            } else {
                                console.log("没有新数据");
                                dispatch(endFinish());
                                setTimeout(()=>{
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
                                },1000);
                            }

                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                    }
                    isMycollection = false;
                    if(collection_id || sort){
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }
                }).catch((err) => {
                console.log(err);
                isMycollection = false;
                if(collection_id || sort){
                    if(sort === 'new'){
                        dispatch(new_stop());
                    }else{
                        dispatch(more_stop());
                    }
                }else{
                    dispatch(stop());
                }
            });
        }}
}

/*
 * 启事审核列表;
 * postID sort 同时-可选
 * limit 可选
 * */
let isPostCheck = false;
export function postcheck(isInit, postID, sort, status, token, limit) {
    return dispatch => {
        if (!isPostCheck) {
            isPostCheck = true;

            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if (postID || sort) {
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(start());
                    dispatch(initFinish());
                }
            }

            let uri;
            if (limit) {
                    if (postID) {
                        uri = `${url.tweetlist}?status=${status}&postID=${postID}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.tweetlist}?status=${status}&limit=${limit}`;
                    }
            } else {
                if (postID) {
                    uri = `${url.tweetlist}?status=${status}&postID=${postID}&sort=${sort}`;
                } else {
                    uri = `${url.tweetlist}?status=${status}`;
                }
            }

            Get(uri, token)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    isPostCheck = false;
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(QS_INIT, data.data));
                        }else{
                            if (data.data.length > 0) {
                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(QS_ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(QS_ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(QS_INIT, data.data));
                                }
                            } else {
                                console.log("没有新数据");
                                dispatch(endFinish());
                                let toast = Toast.show('没有新数据', {duration: 500, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                        }

                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                    }

                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if (postID || sort) {
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
                isPostCheck = false;
                if (isInit){
                    dispatch(new_stop());
                }else{
                    if (postID || sort) {
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
 * 人员审核列表;
 * postID sort 同时-可选
 * limit 可选
 * */
let isRoleCheck = false;
export function rolecheck(isInit, userID, sort, status, role, token, limit) {
    return dispatch => {
        if (!isRoleCheck) {
            isRoleCheck = true;

            if (isInit){
                dispatch(new_start());
                dispatch(initFinish());
            }else{
                if (userID || sort) {
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(start());
                    dispatch(initFinish());
                }
            }

            let uri;
            if (limit) {
                if (role){
                    if (userID) {
                        uri = `${url.userlist}?status=${status}&userID=${userID}&role=${role}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.userlist}?status=${status}&role=${role}&limit=${limit}`;
                    }
                }else{
                    if (userID) {
                        uri = `${url.userlist}?status=${status}&userID=${userID}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.userlist}?status=${status}&limit=${limit}`;
                    }
                }

            } else {
                if (role){
                    if (userID) {
                        uri = `${url.userlist}?status=${status}&role=${role}&userID=${userID}&sort=${sort}`;
                    } else {
                        uri = `${url.userlist}?status=${status}&role=${role}`;
                    }
                }else{
                if (userID) {
                    uri = `${url.userlist}?status=${status}&userID=${userID}&sort=${sort}`;
                } else {
                    uri = `${url.userlist}?status=${status}`;
                }
                }
            }

            Get(uri, token)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(RY_INIT, data.data));
                        }else{
                            if (data.data.length > 0) {
                                if (userID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(RY_ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(RY_ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(RY_INIT, data.data));
                                }
                            } else {
                                console.log("没有新数据");
                                dispatch(endFinish());
                                let toast = Toast.show('没有新数据', {duration: 500, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                        }

                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                    }

                    if (isInit){
                        dispatch(new_stop());
                    }else{
                        if (userID || sort) {
                            if(sort === 'new'){
                                dispatch(new_stop());
                            }else{
                                dispatch(more_stop());
                            }
                        }else{
                            dispatch(stop());
                        }
                    }
                    isRoleCheck = false;
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);

                if (isInit){
                    dispatch(new_stop());
                }else{
                    if (userID || sort) {
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(stop());
                    }
                }
                isRoleCheck = false;
            });



        }
    }
}

/*
 * 用户信息;
 * id
 * */
let isGetPerson = false;
export function getPerson(id) {
    return dispatch => {
        if (!isGetPerson) {
            isGetPerson = true;
            dispatch(start());

            let uri = `${url.getperson}/${id}`;

            Get(uri)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    isGetPerson = false;
                    if (data.code === 0) {
                        dispatch(set_person(data.data));
                    } else {
                        let toast = Toast.show(data.msg, {
                            duration: 1000,
                            position: Toast.positions.CENTER,
                            shadow: false,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    }
                    dispatch(stop());

                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetPerson = false;
                dispatch(stop());
            });
        }
    }
}


/*
 * 用户寻物启事;
 * postID sort 同时-可选
 * limit 可选
 * */
let isGetyhlist = false;
export function getyhlist(isInit, id, type, postID, sort, limit) {
    return dispatch => {
        if (!isGetyhlist) {
            isGetyhlist = true;

                if (postID || sort) {
                    if(sort === 'new'){
                        dispatch(new_start());
                    }else{
                        dispatch(more_start());
                    }
                }else{
                    dispatch(new_start());
                    dispatch(initFinish());
                }


            let uri;
            if (limit) {
                    if (postID) {
                        uri = `${url.getyhlist}/${id}?type=${type}&postID=${postID}&sort=${sort}&limit=${limit}`;
                    } else {
                        uri = `${url.getyhlist}/${id}?type=${type}&limit=${limit}`;
                    }
            } else {
                    if (postID) {
                        uri = `${url.getyhlist}/${id}?type=${type}&postID=${postID}&sort=${sort}`;
                    } else {
                        uri = `${url.getyhlist}/${id}?type=${type}`;
                    }
            }

            Get(uri)
                .then((data) => {
                    console.log('---then-data---');
                    console.log(data);
                    isGetyhlist = false;
                    if(data.code === 0){
                        if (isInit){
                            dispatch(type_data(YH_INIT, data.data));
                        }else{
                            if (data.data.length > 0) {
                                if (postID || sort) {
                                    if (sort === 'new') {
                                        dispatch(type_data(YH_ADD_NEW, data.data));
                                    } else {
                                        dispatch(type_data(YH_ADD_MORE, data.data));
                                    }
                                } else {
                                    dispatch(type_data(YH_INIT, data.data));
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
                                    delay: 0
                                });
                            }
                        }
                    }else{
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0,});
                    }

                        if (postID || sort) {
                            if(sort === 'new'){
                                dispatch(new_stop());
                            }else{
                                dispatch(more_stop());
                            }
                        }else{
                            dispatch(new_stop());
                        }
                }).catch((err) => {
                console.log('---catch-err---');
                console.log(err);
                isGetyhlist = false;
                    if (postID || sort) {
                        if(sort === 'new'){
                            dispatch(new_stop());
                        }else{
                            dispatch(more_stop());
                        }
                    }else{
                        dispatch(new_stop());
                    }
            });

        }
    }
}


/*
 * 更改人员权限和状态;
 * id 必须 status, role 二选一
 * */
let isSetStatus = false;
export function setstatus(_id, status, role, token, callback) {
    return dispatch => {
        if (!isSetStatus) {
            isSetStatus = true;
            let uri;

            if(status !== null){
                uri = `${url.mesetstatus}?_id=${_id}&status=${status}`;
            }

            if(role !== null){
                uri = `${url.mesetstatus}?_id=${_id}&role=${role}`;
            }


            Get(uri, token).then((data) => {
                if(data.code === 0){
                    let toast = Toast.show("修改成功!", {duration: 1000, position: Toast.positions.BOTTOM, shadow: false, animation: true, hideOnPress: true, delay: 0});
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
 * 人员信息修改;
 * id 必须 status, role 二选一
 * */
let isSetInfo = false;
export function setinfo(userName, oldImage, newImage, tel, token) {
    return dispatch => {
        if (!isSetInfo) {
            isSetInfo = true;

            if (oldImage === newImage){
                // 直接上传 info ,不用上传新图片;
                Post(url.setperson, token, {userName: userName, avatar: oldImage, tel: tel}).then((pdata)=>{
                    if(pdata.code === 0){
                        let userStr = JSON.stringify(pdata.data);
                        if(pdata.data.role > 0){

                            JPushModule.setTags(["role"], () => {
                                // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                                console.log('success set tag');
                            }, () => {
                                // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                                console.log('fail set tag');
                            });
                        }
                        // 本地化
                        AsyncStorage.setItem( 'user', userStr ).then(
                            ()=>{
                                // redux 赋值
                                console.log('---AsyncStorage-setItem-user------');
                                console.log('user--存储成功');
                                dispatch(set_user(pdata.data));
                            }
                        ).catch((error)=>{
                           console.log('user--存储失败');
                        });
                        isSetInfo = false;
                        let toast = Toast.show("修改用户资料成功!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    }else{
                        isSetInfo = false;
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    }
                }).catch((err)=>{
                    isSetInfo = false;
                    console.log(err);
                    let toast = Toast.show("服务器错误,用户信息修改失败!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                });
            }else{
                // 要上传新图片
                Upload(url.uploadFile, token, newImage).then((data)=>{
                    if(data.code === 0){
                        Post(url.setperson, token, {userName: userName, avatar: data.data, tel: tel}).then((pdata)=>{
                            if(pdata.code === 0){
                                if(data.data.role > 0){

                                    JPushModule.setTags(["role"], () => {
                                        // Alert.alert('成功', 'tags 成功',[{text: 'OK'}])；
                                        console.log('success set tag');
                                    }, () => {
                                        // Alert.alert('失败','设置alias 失败',[{text:'fail'}]);
                                        console.log('fail set tag');
                                    });
                                }

                                let userStr = JSON.stringify(pdata.data);
                                // 本地化
                                AsyncStorage.setItem( 'user', userStr ).then(
                                    ()=>{
                                        // redux 赋值
                                        console.log('---AsyncStorage-setItem-user------');
                                        console.log('user--存储成功');
                                        dispatch(set_user(pdata.data));
                                    }
                                ).catch(
                                    (error)=>{console.log('user--存储失败')}
                                );
                                isSetInfo = false;
                                let toast = Toast.show("修改用户资料成功!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }else{
                                isSetInfo = false;
                                let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                            }
                        }).catch(()=>{
                            isSetInfo = false;
                            console.log(err);
                            let toast = Toast.show("服务器错误,用户信息修改失败!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                        });

                    }else{
                        isSetInfo = false;
                        let toast = Toast.show(data.msg, {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                    }
                }).catch((err)=>{
                    isSetInfo = false;
                    console.log(err);
                    let toast = Toast.show("服务器错误,图片上传失败,用户信息修改失败!", {duration: 1000, position: Toast.positions.CENTER, shadow: false, animation: true, hideOnPress: true, delay: 0});
                })

            }

        }}
}

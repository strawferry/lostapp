
import config from './config';

const
    register = "/me/register",
    forgot = "/me/forgot",
    login = "/me/login",
    addcollection = "/me/addcollection",
    delcollection = "/me/delcollection",
    myxwlist = "/me/myxwlist",
    myzllist = "/me/myzllist",
    tweetlist = "/me/tweetlist",
    userlist = "/me/userlist",
    syncstatus = "/me/syncstatus",
    mycollection = "/me/mycollection",
    setperson = "/me/setperson",
    mesetstatus = "/me/setstatus",
    getperson = "/me/getperson",
    getyhlist = "/me/getyhlist",


    list = "/post/list",
    detail = "/post/detail",
    add = "/post/add",
    setstatus = "/post/setstatus",
    uploadFile = "/post/uploadFile",
    setloststatus = "/post/setloststatus";

const getFullUrl = (e)=>{
    return `${config.serverUrl}/${config.serverVersion}${e}`;
};

export default url = {
    register: getFullUrl(register),
    forgot: getFullUrl(forgot),
    addcollection: getFullUrl(addcollection),
    delcollection: getFullUrl(delcollection),
    myxwlist: getFullUrl(myxwlist),
    syncstatus: getFullUrl(syncstatus),
    mycollection: getFullUrl(mycollection),
    myzllist: getFullUrl(myzllist),
    setperson: getFullUrl(setperson),
    mesetstatus: getFullUrl(mesetstatus),
    getperson: getFullUrl(getperson),
    getyhlist: getFullUrl(getyhlist),
    tweetlist: getFullUrl(tweetlist),
    userlist: getFullUrl(userlist),
    login: getFullUrl(login),
    list: getFullUrl(list),
    detail: getFullUrl(detail),
    add: getFullUrl(add),
    setstatus: getFullUrl(setstatus),
    setloststatus: getFullUrl(setloststatus),
    uploadFile: getFullUrl(uploadFile),
}
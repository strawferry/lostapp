'use strict';


const initialState = {
    user: null,
    person: null,
    xwdata: [],
    zldata: [],
    scdata: [],
    shdata: [],
    qsdata: [],
    rydata: [],
    yhdata: [],
    menu: ['违规用户', '正常用户'],
    newLoading: false,
    moreLoading: false,
    finish: false,
    mail: ''
};

import {
    REGISTER,

    XW_INIT,
    XW_ADD_MORE,
    XW_ADD_NEW,

    ZL_INIT,
    ZL_ADD_MORE,
    ZL_ADD_NEW,

    SC_INIT,
    SC_ADD_MORE,
    SC_ADD_NEW,

    SH_INIT,
    SH_ADD_MORE,
    SH_ADD_NEW,


    QS_INIT,
    QS_ADD_MORE,
    QS_ADD_NEW,

    RY_INIT,
    RY_ADD_MORE,
    RY_ADD_NEW,

    YH_INIT,
    YH_ADD_MORE,
    YH_ADD_NEW,

    CLEAR,
    CLEAR_YH,
    NEW_LOADING_STATUS,
    MORE_LOADING_STATUS,

    SET_MAIL,
    SET_PASSWORD,
    SET_USER,
    SET_MENU,

    SET_PERSON,
    CHANGE_LIST_FINISH


} from './../actions/MeAction';

export default function me(state = initialState, action) {

    switch (action.type) {
        case CHANGE_LIST_FINISH:
            return Object.assign({}, state,
                {
                    finish: action.finish
                });
        case REGISTER :
            return Object.assign({}, state,
                {
                    id: action.id
                });
        case XW_INIT :
            return Object.assign({}, state,
                {
                    xwdata: action.data
                });
        case XW_ADD_MORE :
            return Object.assign({}, state,
                {
                    xwdata: [...state.xwdata, ...action.data]
                });
        case XW_ADD_NEW :
            return Object.assign({}, state,
                {
                    xwdata: [...action.data, ...state.xwdata]
                });

        case ZL_INIT :
            return Object.assign({}, state,
                {
                    zldata: action.data
                });
        case ZL_ADD_MORE :
            return Object.assign({}, state,
                {
                    zldata: [...state.zldata, ...action.data]
                });
        case ZL_ADD_NEW :
            return Object.assign({}, state,
                {
                    zldata: [...action.data, ...state.zldata]
                });

        case SC_INIT :
            return Object.assign({}, state,
                {
                    scdata: action.data
                });
        case SC_ADD_MORE :
            return Object.assign({}, state,
                {
                    scdata: [...state.scdata, ...action.data]
                });
        case SC_ADD_NEW :
            return Object.assign({}, state,
                {
                    scdata: [...action.data, ...state.scdata]
                });

        case SH_INIT :
            return Object.assign({}, state,
                {
                    shdata: action.data
                });
        case SH_ADD_MORE :
            return Object.assign({}, state,
                {
                    shdata: [...state.shdata, ...action.data]
                });
        case SH_ADD_NEW :
            return Object.assign({}, state,
                {
                    shdata: [...action.data, ...state.shdata]
                });

        case QS_INIT :
            return Object.assign({}, state,
                {
                    qsdata: action.data
                });
        case QS_ADD_MORE :
            return Object.assign({}, state,
                {
                    qsdata: [...state.qsdata, ...action.data]
                });
        case QS_ADD_NEW :
            return Object.assign({}, state,
                {
                    qsdata: [...action.data, ...state.qsdata]
                });

        case RY_INIT :
            return Object.assign({}, state,
                {
                    rydata: action.data
                });
        case RY_ADD_MORE :
            return Object.assign({}, state,
                {
                    rydata: [...state.rydata, ...action.data]
                });
        case RY_ADD_NEW :
            return Object.assign({}, state,
                {
                    rydata: [...action.data, ...state.rydata]
                });


        case YH_INIT :
            return Object.assign({}, state,
                {
                    yhdata: action.data
                });
        case YH_ADD_MORE :
            return Object.assign({}, state,
                {
                    yhdata: [...state.yhdata, ...action.data]
                });
        case YH_ADD_NEW :
            return Object.assign({}, state,
                {
                    yhdata: [...action.data, ...state.yhdata]
                });


        case NEW_LOADING_STATUS :
            return Object.assign({}, state,
                {
                    newLoading: action.isLoading
                });
        case MORE_LOADING_STATUS :
            return Object.assign({}, state,
                {
                    moreLoading: action.isLoading
                });

        case SET_MAIL :
            return Object.assign({}, state,
                {
                    mail: action.mail
                });
            case SET_PASSWORD :
            return Object.assign({}, state,
                {
                    password: action.password
                });
            case SET_USER :
            return Object.assign({}, state,
                {
                    user: action.user
                });
            case SET_MENU :
            return Object.assign({}, state,
                {
                    menu: action.menu
                });
            case SET_PERSON :
            return Object.assign({}, state,
                {
                    person: action.person
                });

        case CLEAR :
            return Object.assign({}, state,
                {
                    xwdata: [],
                    zldata: [],
                    scdata: [],
                    shdata: [],
                    qsdata: [],
                    rydata: [],
                });
        case CLEAR_YH :
            return Object.assign({}, state,
                {
                    yhdata: [],
                });

        default:
            return state;
    }

}
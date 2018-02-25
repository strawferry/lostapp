'use strict';


const initialState = {
    data: [],
    newLoading: false,
    moreLoading: false,
    finish: false
};

import {
    INIT,
    ADD_MORE,
    ADD_NEW,
    NEW_LOADING_STATUS,
    MORE_LOADING_STATUS,
    CHANGE_LIST_FINISH

} from './../actions/HomeAction';

export default function global(state = initialState, action) {

    switch (action.type) {
        case INIT :
            return Object.assign({}, state,
                {
                    data: action.data
                });
        case ADD_MORE :
            return Object.assign({}, state,
                {
                    data: [...state.data, ...action.data]
                });
        case ADD_NEW :
            return Object.assign({}, state,
                {
                    data: [...action.data, ...state.data]
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
        case CHANGE_LIST_FINISH:
            return Object.assign({}, state,
                {
                    finish: action.finish
                });

        default:
            return state;
    }

}
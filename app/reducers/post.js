'use strict';


const initialState = {
    id: null,
    data: {},
    lx: 'sw'
};

import {
    SET_ID,
    SET_DATA,
    SET_TYPE,

} from './../actions/PostAction';

export default function post(state = initialState, action) {

    switch (action.type) {
        case SET_ID :
            return Object.assign({}, state,
                {
                    id: action.id
                });
        case SET_DATA :
            return Object.assign({}, state,
                {
                    data: action.data
                });

        case SET_TYPE :
            return Object.assign({}, state,
                {
                    lx: action.lx
                });


        default:
            return state;
    }

}



'use strict';



const initialState = {
    a: 20,
    b: "b",
    c: {"c": 12},
    d: [1,2,3,4]
};

import { TEST } from './../actions/testAction';

export default function test(state = initialState, action) {

    switch(action.type){
        case TEST :
            return Object.assign({}, state,
                {
                    a: action.str
                });
    }
    return state;
}
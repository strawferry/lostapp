'use strict';


const initialState = {
    loading: false,
    isAppIntro: false,
};

import { LOADING_STATUS, SET_INTRO  } from './../actions/GlobalAction';

export default function global(state = initialState, action) {

    switch (action.type) {
        case LOADING_STATUS :
            return Object.assign({}, state,
                {
                    loading: action.isLoading
                });
        case SET_INTRO :
            return Object.assign({}, state,
                {
                    isAppIntro: action.isAppIntro
                });


        default:
            return state;
    }

}
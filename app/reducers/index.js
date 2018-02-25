

import {combineReducers} from 'redux';

import global from './global';
import home from './home';
import me from './me';
import post from './post';
import test from './test';
import nav from './nav';

export default combineReducers({
    global,
    home,
    me,
    post,
    test,
    nav,

});

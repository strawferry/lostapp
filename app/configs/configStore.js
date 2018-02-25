


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

export default function configureStore() {

    let Middleware = compose(
        applyMiddleware(thunk),
    );
    let store = createStore(reducer, Middleware);
    return store;
}




'use strict';

import { AppNavigator, Tab, ModalStack } from './../AppNavigator';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Tab'));

export default function nav(state, action) {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}
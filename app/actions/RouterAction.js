

import { NavigationActions } from 'react-navigation';

export function PUSH(to) {
    return dispatch => {dispatch(NavigationActions.navigate({ routeName: to }));}
}

export function Reset(to) {
    return dispatch => {
        dispatch(
            NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: to})]
                })
        )
    }
}

export function POP() {
    return dispatch => {dispatch(NavigationActions.back());}
}


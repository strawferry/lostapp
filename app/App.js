
/*
* redux 设置
* */


import React, {Component} from 'react';



import { Provider } from 'react-redux'
import AppRouter from './AppRouter';
import configStore from './configs/configStore';

import codePush from "react-native-code-push";


class App extends Component {

    render() {
        return (
            <Provider store={configStore()}>
                <AppRouter />
            </Provider>
        );
    }
}

App = codePush({
    updateDialog: false,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
})(App);

export default  App;
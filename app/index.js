



import {AppRegistry, StyleSheet, Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get("window");
global.Sip = StyleSheet.hairlineWidth;
global.SWidth = width;
global.SHeight = height;

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

if(Platform.OS === 'ios'){
    global.__APP__ = true;
    global.__ANDROID__ = false;
    global.__IOS__ = true;
}else{
    global.__APP__ = true;
    global.__ANDROID__ = true;
    global.__IOS__ = false;
}

import App from './App';

AppRegistry.registerComponent('lost100', () => App);

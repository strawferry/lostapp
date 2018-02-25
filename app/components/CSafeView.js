/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Dimensions,
    PixelRatio,
    NativeModules,
    DeviceInfo,
    Platform
} from 'react-native';

const { isIPhoneX_deprecated } = DeviceInfo;
const X_WIDTH = 375;
const X_HEIGHT = 812;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};
const isIPhoneX = (() => {
    if (minor >= 50) {
        return isIPhoneX_deprecated;
    }

    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
})();


const dip = 1/PixelRatio.get();
const {height, width} = Dimensions.get('window');

export default class CSafeView extends Component {
    render() {
        return (
            <View style={[{flex: 1, marginBottom: isIPhoneX ? 30 : 0}, this.props.top && {marginTop: isIPhoneX ? 44: 20}]} {...this.props}>{this.props.children}</View>
        );
    }
}



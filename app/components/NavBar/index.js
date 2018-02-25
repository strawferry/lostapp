
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    PixelRatio,
    NativeModules,
    StatusBar,
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


import PropTypes from 'prop-types';

export default class NavBar extends Component {

    static defaultProps = {
        isTransparent: false,
        statusBarStyle: "dark-content",
        statusBgColor: "#fddb54",
        navBgColor: '#fddb54',
        title: "title",
        leftIcon: require('../../images/icon_back.png'),
        rightIcon: require('../../images/icon_share.png'),
    };  // 注意这里有分号
    static propTypes = {
        isTransparent: PropTypes.bool,
        statusBarStyle: PropTypes.string,
        navBgColor: PropTypes.string,
        statusBgColor: PropTypes.string,
        title: PropTypes.string,
        leftFun: PropTypes.func,
        leftIcon: PropTypes.any,
        leftTitle: PropTypes.string,
        rightFun: PropTypes.func,
        rightIcon: PropTypes.any,
        rightTitle: PropTypes.string,
        titleColor: PropTypes.any,
    };

    render() {
        return (
            <View style={[styles.nav, {backgroundColor: this.props.isTransparent ? 'transparent' : this.props.navBgColor, borderBottomWidth: this.props.isTransparent ? 0: dip,}]}>
                <View style={{height: 44, position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[{fontSize: 18, marginTop: 0, color: this.props.isTransparent ? '#FFFFFF':"#333333", backgroundColor: 'transparent', maxWidth: 0.6*width}, this.props.titleColor ? {color: this.props.titleColor }: null ]}
                          allowFontScaling={false} numberOfLines={1} >
                        {this.props.title}
                    </Text>
                </View>
                {this.props.leftFun || this.props.leftTitle ?
                    <TouchableOpacity onPress={this.props.leftFun}
                                      style={{position: 'absolute', bottom: 0, left: 0, height: 44, minWidth: 44, justifyContent: 'center'}}>
                        <Text style={[{fontSize: 14, marginLeft: 10, color: this.props.isTransparent ? '#FFFFFF': '#333333', backgroundColor: 'transparent'}, this.props.titleColor ? {color: this.props.titleColor }: null]} allowFontScaling={false} >{this.props.leftTitle}</Text>
                    </TouchableOpacity>:null}
                {this.props.leftFun && !this.props.leftTitle ? <TouchableOpacity style={{position: 'absolute', bottom: 0, left: 0, height: 44, width: 44, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.leftFun}>
                    <Image source={this.props.leftIcon}
                           style={{height: 20, width: 20}}/>
                </TouchableOpacity>:null}

                {this.props.rightFun ?
                    <TouchableOpacity onPress={this.props.rightFun}
                                      style={{position: 'absolute', bottom: 0, right: 0, height: 44, minWidth: 44, justifyContent: 'center'}}>
                        <Text style={[{fontSize: 14, marginRight: 10, color: this.props.isTransparent ? '#FFFFFF': '#333333', backgroundColor: 'transparent'}, this.props.titleColor ? {color: this.props.titleColor }: null]} allowFontScaling={false}>{this.props.rightTitle}</Text>
                    </TouchableOpacity>:null}
                {this.props.rightFun && !this.props.rightTitle ?
                    <TouchableOpacity onPress={this.props.rightFun}
                                      style={{position: 'absolute', bottom: 0, right: 0, height: 44, width: 44, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={this.props.rightIcon} style={{height: 20, width: 20}}/>
                    </TouchableOpacity>:null}
                <StatusBar
                    translucent={true}
                    backgroundColor= {this.props.statusBgColor}
                    barStyle= {this.props.statusBarStyle}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    nav: {
        height: isIPhoneX ? 78: 64,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#E6E6E6'
    }
});
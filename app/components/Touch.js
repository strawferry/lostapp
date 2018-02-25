/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

export default class Touch extends Component {

    static defaultProps = {
        activeOpacity: 0.65
    };  // 注意这里有分号

    render() {
        return (
            Platform.OS === 'ios'?
                <TouchableOpacity {...this.props} activeOpacity={this.props.activeOpacity}>{this.props.children}</TouchableOpacity>
                :
                <TouchableNativeFeedback {...this.props}>{this.props.children}</TouchableNativeFeedback>
        );
    }
}



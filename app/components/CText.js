/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text} from 'react-native';

export default class CText extends Component {
    render() {
        return (
            <Text allowFontScaling={false} {...this.props}>{this.props.children}</Text>
        );
    }
}



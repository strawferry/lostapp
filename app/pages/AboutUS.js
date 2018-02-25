




import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';

import { DefaultBar, SafeView} from './../components';

class AboutUS extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={'关于我们'} />

                <View>
                    <Text>我们的开发者</Text>
                </View>

                <Text>移动端开发: 使用 ReactNative 开发,实现一套代码安卓 iOS 双平台!</Text>
                <Text>服务器开发: 服务器端使用 node.js 开发!</Text>

            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { POP } from './../actions/RouterAction';

import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({POP}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AboutUS);
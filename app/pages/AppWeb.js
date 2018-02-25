




import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import { DefaultBar, SafeView } from './../components';


class AppWeb extends Component {
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
                <DefaultBar title={'title'}
                    // rightTitle={'rightTitle'}
                    // rightFun={()=>{console.log('123')}}
                    // navBgColor={'red'}
                />

            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { login, back } from './../actions/MeAction';

import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({login,back}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppWeb);
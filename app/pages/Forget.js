




import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import { DefaultBar, SafeView } from './../components';

class Forget extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            email: "",
            password: ''
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
                <Text style={{fontSize: 30, color: 'red'}}>This is 密码找回页面.{this.props.loading ? "true":"false"}</Text>
                <TextInput placeholder={"email"} value={this.state.email} onChangeText={(e)=>{
                    this.setState({email: e})
                }} style={{height: 50, width: SWidth, marginTop: 100}}/>
                <TextInput placeholder={"password"} value={this.state.password} onChangeText={(e)=>{
                    this.setState({password: e})
                }} style={{height: 50, width: SWidth, marginTop: 50}}/>
                <Button title="登录" onPress={()=>{
                    this.props.actions.login(this.state.email, this.state.password);
                }} />
                <Button title="返回" onPress={()=>{
                    this.props.actions.back();
                }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Forget);
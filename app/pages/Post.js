

import React, {Component} from 'react';
import { View, Image, Alert } from 'react-native';

import {Text, NavBar, Touch } from './../components';



class Post extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._leadToLogin = this._leadToLogin.bind(this);
      }

    static navigationOptions = {
        tabBarLabel: '启事',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={focused ? require('./../images/tabs/post.png'): require('./../images/tabs/post_o.png')}
                style={{width: 30, height: 30}}
            />
        ),
    };

    componentDidMount() {
        console.log("------post-----");
    }
    _leadToLogin = (to)=>{
        if(this.props.user){
            this.props.RouterAction.PUSH(to);
        }else{
            Alert.alert(
                '提醒',
                '您当前还未登录,不能进入此页面!',
                [
                    {text: '待会再登录', onPress: () => {
                        console.log('待会再登录');
                    }, style: 'cancel'},
                    {text: '立即去登录', onPress: () => {
                        this.props.RouterAction.PUSH("Login");
                    }},
                ],
                { cancelable: false }
            )
        }
    };
    render() {
        let shareOptions = {
            title: "React Native",
            message: "Hola mundo",
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link" //  for email
        };
        return (
            <View style={{flex:1, backgroundColor: '#EFEFF6'}}>
                <NavBar title="发布" />
                <View style={{flex: 1}}>
                    <Touch style={{flex: 1}} onPress={()=>{
                        this.props.PostAction.set_type('sw');
                        this._leadToLogin('Tweet');
                    }} >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: 150, width: 150, backgroundColor: '#4ca5ff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 60, width: 60, marginLeft: 5}} source={require('./../images/lost.png')}/>
                        <Text style={{marginTop: 20, color: '#fff', fontSize: 18}}>失物启事</Text>
                        </View>
                    </View>
                    </Touch>
                    <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: Sip, backgroundColor: "#878E91", width: 0.9* SWidth}}/>
                        <View style={{position: 'absolute', backgroundColor: '#EFEFF6'}}>
                            <Text style={{height: 30,  textAlign: 'center', lineHeight: 30, width: 100, marginTop: __ANDROID__ ? -15 : 0}}>发布类型</Text>
                        </View>
                    </View>
                    <Touch style={{flex: 1}} onPress={()=>{
                        this.props.PostAction.set_type('zl');
                        this._leadToLogin('Tweet');
                    }} >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: 150, width: 150, backgroundColor: '#1ab20a', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 60, width: 60, marginLeft: 5}} source={require('./../images/lost.png')}/>
                            <Text style={{marginTop: 20, color: '#fff', fontSize: 18}}>招领启事</Text>
                        </View>
                    </View>
                    </Touch>
                </View>
            </View>
        );
    }
}

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { PUSH } from './../actions/RouterAction';
import { set_type } from './../actions/PostAction';


const mapStateToProps = (state) => {
    return {
        user: state.me.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        PostAction: bindActionCreators({set_type}, dispatch),
        RouterAction: bindActionCreators({PUSH}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
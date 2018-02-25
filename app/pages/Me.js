

import React, {Component} from 'react';
import { View, Button, Image, Alert, ScrollView} from 'react-native';

import { DefaultBar, NavBar, Text, Touch } from './../components';

class Me extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._leadToLogin = this._leadToLogin.bind(this);
      };

    static navigationOptions = {
        tabBarLabel: '我的',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={focused ? require('./../images/tabs/me.png'): require('./../images/tabs/me_o.png')}
                style={{width: 30, height: 30}}
            />
        ),
    };

    componentDidMount() {
        if(this.props.user){
            this.props.MeAction.sync(this.props.user.token);
        }

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
        return (
            <View style={{flex:1, backgroundColor: '#EFEFF6'}}>
                {this.props.user ? <View style={{height: 210, width: SWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fddb54'}}>
                    <Touch onPress={()=>{
                        this.props.RouterAction.PUSH("InfoSetting");
                    }}>
                        <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 1, borderColor: '#878E91'}} source={{uri: this.props.user.avatar}}/>
                    </Touch>
                    <Text style={{fontSize: 18, marginTop: 15}}>{this.props.user.userName}</Text>
                </View>:<View style={{height: 210, width: SWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fddb54'}}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 1, borderColor: '#878E91'}} source={{uri: "https://dn-coding-net-production-static.qbox.me/82b7ce57-96ef-4faf-a480-bb0645ab2a1a.jpg"}}/>
                    <Touch onPress={()=>{
                        this.props.RouterAction.PUSH("Login");
                    }}>
                        <View style={{marginTop: 15, borderRadius: 30, height: 30, width: 100, justifyContent: 'center', alignItems: 'center', borderColor: '#6248ff', borderWidth: Sip}}>
                            <Text style={{fontSize: 16}}>去登陆</Text>
                        </View>
                    </Touch>
                </View>}
                <ScrollView >
                <View style={{marginTop:7, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', borderTopColor: '#E6E6E6', borderTopWidth: Sip, backgroundColor: '#FFF'}}>
                    <Touch onPress={()=>{
                        this._leadToLogin("MySWList");
                    }}>
                    <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16}}>我的寻物启事</Text>
                        <Image source={require('./../images/icon_back.png')}
                               style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                    </View>
                    </Touch>
                    <Touch onPress={()=>{
                        this._leadToLogin("MyZLList");
                    }}>
                    <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16}}>我的招领启事</Text>
                        <Image source={require('./../images/icon_back.png')}
                               style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                    </View>
                    </Touch>
                    <Touch onPress={()=>{
                        this._leadToLogin("MyCollectionList");
                    }}>
                    <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16}}>我的收藏</Text>
                        <Image source={require('./../images/icon_back.png')}
                               style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                    </View>
                    </Touch>
                    <Touch onPress={()=>{
                        this.props.RouterAction.PUSH("Setting");
                    }}>
                    <View style={{height: 50, marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16}}>设置</Text>
                        <Image source={require('./../images/icon_back.png')}
                               style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                    </View>
                    </Touch>
                </View>


                    {this.props.user && this.props.user.role !== 0?<Text style={{marginTop: 20, marginLeft: 20, marginBottom: 4, fontSize: 16, color: '#878E91'}}>{this.props.user.role ===1 ? "管理员":"超级管理员"}管理</Text>:null}
                    {this.props.user && this.props.user.role !== 0?
                    <View style={{borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', borderTopColor: '#E6E6E6', borderTopWidth: Sip, backgroundColor: '#FFF'}}>
                        <Touch onPress={()=>{
                            let menu = ['违规用户', '正常用户'];
                            if(this.props.user && this.props.user.role ===2){
                                menu = ['违规用户', '正常用户', "管理员"];
                            }
                            this.props.MeAction.set_menu(menu);
                            this.props.RouterAction.PUSH("RoleCheckList");
                        }}>
                            <View style={{backgroundColor: '#FFF',marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50}}>
                                    <Text style={{fontSize: 16}}>人员审核</Text>
                                <Image source={require('./../images/icon_back.png')}
                                       style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                            </View>
                        </Touch>
                        <Touch onPress={()=>{this.props.RouterAction.PUSH("PostCheckList");}}>
                            <View style={{backgroundColor: '#FFF', marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50}}>
                                    <Text style={{fontSize: 16}}>启事审核</Text>
                                <Image source={require('./../images/icon_back.png')}
                                       style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                            </View>
                        </Touch>
                    </View>:null}
                </ScrollView>
            </View>
        );
    }
}
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { PUSH } from './../actions/RouterAction';
import { sync, set_menu } from './../actions/MeAction';

const mapStateToProps = (state) => {
    return {
        user: state.me.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({PUSH}, dispatch),
        MeAction: bindActionCreators({sync, set_menu}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Me);
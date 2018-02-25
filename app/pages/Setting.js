




import React, {Component} from 'react';
import {View, Button, TextInput, Image, Alert} from 'react-native';
import { DefaultBar, Text, Touch, SafeView } from './../components';

class Setting extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
        this._leadToLogin = this._leadToLogin.bind(this);
    }

    componentDidMount() {

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
            <SafeView>
            <View style={{flex:1, backgroundColor: '#f0eff5'}}>
                <DefaultBar title={'设置'}
                    // rightTitle={'rightTitle'}
                    // rightFun={()=>{console.log('123')}}
                    // navBgColor={'red'}
                />
                <View style={{borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', borderTopColor: '#E6E6E6', borderTopWidth: Sip, backgroundColor: '#FFF', marginTop: 5}}>
                    <Touch onPress={()=>{
                        this._leadToLogin("InfoSetting");
                    }}>
                        <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16}}>个人设置</Text>
                            <Image source={require('./../images/icon_back.png')}
                                   style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                        </View>
                    </Touch>

                    {/*

                     <Touch onPress={()=>{
                     this._leadToLogin("Forget");
                     }}>
                     <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                     <Text style={{fontSize: 16}}>修改密码</Text>
                     <Image source={require('./../images/icon_back.png')}
                     style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                     </View>
                     </Touch>

                    */}

                    <Touch onPress={()=>{
                        this.props.GlobalAction.set_intro(true);
                        this.props.RouterAction.PUSH("AppIntro");
                    }}>
                        <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16}}>引导页</Text>
                            <Image source={require('./../images/icon_back.png')}
                                   style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                        </View>
                    </Touch>

                    {/*

                     <Touch onPress={()=>{
                     this.props.RouterAction.PUSH("AboutUS");
                     }}>
                     <View style={{height: 50, marginLeft: 20, borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                     <Text style={{fontSize: 16}}>关于我们</Text>
                     <Image source={require('./../images/icon_back.png')}
                     style={{height: 20, width: 20, transform: [{rotate:'180deg'}], marginRight: 10}}/>
                     </View>
                     </Touch>

                    */}

                        <View style={{height: 50, marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16}}>当前版本</Text>
                            <Text style={{fontSize: 15, marginRight: 20, color: '#bcbbc0'}}>V1.0.0</Text>
                        </View>
                </View>
                {this.props.user ? <View style={{borderBottomWidth: Sip, borderBottomColor: '#E6E6E6', borderTopColor: '#E6E6E6', borderTopWidth: Sip, backgroundColor: '#FFF', marginTop: 20}}>
                    <Touch onPress={()=>{
                        this.props.MeAction.logout();
                    }}>
                        <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, color: '#ff463c'}}>退出登录</Text>
                        </View>
                    </Touch>
                </View>:null}

                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Touch onPress={()=>{

                    }}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{marginBottom: 15,fontSize: 15, color: '#4ca5ff'}}>用户协议</Text>
                        </View>
                    </Touch>
                    <Text style={{marginBottom: 10, color: '#a5a4a9'}}>All Rights Reserved By ferryvip.com</Text>
                </View>

            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { logout } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';
import { set_intro } from './../actions/GlobalAction';


const mapStateToProps = (state) => {
    return {
        user: state.me.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        MeAction: bindActionCreators({logout}, dispatch),
        RouterAction: bindActionCreators({PUSH}, dispatch),
        GlobalAction: bindActionCreators({set_intro}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
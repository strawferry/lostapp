




import React, {Component} from 'react';
import { View, Button, TextInput, ScrollView} from 'react-native';
import {Text, DefaultBar, Touch, SafeView } from './../components';

class Login extends Component {
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
                <DefaultBar title={'登录'}/>
                <ScrollView keyboardDismissMode={__IOS__ ? 'on-drag' : "none"} keyboardShouldPersistTaps='never'>
                <View style={{ alignItems: 'center', width:  SWidth}}>

                    <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: '#a0a0a0', flexDirection: 'row', marginTop: 20}}>
                        <Text style={{fontSize: 16, marginHorizontal: 5}}>邮箱</Text>
                        <View style={{height: 30, width: Sip, backgroundColor: '#a0a0a0'}}/>
                        <TextInput placeholder={"请输入邮箱"}
                                   autoCorrect={false}
                                   autoCapitalize="none"
                                   autoFocus={true}
                                   value={this.props.mail}
                                   underlineColorAndroid="transparent"
                                   keyboardType="email-address"
                                   clearButtonMode="while-editing"
                                   style={{height: 40, width: 0.85 * SWidth-50, marginLeft: 5}}
                                   onChangeText={(e) => {
                                       this.props.MeAction.set_mail(e);
                        }} />
                    </View>

                    <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: '#a0a0a0', flexDirection: 'row', marginTop: 20}}>
                        <Text style={{fontSize: 16, marginHorizontal: 5}}>密码</Text>
                        <View style={{height: 30, width: Sip, backgroundColor: '#a0a0a0'}}/>
                        <TextInput placeholder={"请输入密码"}
                                   autoCorrect={false}
                                   autoCapitalize="none"
                                   value={this.props.password}
                                   secureTextEntry={true}
                                   underlineColorAndroid="transparent"
                                   clearButtonMode="while-editing"
                                   style={{height: 40, width: 0.8 * SWidth -10, marginLeft: 5}}
                                   onChangeText={(e) => {
                                       this.props.MeAction.set_password(e);
                        }} />
                    </View>

                    <Touch onPress={()=>{
                        this.props.MeAction.login(this.props.mail, this.props.password);
                    }}>
                    <View style={{height: 40, width: 0.7* SWidth, justifyContent: 'center', alignItems: 'center', borderWidth: Sip, borderColor: '#4F5F6E', borderRadius: 5, marginTop: 20}}>
                            <Text style={{fontSize: 18}}>登录</Text>
                        </View>
                    </Touch>

                    <View style={{marginTop: 30, width: SWidth, alignItems: 'flex-end'}}>
                        <Touch onPress={()=>{
                            this.props.RouterAction.PUSH('Register');
                        }}>
                            <View style={{height: 40, justifyContent: 'center', marginRight: 30 }}>
                                <Text style={{fontSize: 15, textDecorationLine: 'underline'}}>立即注册</Text>
                            </View>
                        </Touch>
                        {/*<Touch onPress={()=>{*/}
                            {/*this.props.MeAction.login(this.state.email, this.state.password);*/}
                        {/*}}>*/}
                            {/*<View style={{height: 40, width: 0.7* SWidth, justifyContent: 'center', alignItems: 'center', borderWidth: Sip, borderColor: 'red', borderRadius: 5, marginTop: 20}}>*/}
                                {/*<Text style={{fontSize: 18}}>找回密码</Text>*/}
                            {/*</View>*/}
                        {/*</Touch>*/}
                    </View>

                </View>
                </ScrollView>
            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { login, set_mail, set_password } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';


const mapStateToProps = (state) => {
    return {
        mail: state.me.mail,
        password: state.me.password
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        MeAction: bindActionCreators({login, set_mail, set_password}, dispatch),
        RouterAction: bindActionCreators({PUSH}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
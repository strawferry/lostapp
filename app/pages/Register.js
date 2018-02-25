




import React, {Component} from 'react';
import { View, Button, TextInput, ScrollView} from 'react-native';
import {Text, DefaultBar, Touch, SafeView } from './../components';

class Register extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            email: "",
            password: ''
        };
        this.callback = this.callback.bind(this);
      }

    componentDidMount() {

    }
    callback = ()=>{
        this.props.navigation.navigate('Home')
    };


    render() {
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={'注册'}/>
                <ScrollView keyboardDismissMode={__IOS__ ? 'on-drag' : "none"} keyboardShouldPersistTaps='never'>
                    <View style={{ alignItems: 'center', width:  SWidth}}>

                        <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: '#a0a0a0', flexDirection: 'row', marginTop: 20}}>
                            <Text style={{fontSize: 16, marginHorizontal: 5}}>邮箱</Text>
                            <View style={{height: 30, width: Sip, backgroundColor: '#a0a0a0'}}/>
                            <TextInput placeholder={"请输入邮箱"}
                                       autoCorrect={false}
                                       autoFocus={true}
                                       autoCapitalize="none"
                                       value={this.state.email}
                                       underlineColorAndroid="transparent"
                                       keyboardType="email-address"
                                       clearButtonMode="while-editing"
                                       style={{height: 40, width: 0.85 * SWidth-50, marginLeft: 5}}
                                       onChangeText={(e) => {
                                           this.setState({email: e});
                                       }} />
                        </View>

                        <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: '#a0a0a0', flexDirection: 'row', marginTop: 20}}>
                            <Text style={{fontSize: 16, marginHorizontal: 5}}>密码</Text>
                            <View style={{height: 30, width: Sip, backgroundColor: '#a0a0a0'}}/>
                            <TextInput placeholder={"请输入密码"}
                                       autoCorrect={false}
                                       autoCapitalize="none"
                                       value={this.state.password}
                                       secureTextEntry={true}
                                       underlineColorAndroid="transparent"
                                       clearButtonMode="while-editing"
                                       style={{height: 40, width: 0.8 * SWidth -10, marginLeft: 5}}
                                       onChangeText={(e) => {
                                           this.setState({password: e})
                                       }} />
                        </View>

                        <Touch onPress={()=>{
                            this.props.MeAction.register(this.state.email, this.state.password);
                        }}>
                            <View style={{height: 40, width: 0.7* SWidth, justifyContent: 'center', alignItems: 'center', borderWidth: Sip, borderColor: '#4F5F6E', borderRadius: 5, marginTop: 20}}>
                                <Text style={{fontSize: 18}}>注册</Text>
                            </View>
                        </Touch>

                        <View style={{marginTop: 30, width: SWidth, alignItems: 'flex-end'}}>
                            <Touch onPress={()=>{
                                this.props.RouterAction.POP();
                            }}>
                                <View style={{height: 40, justifyContent: 'center', marginRight: 30 }}>
                                    <Text style={{fontSize: 15, textDecorationLine: 'underline'}}>立即登录</Text>
                                </View>
                            </Touch>
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
import { register } from './../actions/MeAction';
import { PUSH, POP } from './../actions/RouterAction';


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        MeAction: bindActionCreators({register}, dispatch),
        RouterAction: bindActionCreators({PUSH, POP}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
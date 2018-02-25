




import React, {Component} from 'react';
import {View, TextInput, ScrollView, Image} from 'react-native';
import { DefaultBar, Text, Touch, SafeView } from './../components';

import ImagePicker from 'react-native-image-crop-picker';
class InfoSetting extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatar: props.user.avatar,
            // avatar: 'https://dn-coding-net-production-static.qbox.me/82b7ce57-96ef-4faf-a480-bb0645ab2a1a.jpg',
            userName: props.user.userName,
            tel: props.user.tel,
        };
    }

    componentDidMount() {

    }
    componentWillUnmount(){
    }
    render() {
        return (
            <SafeView>
            <View style={{flex:1, backgroundColor: '#EFEFF6'}}>
                <DefaultBar title={'个人信息设置'}/>
                <ScrollView keyboardDismissMode={__IOS__ ? 'on-drag' : "none"}
                            keyboardShouldPersistTaps='never' >
                <View style={{height: 150, width: SWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0eff5'}}>
                    <Touch onPress={()=>{
                        ImagePicker.openPicker({
                            width: 1000,
                            height: 1000,
                            cropping: true
                        }).then(image => {
                            console.log(image.path);
                            this.setState({avatar: image.path});

                        }).catch((err)=>{
                            console.log(err);
                        });
                    }}>
                        <View style={{height: 102, width: 102, borderRadius: 51, borderColor: '#878E91', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}>
                        <Image style={{height: 100, width: 100, borderRadius: 50}} source={{uri: this.state.avatar}}/>
                        </View>
                    </Touch>
                </View>
                <View style={{width: SWidth, alignItems: 'center'}}>
                    <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: 'red', flexDirection: 'row', marginTop: 20}}>
                        <Text style={{fontSize: 16, marginHorizontal: 5}}>用户昵称</Text>
                        <View style={{height: 30, width: Sip, backgroundColor: 'red'}}/>
                        <TextInput placeholder={"请输入用户昵称"}
                                   autoCorrect={false}
                                   maxLength={15}
                                   value={this.state.userName}
                                   underlineColorAndroid="transparent"
                                   keyboardType="email-address"
                                   clearButtonMode="while-editing"
                                   style={{height: 40, width: 0.85 * SWidth-80, marginLeft: 5}}
                                   onChangeText={(e) => {
                                       this.setState({userName: e});
                                   }} />
                    </View>
                </View>
                <View style={{width: SWidth, alignItems: 'center'}}>
                <View style={{height: 40, width: 0.85 * SWidth, alignItems: 'center', borderBottomWidth: Sip, borderBottomColor: 'red', flexDirection: 'row', marginTop: 20}}>
                    <Text style={{fontSize: 16, marginHorizontal: 5}}>手        机</Text>
                    <View style={{height: 30, width: Sip, backgroundColor: 'red'}}/>
                    <TextInput placeholder={"请输入手机"}
                               autoCorrect={false}
                               value={this.state.tel}
                               underlineColorAndroid="transparent"
                               keyboardType="email-address"
                               clearButtonMode="while-editing"
                               maxLength={11}
                               style={{height: 40, width: 0.85 * SWidth-80, marginLeft: 5}}
                               onChangeText={(e) => {
                                   this.setState({tel: e});
                               }} />
                </View>
                    <Touch onPress={()=>{
                        console.log('----Touch onPress----');
                        this.props.MeAction.setinfo(this.state.userName, this.props.user.avatar, this.state.avatar, this.state.tel, this.props.user.token);
                        this.props.RouterAction.POP();
                    }}>
                        <View style={{height: 40, width: 0.7* SWidth, justifyContent: 'center', alignItems: 'center', borderWidth: Sip, borderColor: 'red', borderRadius: 5, marginTop: 40}}>
                            <Text style={{fontSize: 18}}>保存修改</Text>
                        </View>
                    </Touch>
                </View>

                </ScrollView>
            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { setinfo } from './../actions/MeAction';
import { POP } from './../actions/RouterAction';

import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
    return {
        user: state.me.user,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        MeAction: bindActionCreators({setinfo}, dispatch),
        RouterAction: bindActionCreators({POP}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoSetting);
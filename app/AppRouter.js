

/*
* router 路由设置
* */


import React, {Component} from 'react';
import {
    View,
    Image,
    PushNotificationIOS,
    Platform,
    StatusBar,
    BackHandler,
    ToastAndroid,
    AsyncStorage,
    NativeAppEventEmitter,

} from 'react-native';

import { AppIntro } from './pages';

import { Text } from './components';

import SplashScreen from 'react-native-smart-splash-screen';

import JPushModule from 'jpush-react-native';
const receiveCustomMsgEvent = "receivePushMsg";
const receiveNotificationEvent = "receiveNotification";
const getRegistrationIdEvent = "getRegistrationId";

import { AppNavigator }from './AppNavigator';

import { addNavigationHelpers } from 'react-navigation';

class AppRouter extends Component {
    ReceiveNotification;
    OpenNotification;

    constructor(props) {
        super(props);

        this.state = {
            showIntro: false
        };
        this._OpenNotification = this._OpenNotification.bind(this);
        this._ReceiveNotification = this._ReceiveNotification.bind(this);


    }

    componentWillMount() {

        __ANDROID__ &&  JPushModule.initPush();

        console.log('--componentWillMount-AsyncStorage-getItem-start------');
        AsyncStorage.getItem( 'user' ).then(
            (result)=>{
                if(result){
                    console.log('---AsyncStorage-getItem-user-result------');
                    let user = JSON.parse(result);
                    console.log(user);
                    this.props.MeAction.set_user(user);
                }
            }).catch((error)=>{console.log('error')});
    }
    // example
    componentDidMount() {

        if ( Platform.OS === 'ios' ) {
            /** iOS 极光 **/
            this.ReceiveNotification = NativeAppEventEmitter.addListener(
                'ReceiveNotification',
                (notification) => {
                    // console.log('------ReceiveNotification------');
                    this._ReceiveNotification(notification);
                }
            );
            this.OpenNotification = NativeAppEventEmitter.addListener(
                'OpenNotification',
                (notification) => {
                    // console.log('------OpenNotification------');
                    this._OpenNotification(notification);
                }
            );
            PushNotificationIOS.addEventListener('register', (e)=>{console.log(e)});
            /** iOS 极光 **/
        } else {
            /** 安卓 极光 **/


            JPushModule.notifyJSDidLoad((cb)=>{console.log(cb)});



            JPushModule.addReceiveCustomMsgListener((message) => {
                console.log(message);
                this.setState({pushMsg: message});
            });
            JPushModule.addReceiveNotificationListener((message) => {
                console.log("receive notification: " + message);
            });
            /** 安卓 极光 **/
        }

        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });

        this.subs = BackHandler.addEventListener('hardwareBackPress', () =>{
            if(this.props.nav.routes.length >1){
                this.props.RouterAction.POP();
                return true;
            }else{
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', 50);
                return true;
            }
            return false;
        });
    }

    _OpenNotification = (notification) => {
        console.log('-------_OpenNotification--------');
        console.log(notification);
    };
    _ReceiveNotification = (notification) => {
        console.log('-------_ReceiveNotification--------');
        console.log(notification);
    };

    componentWillUnmount() {

        if ( Platform.OS === 'ios' ){
            /** iOS 极光 **/
            this.ReceiveNotification.remove();
            this.OpenNotification.remove();
            PushNotificationIOS.removeEventListener('register', (e)=>{console.log(e)});
            /** iOS 极光 **/
        }else {
            /** 安卓 极光 **/
            JPushModule.removeReceiveCustomMsgListener();
            JPushModule.removeReceiveNotificationListener();
            /** 安卓 极光 **/
            this.subs && this.subs.remove();
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS !== 'ios' ?
                    <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="dark-content"/> : null}
                {this.state.showIntro ? <AppIntro onDone={()=>{
                    this.setState({showIntro: false});
                }}/>: <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch , state: this.props.nav })}/>  }

                {this.props.loading ? <View style={{position: 'absolute', height: SHeight , width: SWidth, backgroundColor: 'rgba(255, 255, 255, 0.4)', alignItems: 'center', justifyContent: 'center'}} >
                    <Image style={{height: 100, width: 100}} source={require('./images/loding.gif')} />
                </View>:null}

            </View>
        );
    }
}



import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { POP } from './actions/RouterAction';
import { set_user } from './actions/MeAction';

const mapStateToProps = state => ({
    nav: state.nav,
    loading: state.global.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({POP}, dispatch),
        MeAction: bindActionCreators({set_user}, dispatch),
        dispatch: dispatch
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);
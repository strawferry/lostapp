
import React from 'react';
import { StyleSheet, AsyncStorage, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import config from './../configs/config';
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('./../images/tabs/home.png'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('./../images/tabs/home.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('./../images/tabs/home.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

class AppIntro extends React.Component {
    componentWillMount() {
        if(!this.props.isAppIntro){
            AsyncStorage.getItem( 'newVersion' ).then(
                (result)=>{
                    if(result){
                        if(config.newVersion == result){
                            this.props.RouterAction.Reset("Tab");
                        }
                    }
                    console.log('----newVersion--result------');
                    // console.log(result);
                }).catch((error)=>{console.log('--newVersion--读取失败')});
        }
    }
    _onDone = () => {
        if(this.props.isAppIntro){
            this.props.RouterAction.POP();
        }else{
            AsyncStorage.setItem( 'newVersion', String(config.newVersion) ).then(
                (ok)=>{
                    this.props.RouterAction.Reset("Tab");
                }
            ).catch(
                (error)=>{console.log('--newVersion--存储失败')}
            );
        }
    };
    render() {
        return (
            <View style={{flex: 1}}>
            <AppIntroSlider
                slides={slides}
                onDone={this._onDone}
            />
            </View>
        );
    }
}

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {  Reset, POP } from './../actions/RouterAction';


const mapStateToProps = (state) => {
    return {
        isAppIntro: state.global.isAppIntro
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({Reset, POP}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppIntro);

//
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {  Reset, POP } from './../actions/RouterAction';
//
//
// const mapStateToProps = (state) => {
//     return {
//         isAppIntro: state.global.isAppIntro
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         RouterAction: bindActionCreators({Reset, POP}, dispatch),
//     }
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AppIntro);



// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     AsyncStorage,
//     StatusBar
// } from 'react-native';
// import AppIntroC from 'react-native-app-intro';
//
// import config from './../configs/config';
//
// const styles = StyleSheet.create({
//     slide: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#9DD6EB',
//         padding: 15,
//     },
//     text: {
//         color: '#fff',
//         fontSize: 30,
//         fontWeight: 'bold',
//     },
// });
//
//
// class AppIntro extends Component {
//     // 构造
//       constructor(props) {
//         super(props);
//         // 初始状态
//         this.state = {};
//           this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
//           this.doneBtnHandle = this.doneBtnHandle.bind(this);
//           this.nextBtnHandle = this.nextBtnHandle.bind(this);
//           this.onSlideChangeHandle = this.onSlideChangeHandle.bind(this);
//       }
//
//     componentWillMount() {
//         if(!this.props.isAppIntro){
//             AsyncStorage.getItem( 'newVersion' ).then(
//                 (result)=>{
//                     if(result){
//                         if(config.newVersion == result){
//                             this.props.RouterAction.Reset("Tab");
//                         }
//                     }
//                     console.log('----newVersion--result------');
//                     // console.log(result);
//                 }).catch((error)=>{console.log('--newVersion--读取失败')});
//         }
//     }
//
//     onSkipBtnHandle = (index) => {
//         if(this.props.isAppIntro){
//             this.props.RouterAction.POP();
//         }else{
//             AsyncStorage.setItem( 'newVersion', String(config.newVersion) ).then(
//                 (ok)=>{
//                     this.props.RouterAction.Reset("Tab");
//                 }
//             ).catch(
//                 (error)=>{console.log('--newVersion--存储失败')}
//             );
//         }
//     };
//     doneBtnHandle = () => {
//         if(this.props.isAppIntro){
//             this.props.RouterAction.POP();
//         }else{
//             AsyncStorage.setItem( 'newVersion', String(config.newVersion) ).then(
//                 (ok)=>{
//                     this.props.RouterAction.Reset("Tab");
//                 }
//             ).catch(
//                 (error)=>{console.log('--newVersion--存储失败')}
//             );
//         }
//     };
//     nextBtnHandle = (index) => {
//         // console.log(index);
//     };
//     onSlideChangeHandle = (index, total) => {
//         // console.log(index, total);
//     };
//     render() {
//         return (
//             <View>
//                 <StatusBar hidden={true}/>
//             <AppIntroC
//                 onNextBtnClick={this.nextBtnHandle}
//                 onDoneBtnClick={this.doneBtnHandle}
//                 onSkipBtnClick={this.onSkipBtnHandle}
//                 onSlideChange={this.onSlideChangeHandle}
//             >
//                 <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
//                     <View level={10}><Text style={styles.text}>Page 1</Text></View>
//                     <View level={15}><Text style={styles.text}>Page 1</Text></View>
//                     <View level={8}><Text style={styles.text}>Page 1</Text></View>
//                 </View>
//                 <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
//                     <View level={-10}><Text style={styles.text}>Page 2</Text></View>
//                     <View level={5}><Text style={styles.text}>Page 2</Text></View>
//                     <View level={20}><Text style={styles.text}>Page 2</Text></View>
//                 </View>
//                 <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
//                     <View level={8}><Text style={styles.text}>Page 3</Text></View>
//                     <View level={0}><Text style={styles.text}>Page 3</Text></View>
//                     <View level={-10}><Text style={styles.text}>Page 3</Text></View>
//                 </View>
//                 <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
//                     <View level={5}><Text style={styles.text}>Page 4</Text></View>
//                     <View level={10}><Text style={styles.text}>Page 4</Text></View>
//                     <View level={15}><Text style={styles.text}>Page 4</Text></View>
//                 </View>
//             </AppIntroC>
//             </View>
//         );
//     }
// }
//
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {  Reset, POP } from './../actions/RouterAction';
//
//
// const mapStateToProps = (state) => {
//     return {
//         isAppIntro: state.global.isAppIntro
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         RouterAction: bindActionCreators({Reset, POP}, dispatch),
//     }
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AppIntro);




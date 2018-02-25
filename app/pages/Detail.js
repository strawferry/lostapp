




import React, {Component} from 'react';
import {Image, View, ScrollView, Alert, Modal, CameraRoll} from 'react-native';
import { DefaultBar, Text, Touch, SafeView } from './../components';

import Swiper from 'react-native-swiper';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = [ '取消', '收藏启事', '取消收藏', '修改启事状态', '审核启事' ];
const title = '';
import Share from 'react-native-share';
import PhotoView from 'react-native-photo-view';


class Detail extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            scIcon: require('./../images/sc-o.png'),
            isSC: false,
            modalVisible: false,
            imageSource: null,
        };
        this.handlePress = this.handlePress.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this._handleSC = this._handleSC.bind(this);
        this._leadToLogin = this._leadToLogin.bind(this);
    }

    componentDidMount() {
        this._handleSC();
        this.props.PostAction.getDetail(this.props.id, true, ()=>{this._handleSC()});
    }
    showActionSheet = ()=>{
        this.ActionSheet.show()
    };

    handlePress = (i)=> {
        this.setState({
            selected: i
        });
        console.log(i);
    };
    _leadToLogin = (type)=>{
        if(this.props.user){
            if(type === "sc"){
                if(this.state.isSC){
                    this.props.MeAction.delCollection(this.props.data._id, this.props.user.token, ()=>{
                        this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                    });
                }else{
                    this.props.MeAction.addCollection(this.props.data._id, this.props.user.token, ()=>{
                        this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                    });
                }
            }else if(type === "zt"){
                let title, subit;
                if (this.props.data.lostStatus === 0){ title = "是否结束该条启事!"; subit="结束启事";}else{title = "是否重新开启该条启事!"; subit="开启启事";}
                Alert.alert(
                    '提醒',
                    title,
                    [
                        {text: '取消', onPress: () => {
                        }, style: 'cancel'},
                        {text: subit, onPress: () => {
                            // this.props.RouterAction.PUSH("Login");
                            if(this.props.data.lostStatus === 0){
                                this.props.PostAction.setLostStatus(this.props.id, 1, this.props.user.token, ()=>{
                                    this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                                });
                            }else{
                                this.props.PostAction.setLostStatus(this.props.id, 0, this.props.user.token, ()=>{
                                    this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                                });
                            }
                        }},
                    ],
                    { cancelable: false }
                )
            }else if(type === "sh"){
                this.SHActionSheet.show();
            }
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
    _handleSC = ()=>{
        let sc_o = require('./../images/sc-o.png');
        let sc = require('./../images/sc.png');
        if (this.props.data.beCollection && this.props.data.beCollection.length >0 ){
            let bc = this.props.data.beCollection;
            if (this.props.user){
                if (bc.indexOf(this.props.user._id) > -1){
                    this.setState({scIcon: sc, isSC: true});
                }else{
                    this.setState({scIcon: sc_o, isSC: false});
                }
            }
        }else{
            this.setState({scIcon: sc_o, isSC: false});
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
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={`${this.props.data.type === 0 ? "失物":"招领"}详情`}
                            // rightFun={()=>{this.showActionSheet();}}
                           // rightIcon={require('./../images/more.png')}
                    />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {console.log("Modal has been closed.")}}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(10, 10, 10, 0.9)'}}>
                        <PhotoView
                            source={{uri: this.state.imageSource}} //`data:image/jpeg;base64,${cccc}`}}
                            minimumZoomScale={1}
                            maximumZoomScale={4}
                            resizeMode="contain"
                            androidScaleType="center"
                            onLoadStart={()=>{this.setState({showBtn: false})}}
                            onLoadEnd={()=>{
                                //this.setState({showBtn: true})
                            }}
                            onTap={()=>{this.setState({modalVisible: false})}}
                            style={{width: SWidth, height: SHeight, flex: 1}} />
                        {this.state.showBtn ? <Touch onPress={()=>{
                            let b =  CameraRoll.saveToCameraRoll(this.state.imageSource, 'photo');
                            b.then((e)=>{
                                console.log(e);
                                alert("保存成功!");
                            }).catch((c)=>{
                                alert('保存失败!');
                            })
                        }
                        }
                                                     style={{position: 'absolute', bottom: 20, right: 20, borderColor: 'white' ,borderWidth: 1, borderRadius: 5}}>
                            <Text allowFontScaling={false} style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>保存</Text>
                        </Touch>:null}
                    </View>
                </Modal>
                <ScrollView>
                    <Swiper height={180}
                            loop={true}
                            autoplay={true}
                            horizontal={true}
                            bounces={true}
                            dot={<View style={{backgroundColor:'#a4a4a4', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -15,}} />}
                            activeDot={<View style={{backgroundColor:'#FFFFFF', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -15,}} />}
                    >
                        {this.props.data.images.map((item, index)=>{
                            return <Touch key={index} activeOpacity={0.85} onPress={()=>{
                                this.setState({imageSource: item, modalVisible: true})
                            }}>
                                <View style={{height: 180}}>
                                <Image source={{uri: item}} style={{height: 180, width: SWidth}}/>
                                </View>
                            </Touch>
                        })}
                    </Swiper>
                    <View style={{backgroundColor: '#EFEFF6', height: 5}}/>
                    <View style={{height: 60, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#a4a4a4', borderBottomWidth: Sip, borderTopColor: '#a4a4a4', borderTopWidth: Sip}}>
                        <Touch onPress={()=>{
                            this.props.MeAction.set_person(this.props.data.user);
                            this.props.RouterAction.PUSH('PersonInfo');
                        }}>
                            <Image style={{height: 50, width: 50, borderRadius: 25, marginLeft: 10}} source={{uri: this.props.data.user.avatar}}/>
                        </Touch>
                        <Touch onPress={()=>{
                            this.props.MeAction.set_person(this.props.data.user);
                            this.props.RouterAction.PUSH('PersonInfo');
                        }}>
                            <View style={{marginLeft: 10}}>
                            <Text >{this.props.data.user.userName}</Text>
                            <Text style={{marginTop: 10}}>{moment(this.props.data.user.createTime).format("YYYY-MM-DD HH:mm")}</Text>
                        </View>
                        </Touch>
                        <Touch onPress={()=>{
                            Share.open(shareOptions).catch((err) => { err && console.log(err); });
                        }} style={{position: 'absolute', right:50, top: 10}}>
                            <View style={[{height: 40, width: 40,borderRadius: 20, backgroundColor: '#1ab20a',alignItems: 'center',justifyContent: 'center', }, __ANDROID__ ? {position: 'absolute', right:50, top: 10}:null]}>
                                <Image style={{height: 25, width: 25}}
                                       source={require('./../images/share.png')}/>
                            </View>
                        </Touch>

                        {/*

                         <Touch style={{position: 'absolute', right:5, top: 10}}>
                         <View style={[{height: 40, width: 40,borderRadius: 20, backgroundColor: '#1ab20a',alignItems: 'center',justifyContent: 'center', }, __ANDROID__ ? {position: 'absolute', right:5, top: 10}: null]}>
                         <Image style={{height: 25, width: 25}}
                         source={require('./../images/mail.png')}/>
                         </View>
                         </Touch>
                         
                        */}

                    </View>
                    <View style={{backgroundColor: '#EFEFF6', height: 5}}/>
                    <View style={{backgroundColor: '#fff'}}>

                        <View style={{height: 25, flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{height: 20, width: 20, marginLeft: 10}} source={require('./../images/title.png')}/>
                            <Text style={{marginTop: 5, marginLeft: 5, fontSize: 13}}><Text style={{fontSize: 15}}>标题: </Text>{this.props.data.title}</Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{height: 20, width: 20, marginLeft: 10}} source={require('./../images/date.png')}/>
                            <Text style={{marginTop: 5, marginLeft: 5, fontSize: 13}}><Text style={{fontSize: 15}}>{this.props.data.type === 0?"丢失时间":"捡到时间"}: </Text>{moment(this.props.data.date).format("YYYY年 MM月 DD日 HH:mm")}</Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{height: 20, width: 20, marginLeft: 10}} source={require('./../images/location.png')}/>
                            <Text style={{marginTop: 5, marginLeft: 5, fontSize: 13}}><Text style={{fontSize: 15}}>{this.props.data.type === 0?"丢失地点":"捡到地点"}: </Text>{this.props.data.location}</Text>
                        </View>
                        <View style={{height: 25, flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{height: 20, width: 20, marginLeft: 10}} source={require('./../images/posttime.png')}/>
                            <Text style={{marginTop: 5, marginLeft: 5, fontSize: 13}}><Text style={{fontSize: 15}}>发布时间: </Text>{moment(this.props.data.postDate).format("YYYY年 MM月 DD日 HH:mm")}</Text>
                        </View>
                        <View style={{backgroundColor: '#EFEFF6', height: 5}}/>
                        <View style={{height: 40,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}><Image style={{height: 30, width: 30}} source={require('./../images/location.png')}/><Text style={{marginLeft: 10, fontSize: 16}}>描述</Text></View>
                            <View style={{flexDirection: 'row'}}>
                                {this.props.user && this.props.user.role> 0 ?
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{height: 20, width: 20}} source={require('./../images/check.png')}/>
                                        {this.props.data.status === 0 ? <Text style={{fontSize: 14, color: '#a4a4a4'}}>未审核</Text>: this.props.data.status === 1 ? <Text style={{fontSize: 14, color: '#1FB922'}}>审核通过</Text>:<Text style={{fontSize: 14, color: '#F26463'}}>审核不过</Text>}
                                        </View>:null}

                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}><Image style={{height: 35, width: 35}} source={require('./../images/loststatus.png')}/>{this.props.data.lostStatus === 0 ? <Text style={{fontSize: 16, color: '#1FB922'}}>进行中</Text>:<Text style={{fontSize: 16, color: '#F26463'}}>已结束</Text>}</View>
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                        <Text style={{width: SWidth - 20, fontSize: 15, lineHeight: 20}}>{this.props.data.desc}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', borderTopColor: '#a4a4a4', borderTopWidth: Sip}}>
                    <Touch onPress={()=>{this._leadToLogin('sc')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                            <Image style={{height: 20, width: 20}} source={this.state.scIcon}/>
                        <Text style={{marginLeft: 5}}>{this.state.isSC ? "取消收藏":"收藏"}</Text>
                        </View>
                    </Touch>
                    {this.props.user && this.props.data.user._id === this.props.user._id ? <Touch onPress={()=>{this._leadToLogin('zt')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                            <Image style={{height: 28, width: 28}} source={require('./../images/loststatus.png')}/>
                            <Text>状态</Text>
                        </View>
                    </Touch>: this.props.user && this.props.user.role > 0 ? <Touch onPress={()=>{this._leadToLogin('zt')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                            <Image style={{height: 28, width: 28}} source={require('./../images/loststatus.png')}/>
                            <Text>状态</Text>
                        </View>
                    </Touch>: null}

                    {this.props.user && this.props.user.role >0 ? <Touch onPress={()=>{this._leadToLogin('sh')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                            <Image style={{height: 20, width: 20}} source={require('./../images/check.png')}/>
                            <Text style={{marginLeft: 5}}>审核</Text>
                        </View>
                    </Touch>:null}

                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    // title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
                <ActionSheet
                    ref={o => this.SHActionSheet = o}
                    // title={title}
                    options={[ '取消', '审核通过', '审核不过']}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={(i)=> {
                        if(i === 1){
                            this.props.PostAction.setStatus(this.props.id, 1, this.props.user.token, ()=>{
                                this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                            });
                        }else if(i === 2){
                            this.props.PostAction.setStatus(this.props.id, 2, this.props.user.token, ()=>{
                                this.props.PostAction.getDetail(this.props.id, false, ()=>{this._handleSC()});
                            });
                        }
                    }}
                />
            </View>
            </SafeView>
        );
    }
}

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getDetail, setLostStatus, setStatus } from './../actions/PostAction';
import { addCollection, delCollection, set_person } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';


const mapStateToProps = (state) => {
    return {
        id: state.post.id,
        data: state.post.data,
        user: state.me.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        PostAction: bindActionCreators({getDetail, setLostStatus, setStatus}, dispatch),
        MeAction: bindActionCreators({addCollection, delCollection, set_person}, dispatch),
        RouterAction: bindActionCreators({PUSH}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
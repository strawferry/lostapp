




import React, {Component} from 'react';
import {View, Image, TextInput, ScrollView, Keyboard, Modal, CameraRoll} from 'react-native';
import { DefaultBar, Text, Touch, DatePicker, SafeView  } from './../components';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import PhotoView from 'react-native-photo-view';


class Tweet extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title: "",
            titleLength: 0,
            location: "",
            locationLength: 0,
            desc: "",
            descLength: 0,
            imageSource: null,
            modalVisible: false,
            date: moment().format('YYYY-MM-DD'),
            imgarr: [],
        };

        this.StringTrim = this.StringTrim.bind(this);
    }
    StringTrim = (e) => {
        return e.replace(/(^\s*)|(\s*$)/g, '');
    };
    componentDidMount() {

    }
    render() {
        const DateText = (<View style={{height: 44, marginLeft: 10,justifyContent: 'center'}}><Text style={{color: '#444444'}}>{moment(this.state.date).format('YYYY年MM月DD日') }</Text></View>)
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={`发布${this.props.lx === "sw" ? "失物":"招领"}启事`} />
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
                            maximumZoomScale={3}
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
                <ScrollView keyboardDismissMode={__IOS__ ? 'on-drag' : "none"}
                            keyboardShouldPersistTaps='never'
                            style={{paddingBottom: 60}}>
                    <View style={{
                        height: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: Sip
                    }}>
                        <Text style={{marginLeft: 15,}}>标题</Text>
                        <TextInput
                            autoCorrect={false}
                            blurOnSubmit={true}
                            enablesReturnKeyAutomatically={true}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            maxLength={30}
                            onChange={(event) => {
                                this.setState({
                                    title: event.nativeEvent.text,
                                    titleLength: event.nativeEvent.text.length
                                })
                            }}
                            placeholder="输入标题"
                            value={this.state.title}
                            clearButtonMode="while-editing"
                            placeholderTextColor="#bbbbbb"
                            onSubmitEditing={(event) => {
                                if (this.StringTrim(event.nativeEvent.text) != "") {
                                    this.setState({title: this.StringTrim(event.nativeEvent.text)})
                                }

                            }}
                            style={{
                                fontSize: 15,
                                marginLeft: 10,
                                marginTop: 2,
                                width: SWidth - 110,
                                color: '#444444'
                            }}/>
                        <Text
                            style={{fontSize: 16, color: '#a0a0a0'}}>{this.state.titleLength}/30</Text>
                    </View>
                    <View style={{
                        height: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: Sip
                    }}>
                        <Text style={{marginLeft: 15,}}>时间</Text>
                        <DatePicker
                            style={{width: 250}}
                            date={this.state.date}
                            mode="date"
                            format="YYYY-MM-DD"
                            actionComponent={DateText}
                            minDate={moment(moment().subtract(30, 'days')).format('YYYY-MM-DD')}
                            maxDate={moment().format('YYYY-MM-DD')}
                            confirmBtnText="确定"
                            cancelBtnText="取消"
                            customStyles={{

                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <Image source={require('./../images/icon_back.png')}
                               style={{position: 'absolute', right: 5, height: 15, width: 15, transform: [{rotate:'180deg'}]}}/>
                    </View>
                    <View style={{
                        height: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: Sip
                    }}>
                        <Text style={{marginLeft: 15,}}>地点</Text>
                        <TextInput
                            autoCorrect={false}
                            blurOnSubmit={true}
                            enablesReturnKeyAutomatically={true}
                            autoCapitalize="none"
                            maxLength={30}
                            onChange={(event) => {
                                this.setState({
                                    location: event.nativeEvent.text,
                                    locationLength: event.nativeEvent.text.length
                                })
                            }}
                            placeholder="输入地点"
                            value={this.state.location}
                            underlineColorAndroid="transparent"
                            clearButtonMode="while-editing"
                            placeholderTextColor="#bbbbbb"
                            onSubmitEditing={(event) => {
                                if (this.StringTrim(event.nativeEvent.text) != "") {
                                    this.setState({location: this.StringTrim(event.nativeEvent.text)})
                                }

                            }}
                            style={{
                                fontSize: 15,
                                marginLeft: 10,
                                marginTop: 2,
                                width: SWidth - 110,
                                color: '#444444'
                            }}/>
                        <Text
                            style={{fontSize: 16, color: '#a0a0a0'}}>{this.state.locationLength}/30</Text>

                    </View>
                    <Text style={{marginLeft: 15, marginTop: 10}}>详情描述</Text>
                    <TextInput
                        multiline={true}
                        maxLength={200}
                        style={{width: SWidth - 30, height: 150, marginLeft: 15, marginTop: 5, fontSize: 16, textAlignVertical: 'top'}}
                        onChange={(event) => {
                            this.setState({desc: event.nativeEvent.text, descLength: event.nativeEvent.text.length})
                        }}
                        clearButtonMode="while-editing"
                        value={this.state.desc}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#bbbbbb"
                        placeholder={this.props.lx === "sw" ? '具体文字描述一下,在什么时间什么地点,丢了什么东西,然后物品特征等!':'具体文字描述一下,什么时间什么地点捡到什么东西,规避暴露某些特征用于避免他人冒领!'}
                    />
                    <View style={{
                        height: 36,
                        alignItems: 'flex-end',
                        borderBottomColor: '#a0a0a0',
                        borderBottomWidth: Sip
                    }}>
                        <Text style={{
                            fontSize: 16,
                            marginLeft: 15,
                            marginTop: 10,
                            color: '#71798e',
                            marginRight: 15
                        }}>{this.state.descLength}/200</Text>
                    </View>
                    <View style={{
                        minHeight: (SWidth - 80) /3 + 30,
                        maxHeight: 2*(SWidth - 80) /3 + 45,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderBottomColor: config.color.sipColor,
                        borderBottomWidth: Sip,
                        flexWrap: 'wrap'
                    }}>
                        {this.state.imgarr.map((item, index, items)=>{
                            return(
                                <Touch key={`key-${index}`}
                                                  activeOpacity={0.85}
                                                  onPress={()=>{
                                                      this.setState({imageSource: `data:image/jpeg;base64,${item.data}`, modalVisible: true})
                                                  }}>
                                    <View style={{ marginLeft: 20, marginTop: 15, borderColor: "#8a8a8a", borderWidth: Sip, height: (SWidth - 80) /3, width: (SWidth - 80) /3, justifyContent: 'center',alignItems: 'center'}}>
                                    <Image style={{height: (SWidth - 80) /3 -10, width: (SWidth - 80) /3 -10}} source={{uri: item.path}} resizeMode="contain"/>
                                    <Touch activeOpacity={0.85}
                                                      onPress={()=>{
                                                          let temparr = this.state.imgarr;
                                                          temparr.splice(index,1);
                                                          this.setState({imgarr:temparr})}}
                                           style={{position: 'absolute', top: __IOS__ ? -18: -10, right:  __IOS__ ?-18:-10}}
                                    >
                                        <View style={[{ height: 40, width: 40, justifyContent: 'center',alignItems: 'center', backgroundColor: 'transparent'}, __ANDROID__ && {position: 'absolute', top: __IOS__ ? -18: -10, right:  __IOS__ ?-18:-10}]}>
                                        <Image source={require('./../images/delete.png')} style={{height: 25, width: 25}}/>
                                        </View>
                                    </Touch>
                                    </View>
                                </Touch>
                            )
                        })}
                        {this.state.imgarr.length !== 6 ?
                            <Touch onPress={()=>{
                                    this.ActionSheet.show();
                                }}
                                activeOpacity={0.85} >
                                <View style={{marginLeft: 20, marginTop: 15, borderColor: '#8a8a8a', borderWidth: Sip, height: (SWidth - 80) /3, width: (SWidth - 80) /3, justifyContent: 'center',alignItems: 'center'}}>
                                <Image source={require('./../images/add.png')} style={{height: 50, width: 50}}/>
                                </View>
                            </Touch>:null}
                    </View>
                    <View style={{width: SWidth, alignItems: 'center'}}>
                    <Touch onPress={()=>{
                        console.log('----发布启事 onPress----');
                        this.props.PostAction.tweet(this.state.title, this.state.date, this.state.location, this.state.desc, this.state.imgarr, this.props.lx === "sw" ? 0 : 1,this.props.user.token );
                        this.props.RouterAction.POP();
                    }}>
                        <View style={{height: 40, width: 0.7* SWidth, justifyContent: 'center', alignItems: 'center', borderWidth: Sip, borderColor: '#4F5F6E', borderRadius: 5, marginTop: 20, marginBottom: 20}}>
                            <Text style={{fontSize: 18, color: '#444444'}}>发布启事</Text>
                        </View>
                    </Touch>
                    </View>
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    // title={title}
                    options={["取消", "拍照", "图库选取"]}
                    cancelButtonIndex={0}
                    onPress={(i)=> {
                        if(i === 1){
                            ImagePicker.openCamera({
                                compressImageQuality: 0.5,
                                includeBase64: true
                            }).then(image => {
                                let temparr = this.state.imgarr;
                                temparr.push({path: image.path, data: image.data});
                                this.setState({imgarr:temparr});
                            });
                        }else if(i === 2){
                            ImagePicker.openPicker({
                                compressImageQuality: 0.5,
                                includeBase64: true
                            }).then(image => {
                                let temparr = this.state.imgarr;
                                temparr.push({path: image.path, data: image.data});
                                this.setState({imgarr:temparr});
                            });
                        }
                    }}
                />
            </View>
            </SafeView>
        );
    }
}


/*

 <DatePicker
 style={{width: 250}}
 date={'2000-01-01'}
 mode="date"
 format="YYYY-MM-DD"
 actionComponent={DateText}
 minDate="1990-01-01"
 maxDate="2020-01-01"
 confirmBtnText="确定"
 cancelBtnText="取消"
 customStyles={{

 }}
 onDateChange={(date) => {this.setState({date: date})}}
 />

 * */


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { tweet } from './../actions/PostAction';
import { POP } from './../actions/RouterAction';


const mapStateToProps = (state) => {
    return {
        lx: state.post.lx,
        user: state.me.user,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        PostAction: bindActionCreators({tweet}, dispatch),
        RouterAction: bindActionCreators({POP}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
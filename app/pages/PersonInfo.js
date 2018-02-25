

import React, {Component} from 'react';
import { View, Button, Image, Alert, FlatList} from 'react-native';

import { DefaultBar, NavBar, Text, Touch, SafeView } from './../components';
import moment from 'moment';
const arr = [
    "失物启事",
    "招领启事",
];

import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';

class PersonInfo extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type: 0,
            option: ["取消"]
        };
          this._renderItem = this._renderItem.bind(this);
          this._handleInit = this._handleInit.bind(this);
          this._handleNew = this._handleNew.bind(this);
          this._handleMore = this._handleMore.bind(this);

          this._handleMenu = this._handleMenu.bind(this);
          this._renderMenu = this._renderMenu.bind(this);
      }
    componentDidMount() {
          this.props.MeAction.getPerson(this.props.person._id);
          this.props.MeAction.getyhlist(false, this.props.person._id, this.state.type);
    }
    componentWillUnmount(){
        this.props.MeAction.clearYHData();
    }
    _renderItem = ({item, index})=>{
        return <Touch id={item._id} onPress={() => {
            console.log(index, item);
            this.props.PostAction.setDetailID(item._id);
            this.props.PostAction.setDetailData(item);
            this.props.RouterAction.PUSH("Detail");
        }}>
            <View style={[{height: 110, flexDirection: 'row', backgroundColor: '#FFFFFF', }, {marginTop: index === 0 ? 2:0}]}>
                <View style={{height: 110, width: 150, alignItems: 'center', justifyContent: 'center'}}><Image style={{height: 90, width: 130}} source={{uri: item.mainImage}}/></View>
                <View style={{height: 110, flex: 1}}>
                    <View style={{flexDirection: 'row', height: 18, marginTop: 10, alignItems: 'flex-end'}}>
                        <Text style={{width: SWidth - 240, fontSize: 17, fontWeight: 'bold', color: "#101010"}} numberOfLines={1}>{item.title}</Text>
                        <Text style={{width: 80, fontSize: 12, color: "#a4a4a4"}} numberOfLines={1}>{item.user.userName}</Text>
                    </View>
                    <Text style={{width: SWidth - 160, fontSize: 12, marginTop: 5, color: "#a4a4a4"}} numberOfLines={1}>地点: {item.location}</Text>
                    <Text style={{width: SWidth - 160, fontSize: 12, marginTop: 5, color: "#313233"}} numberOfLines={2}>物品描述: {item.desc}</Text>
                    <View style={{marginTop: 5}}>
                        <Text style={{width: 150, fontSize: 12, color: "#929292"}} numberOfLines={1}>{moment(item.date).format("YYYY-MM-DD HH:mm")}</Text>
                        <Text style={{width: 40, fontSize: 12, color: item.type ===0 ?"#1FB922": "#F26463", position: 'absolute', right: 50, textAlign: 'center'}} numberOfLines={1}>{item.type ===0 ?"寻物":"招领"}</Text>
                        <Text style={{width: 40, fontSize: 12, color: item.lostStatus ===0 ?"#1FB922": "#F26463", position: 'absolute', right: 10}} numberOfLines={1}>{item.lostStatus===0 ?"进行中":"已结束"}</Text>
                    </View>
                </View>

            </View>
        </Touch>
    };
    _handleInit = ()=>{
        const { MeAction } = this.props;
        MeAction.getyhlist(true, this.props.person._id, this.state.type);
    };
    _handleNew = ()=>{
        const { MeAction, data } = this.props;
            if(data.length>0){
                MeAction.getyhlist(false, this.props.person._id, this.state.type, data[0].postID , "new");
            }else{
                MeAction.getyhlist(false, this.props.person._id, this.state.type, null, "no data");
            }
    };
    _handleMore = ()=>{
        const { MeAction, data } = this.props;
        if(data.length>0){
            MeAction.getyhlist(false, this.props.person._id, this.state.type, data[data.length-1].postID, "more");
        }else{
            MeAction.getyhlist(false, this.props.person._id, this.state.type, null, "no data");
        }
    };

    _handleMenu = (index) => {
        console.log(index);
        this.setState({type: index});
        console.log(this.state.type);
    };
    _renderMenu = (item, index) => {
        return <Touch
            key={index}
            disabled={this.state.type === index}
            onPress={()=>{
                this.setState({type: index}, ()=>{
                    this._flat.scrollToOffset({x: 0, y: 0, animated: true});
                    this.time = setTimeout(()=>{
                        this._handleInit();
                    }, 100);
                });
            }}>
            <View style={{flex: 1, width: SWidth/2,height: 44,alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.type === index ?'#E9EAEB':'#FFFFFF'}}>
                <Text>{item}</Text>
            </View>
        </Touch>
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
            <View style={{flex:1, backgroundColor: '#EFEFF6'}}>
                <DefaultBar title={'详细信息'}  rightFun={()=>{
                    if(this.props.user){
                        if(this.props.user.role === 1){
                            this.setState({option: ["取消", "分享用户", `${this.props.person.status === 0? "解除": "开启"}用户限制`]}, ()=>{this.SHActionSheet.show();});
                        }else if(this.props.user.role === 2){
                            if(this.props.person.role === 2){
                                this.setState({option: ["取消", "分享用户", `${this.props.person.status === 0? "解除": "开启"}用户限制`]}, ()=>{this.SHActionSheet.show();});
                            }else{
                                this.setState({option: ["取消", "分享用户", `${this.props.person.status === 0? "解除": "开启"}用户限制`, `${this.props.person.role === 0 ? "设为": "解除"}管理员`]}, ()=>{this.SHActionSheet.show();});
                            }
                           }
                    }else{
                        Share.open(shareOptions).catch((err) => { err && console.log(err); });
                    }

                }}
                            rightIcon={require('./../images/more.png')}
                />
                <View style={{height: 88, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: Sip}}>
                    <Image style={{height: 66, width: 66, borderRadius: 33, marginLeft: 10}} source={{uri: this.props.person.avatar}}/>
                    <View style={{marginLeft: 10}}>
                        <Text >用户名:{this.props.person.userName}</Text>
                        {this.props.user && this.props.user.role > 0 ? <Text style={{marginTop: 5}}>邮箱:{this.props.person.email}</Text>:null}
                        <Text style={{marginTop: 5}}>创建时间:{moment(this.props.person.createTime).format("YYYY-MM-DD HH:mm")}</Text>
                    </View>
                </View>
                <View style={{height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: Sip}}>
                    {arr.map(this._renderMenu)}
                </View>
                <FlatList
                    ref={(flat) => { this._flat = flat; }}
                    ItemSeparatorComponent={()=>{return <View style={{height: 4}}/>}}
                    ListHeaderComponent={()=>{return this.props.newLoading ? <View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop'/>}}
                    ListFooterComponent={()=>{return this.props.moreLoading ?<View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop' style={{height: 44, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#8c8c8c'}}>----这是条底线!----</Text></View>}}
                    data={this.props.data}
                    initialNumToRender={4}
                    keyExtractor={(item, index)=>{ return index}}
                    onEndReached={this._handleMore}
                    onEndReachedThreshold={0.2}
                    onRefresh={this._handleNew}
                    refreshing={false}
                    renderItem={this._renderItem}
                    style={{backgroundColor: '#f0eff5'}}
                />
                <ActionSheet
                    ref={o => this.SHActionSheet = o}
                    // title={title}
                    options={this.state.option}
                    cancelButtonIndex={0}
                    onPress={(i)=> {
                        const { MeAction } = this.props;
                        if(i === 1){
                            Share.open(shareOptions).catch((err) => { err && console.log(err); });
                        }else if (i === 2){

                            if(this.props.person.status === 0){
                                // 解除限制 1
                                MeAction.setstatus(this.props.person._id, 1, null, this.props.user.token, ()=>{
                                    this.props.MeAction.getPerson(this.props.person._id);
                                });
                            }else{
                                // 限制 0
                                MeAction.setstatus(this.props.person._id, 0, null, this.props.user.token, ()=>{
                                    this.props.MeAction.getPerson(this.props.person._id);
                                });
                            }
                        }else if (i === 3){
                            if(this.props.person.role === 0){
                                // 设为管理员 1
                                MeAction.setstatus(this.props.person._id, null, 1, this.props.user.token, ()=>{
                                    this.props.MeAction.getPerson(this.props.person._id);
                                });
                            }else{
                                //解除管理员 0
                                MeAction.setstatus(this.props.person._id, null, 0, this.props.user.token, ()=>{
                                    this.props.MeAction.getPerson(this.props.person._id);
                                });
                            }
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
import { PUSH } from './../actions/RouterAction';
import { getPerson, getyhlist, setstatus, clearYHData } from './../actions/MeAction';
import { setDetailID, setDetailData } from './../actions/PostAction';

const mapStateToProps = (state) => {
    return {
        person: state.me.person,
        user: state.me.user,
        data: state.me.yhdata,
        newLoading: state.me.newLoading,
        moreLoading: state.me.moreLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({PUSH}, dispatch),
        MeAction: bindActionCreators({getPerson, getyhlist, setstatus, clearYHData}, dispatch),
        PostAction: bindActionCreators({setDetailID, setDetailData}, dispatch),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo);
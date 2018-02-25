

import React, {Component} from 'react';
import {View, FlatList, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const arr = [
    "全部",
    "寻物",
    "招领",
    "进行中",
    "已结束",
    ];

import { DefaultBar, NavBar, Text, Touch } from './../components';

import moment from 'moment';

class Home extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type: 0,   // all xw zl jxz yjs
        };
        this._renderItem = this._renderItem.bind(this);
        this._handleInit = this._handleInit.bind(this);
        this._handleNew = this._handleNew.bind(this);
        this._handleMore = this._handleMore.bind(this);
        this._handleMenu = this._handleMenu.bind(this);
        this._renderMenu = this._renderMenu.bind(this);
      }

    static navigationOptions = {
        tabBarLabel: '主页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={focused ? require('./../images/tabs/home.png'): require('./../images/tabs/home_o.png')}
                style={{width: 30, height: 30}}
            />
        ),
    };


    componentDidMount() {
        if(this.props.user){
            this.props.MeAction.sync(this.props.user.token);
        }
        console.log("------home-----");
        this.props.HomeAction.getAll();

    }

    componentWillUnmount(){
        this.time && clearTimeout(this.time);
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
        const { HomeAction } = this.props;
        if (this.state.type === 0){
            HomeAction.getAll(true);
        }else if (this.state.type === 1){
            HomeAction.getType(true, 0, null, "no data");

        }else if (this.state.type === 2){
            HomeAction.getType(true, 1, null, "no data");
        }else if (this.state.type === 3){
            HomeAction.getLostStatus(true, 0, null, "no data");
        }else if (this.state.type === 4){
            HomeAction.getLostStatus(true, 1, null, "no data");
        }
    };
    _handleNew = ()=>{
        const { HomeAction, data } = this.props;
        if (this.state.type === 0){
            if(data.length>0){
                HomeAction.getAll(false, data[0]._id , "new");
            }else{
                HomeAction.getAll(false, null, "no data");
            }
        }else if (this.state.type === 1){
            if(data.length>0){
                HomeAction.getType(false, 0, data[0]._id , "new");
            }else{
                HomeAction.getType(false, 0, null, "no data");
            }
        }else if (this.state.type === 2){
            if(data.length>0){
                HomeAction.getType(false, 1, data[0]._id , "new");
            }else{
                HomeAction.getType(false, 1, null, "no data");
            }
        }else if (this.state.type === 3){
            if(data.length>0){
                HomeAction.getLostStatus(false, 0, data[0]._id , "new");
            }else{
                HomeAction.getLostStatus(false, 0, null, "no data");
            }
        }else if (this.state.type === 4){
            if(data.length>0){
                HomeAction.getLostStatus(false, 1, data[0]._id , "new");
            }else{
                HomeAction.getLostStatus(false, 1, null, "no data");
            }
        }

    };
    _handleMore = ()=>{
        const { HomeAction, data } = this.props;
        if (this.state.type === 0){
            if(data.length>0){
                HomeAction.getAll(false, data[data.length-1]._id , "more");
            }else{
                HomeAction.getAll(false, null, "no data");
            }
        }else if (this.state.type === 1){
            if(data.length>0){
                HomeAction.getType(false, 0, data[data.length-1]._id , "more");
            }else{
                HomeAction.getType(false, 0, null, "no data");
            }
        }else if (this.state.type === 2){
            if(data.length>0){
                HomeAction.getType(false, 1, data[data.length-1]._id , "more");
            }else{
                HomeAction.getType(false, 1, null, "no data");
            }
        }else if (this.state.type === 3){
            if(data.length>0){
                HomeAction.getLostStatus(false, 0, data[data.length-1]._id , "more");
            }else{
                HomeAction.getLostStatus(false, 0, null, "no data");
            }
        }else if (this.state.type === 4){
            if(data.length>0){
                HomeAction.getLostStatus(false, 1, data[data.length-1]._id , "more");
            }else{
                HomeAction.getLostStatus(false, 1, null, "no data");
            }
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
            <View style={{flex: 1, width: SWidth/5,height: 44,alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.type === index ?'#E9EAEB':'#FFFFFF'}}>
                <Text>{item}</Text>
            </View>
        </Touch>
    };
    render() {
        const {finish} = this.props;
        return (
            <View style={{flex:1}}>
                <NavBar title={'首页'} />
                <View style={{height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: Sip}}>
                    {arr.map(this._renderMenu)}
                    </View>
                <FlatList
                    ref={(flat) => { this._flat = flat; }}
                    ItemSeparatorComponent={()=>{return <View style={{height: 4}}/>}}
                    ListHeaderComponent={()=>{return this.props.newLoading ? <View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop'/>}}
                    ListFooterComponent={()=>{return this.props.moreLoading ?<View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop' style={{height: 44, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#8c8c8c'}}>----这是条底线!----</Text></View>}}
                    // ListEmptyComponent={()=>{return <Text>目前没有数据</Text>}} // 45 版本才能用 哭瞎
                    data={this.props.data}
                    initialNumToRender={4}
                    keyExtractor={(item, index)=>{ return index}}
                    onEndReached={!finish && this._handleMore}
                    onEndReachedThreshold={0.2}
                    onRefresh={this._handleNew}
                    refreshing={false}
                    renderItem={this._renderItem}
                    style={{backgroundColor: '#EFEFF6'}}
                />
            </View>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { PUSH } from './../actions/RouterAction';
import { getAll, getType, getLostStatus } from './../actions/HomeAction';
import { setDetailID, setDetailData } from './../actions/PostAction';
import { sync, addCollection, delCollection, myxwlist, myzllist, mycollection } from './../actions/MeAction';


const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        data: state.home.data,
        user: state.me.user,
        newLoading: state.home.newLoading,
        moreLoading: state.home.moreLoading,
        finish: state.home.finish,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // GlobalAction: bindActionCreators({home_start, home_stop}, dispatch),
        RouterAction: bindActionCreators({PUSH}, dispatch),
        HomeAction: bindActionCreators({getAll, getType, getLostStatus }, dispatch),
        MeAction: bindActionCreators({sync, addCollection, delCollection, myxwlist, myzllist, mycollection}, dispatch),
        PostAction: bindActionCreators({setDetailID, setDetailData}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);



{/*

 <ScrollView>
 <Text style={{fontSize: 30, color: 'red'}}>This is Home.</Text>
 <Button title="nav" onPress={()=>{
 console.log(this.props.nav);
 }} />

 {/*
 <Button title="addCollection" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 this.props.MeAction.addCollection('595b49c5c4237618b548b47e', token);
 }} />


 <Button title="delCollection" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 this.props.MeAction.delCollection('595b49c5c4237618b548b47e', token);
 }} />


 <Button title="myxwlist" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 this.props.MeAction.myxwlist(null, null, null, token, null);
 }} />

 <Button title="myzllist" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 this.props.MeAction.myzllist(null, null, null, token, null);
 }} />

 <Button title="mycollection" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 this.props.MeAction.mycollection(null, null, token, null);
 }} />


 <Button title="postDetail" onPress={()=>{
 this.props.PostAction.getDetail('595b49c5c4237618b548b47e');
 }} />
 <Button title="postadd" onPress={()=>{
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTViNjAwNzM2ZmM5MzFiNmMyNGMxMzEiLCJlbWFpbCI6IjExMSIsImlhdCI6MTQ5OTMxMjk3MywiZXhwIjoxNDk5MzEyOTc0fQ.Af1x_BkNlP-bH4sf6kt5ocK21Vc93gJzkvF3_hl5urY';
 let body = {
 title: "文章标题",
 desc : "文章描述一下,文章描述一下,文章描述一下,文章描述一下,",
 type : 0,
 location : "丢失地点",
 date : "2017-07-07",
 images : [
 'https://unsplash.it/800/600?random',
 'https://unsplash.it/800/600?random',
 'https://unsplash.it/800/600?random'
 ]
 };
 this.props.PostAction.postAdd(token, body);
 }} />



 <Button title="getAll" onPress={()=>{
 this.props.HomeAction.getAll();
 }} />
 <Button title="getAll-limit" onPress={()=>{
 this.props.HomeAction.getAll(null, null, 3);
 }} />
 <Button title="getAllByID-more" onPress={()=>{
 this.props.HomeAction.getAll(10, "more");
 }} />
 <Button title="getAllByID-new" onPress={()=>{

 this.props.HomeAction.getAll(10, "new");
 }} />
 <Button title="getAllByID-new-limit" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getAll(10, "more", 3);
 }} />



 <Button title="getType-0" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(0);
 }} />
 <Button title="getType-1" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(1);
 }} />
 <Button title="getType-0-id-more" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(0, 30, "more");
 }} />
 <Button title="getType-0-id-new" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(1, 30, "new");
 }} />
 <Button title="getType-0-id-more-limit" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(0, 30, "new", 1);
 }} />
 <Button title="getType-0-limit" onPress={()=>{
 // 获取更多
 this.props.HomeAction.getType(1, null, null, 1);
 }} />




 <Button title="上传图片" onPress={()=>{
 ImagePicker.openPicker({
 width: 1000,
 height: 1000,
 cropping: true
 }).then(image => {
 console.log(image);

 let formData = new FormData();
 let file = {uri: image.path,type:'multipart/form-data',name:'image.png'};
 formData.append('files',file);
 fetch('http://172.25.235.28:5566/v1/post/uploadFile',{
 method:'POST',
 headers:{
 'Content-Type':'multipart/form-data',
 },
 body:formData,
 })
 .then((response)=>response.text())
 .then((responseData)=>{
 console.log('responseData',responseData);
 })
 .catch((error)=>{console.log('error',error)});

 }).catch((error)=>{console.log('error',error)});
 }}/>

 {arr.map((item, index)=>{
 return <Button key={index} title={item} onPress={()=>{
 this.props.RouterAction.PUSH(item);
 }}/>
 })}
 </ScrollView>
 */}
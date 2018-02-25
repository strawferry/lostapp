




import React, {Component} from 'react';
import { View, FlatList, Image} from 'react-native';
import { DefaultBar , Text, Touch, SafeView } from './../components';
import moment from 'moment';

const arr = [
    "全部",
    "进行中",
    "已结束",
];


class MySWList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type: 0,     // all jxz yjs
        };
        this._renderItem = this._renderItem.bind(this);
        this._handleInit = this._handleInit.bind(this);
        this._handleNew = this._handleNew.bind(this);
        this._handleMore = this._handleMore.bind(this);

        this._handleMenu = this._handleMenu.bind(this);
        this._renderMenu = this._renderMenu.bind(this);
    }

    componentDidMount() {
        this.props.MeAction.myxwlist(null, null, null, null, this.props.user.token);
    }
    componentWillUnmount(){
        this.time && clearTimeout(this.time);
        this.props.MeAction.clearData();
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
        if (this.state.type === 0){
            MeAction.myxwlist(true, null, null, null, this.props.user.token);
        }else if (this.state.type === 1){
            console.log('---------------1-------');
            MeAction.myxwlist(true, 0, null, null, this.props.user.token);
        }else if (this.state.type === 2){
            MeAction.myxwlist(true, 1, null, null, this.props.user.token);
        }
    };
    _handleNew = ()=>{
        const { MeAction, data } = this.props;
        if (this.state.type === 0){
            if(data.length>0){
                MeAction.myxwlist(false, null, data[0]._id , "new", this.props.user.token);
            }else{
                MeAction.myxwlist(false, null, null, "no data", this.props.user.token);
            }
        }else if (this.state.type === 1){
            if(data.length>0){
                MeAction.myxwlist(false, 0, data[0]._id , "new", this.props.user.token);
            }else{
                MeAction.myxwlist(false, 0, null, "no data", this.props.user.token);
            }
        }else if (this.state.type === 2){
            if(data.length>0){
                MeAction.myxwlist(false, 1, data[0]._id , "new", this.props.user.token);
            }else{
                MeAction.myxwlist(false, 1, null, "no data", this.props.user.token);
            }
        }
    };
    _handleMore = ()=>{
        const { MeAction, data } = this.props;
        if (this.state.type === 0){
            if(data.length>0){
                MeAction.myxwlist(false, null, data[data.length-1]._id, "more", this.props.user.token);
            }else{
                MeAction.myxwlist(false, null, null, "no data", this.props.user.token);
            }
        }else if (this.state.type === 1){
            if(data.length>0){
                MeAction.myxwlist(false, 0, data[data.length-1]._id, "more", this.props.user.token);
            }else{
                MeAction.myxwlist(false, 0, null, "no data");
            }
        }else if (this.state.type === 2){
            if(data.length>0){
                MeAction.myxwlist(false, 1, data[data.length-1]._id, "more", this.props.user.token);
            }else{
                MeAction.myxwlist(false, 1, null, "no data", this.props.user.token);
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
            <View style={{flex: 1, width: SWidth/3,height: 44,alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.type === index ?'#E9EAEB':'#FFFFFF'}}>
                <Text>{item}</Text>
            </View>
        </Touch>
    };

    render() {
        const {finish} = this.props;
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={'我的失物启事'} />
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
                    onEndReached={!finish && this._handleMore}
                    onEndReachedThreshold={0.2}
                    onRefresh={this._handleNew}
                    refreshing={false}
                    renderItem={this._renderItem}
                    style={{backgroundColor: '#f0eff5'}}
                />
            </View>
            </SafeView>
        );
    }
}


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { myxwlist, clearData } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';
import { setDetailID, setDetailData } from './../actions/PostAction';

const mapStateToProps = (state) => {
    return {
        data: state.me.xwdata,
        user: state.me.user,
        newLoading: state.me.newLoading,
        moreLoading: state.me.moreLoading,
        finish: state.me.finish,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({PUSH}, dispatch),
        MeAction: bindActionCreators({ myxwlist, clearData}, dispatch),
        PostAction: bindActionCreators({setDetailID, setDetailData}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MySWList);
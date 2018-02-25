




import React, {Component} from 'react';
import { View, FlatList, Image} from 'react-native';
import { DefaultBar , Text, Touch, SafeView } from './../components';
import moment from 'moment';


class MyCollectionList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type: 0,     // all jxz yjs
        };
        this._renderItem = this._renderItem.bind(this);
        this._handleNew = this._handleNew.bind(this);
        this._handleMore = this._handleMore.bind(this);
    }

    componentDidMount() {
        this.props.MeAction.mycollection( null, null, this.props.user.token);

    }
    componentWillUnmount(){
        this.props.MeAction.clearData();
    }
    _renderItem = ({item, index})=>{
        let temp = item.post;
        return <Touch id={temp._id} onPress={() => {
            console.log(index, item);
            this.props.PostAction.setDetailID(temp._id);
            this.props.PostAction.setDetailData(temp);

            this.props.RouterAction.PUSH("Detail");
        }}>
            <View style={[{height: 110, flexDirection: 'row', backgroundColor: '#FFFFFF', }, {marginTop: index === 0 ? 2:0}]}>
                <View style={{height: 110, width: 150, alignItems: 'center', justifyContent: 'center'}}><Image style={{height: 90, width: 130}} source={{uri: temp.mainImage}}/></View>
                <View style={{height: 110, flex: 1}}>
                    <View style={{flexDirection: 'row', height: 18, marginTop: 10, alignItems: 'flex-end'}}>
                        <Text style={{width: SWidth - 240, fontSize: 17, fontWeight: 'bold', color: "#101010"}} numberOfLines={1}>{temp.title}</Text>
                        <Text style={{width: 80, fontSize: 12, color: "#a4a4a4"}} numberOfLines={1}>{temp.user.userName}</Text>
                    </View>
                    <Text style={{width: SWidth - 160, fontSize: 12, marginTop: 5, color: "#a4a4a4"}} numberOfLines={1}>地点: {temp.location}</Text>
                    <Text style={{width: SWidth - 160, fontSize: 12, marginTop: 5, color: "#313233"}} numberOfLines={2}>物品描述: {temp.desc}</Text>
                    <View style={{marginTop: 5}}>
                        <Text style={{width: 150, fontSize: 12, color: "#929292"}} numberOfLines={1}>{moment(temp.date).format("YYYY-MM-DD HH:mm")}</Text>
                        <Text style={{width: 40, fontSize: 12, color: temp.type ===0 ?"#1FB922": "#F26463", position: 'absolute', right: 50, textAlign: 'center'}} numberOfLines={1}>{temp.type ===0 ?"寻物":"招领"}</Text>
                        <Text style={{width: 40, fontSize: 12, color: temp.lostStatus ===0 ?"#1FB922": "#F26463", position: 'absolute', right: 10}} numberOfLines={1}>{temp.lostStatus===0 ?"进行中":"已结束"}</Text>
                    </View>
                </View>

            </View>
        </Touch>
    };

    _handleNew = ()=>{
        const { MeAction, data } = this.props;

        if(data.length>0){
            MeAction.mycollection(data[0]._id , "new", this.props.user.token);
        }else{
            MeAction.mycollection(null, "no data", this.props.user.token);
        }

    };
    _handleMore = ()=>{
        const { MeAction, data } = this.props;

        if(data.length>0){
            MeAction.mycollection(data[data.length-1]._id , "more", this.props.user.token);
        }else{
            MeAction.mycollection(null, "no data", this.props.user.token);
        }
    };


    render() {
        const {finish} = this.props;
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={'我的收藏'} />
                <FlatList
                    ItemSeparatorComponent={()=>{return <View style={{height: 4}}/>}}
                    ListHeaderComponent={()=>{return this.props.newLoading ? <View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop'/>}}
                    ListFooterComponent={()=>{return this.props.moreLoading ?<View key='start' style={{height: 40, justifyContent: 'center', alignItems: 'center'}}><Image style={{height: 20, width: 100}} source={require('./../images/loadmore.gif')} /></View>:<View key='stop' style={{height: 44, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#8c8c8c'}}>----这是条底线!----</Text></View>}}
                    data={this.props.data}
                    initialNumToRender={4}
                    keyExtractor={(item, index)=>{ return index}}
                    onEndReached={!finish && this._handleMore}
                    onEndReachedThreshold={0.1}
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
import { mycollection, clearData } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';
import { setDetailID, setDetailData } from './../actions/PostAction';

const mapStateToProps = (state) => {
    return {
        data: state.me.scdata,
        user: state.me.user,
        newLoading: state.me.newLoading,
        moreLoading: state.me.moreLoading,
        finish: state.me.finish,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({PUSH}, dispatch),
        MeAction: bindActionCreators({ mycollection, clearData}, dispatch),
        PostAction: bindActionCreators({setDetailID, setDetailData}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCollectionList);
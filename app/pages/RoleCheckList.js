



import React, {Component} from 'react';
import { View, FlatList, Image} from 'react-native';
import { DefaultBar, Text, Touch, SafeView } from './../components';
import moment from 'moment';

class RoleCheckList extends Component {
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
        this.props.MeAction.rolecheck(false, null, null, this.state.type, null, this.props.user.token);
    }
    componentWillUnmount(){
        this.time && clearTimeout(this.time);
        this.props.MeAction.clearData();
    }
    _renderItem = ({item, index})=>{
        return <Touch onPress={()=>{
            this.props.MeAction.set_person(item);
            this.props.RouterAction.PUSH('PersonInfo');
        }}>
            <View style={{height: 88, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center'}}>
                <Image style={{height: 66, width: 66, borderRadius: 33, marginLeft: 10}} source={{uri: item.avatar}}/>
                <View style={{marginLeft: 10}}>
                    <Text >用户名:{item.userName}</Text>
                    <Text style={{marginTop: 5}}>邮箱:{item.email}</Text>
                    <Text style={{marginTop: 5}}>创建时间:{moment(item.createTime).format("YYYY-MM-DD HH:mm")}</Text>
                </View>

            </View>
        </Touch>
    };
    _handleInit = ()=>{
        const { MeAction } = this.props;
        if(this.state.type === 2){
            MeAction.rolecheck(true, null, null, 1, 1, this.props.user.token);
        }else{
            MeAction.rolecheck(true, null, null, this.state.type, null, this.props.user.token);
        }
    };
    _handleNew = ()=>{
        const { MeAction, data } = this.props;
        if(this.state.type === 2){
            if(data.length>0){
                MeAction.rolecheck(false, data[0]._id , "new", 1, 1, this.props.user.token);
            }else{
                MeAction.rolecheck(false, null, "no data", 1, 1, this.props.user.token);
            }
        }else{
            if(data.length>0){
                MeAction.rolecheck(false, data[0]._id , "new", this.state.type, null, this.props.user.token);
            }else{
                MeAction.rolecheck(false, null, "no data", this.state.type, null, this.props.user.token);
            }
        }

    };
    _handleMore = ()=>{
        const { MeAction, data } = this.props;
        if(this.state.type === 2){
            if(data.length>0){
                MeAction.rolecheck(false, data[data.length-1]._id , "more", 1, 1, this.props.user.token);
            }else{
                MeAction.rolecheck(false, null, "no data", 1, 1, this.props.user.token);
            }
        }else{
            if(data.length>0){
                MeAction.rolecheck(false, data[data.length-1]._id , "more", this.state.type, null, this.props.user.token);
            }else{
                MeAction.rolecheck(false, null, "no data", this.state.type, null, this.props.user.token);
            }
        }
    };
    _handleMenu = (index) => {
        console.log(index);
        this.setState({type: index});
        console.log(this.state.type);
    };
    _renderMenu = (item, index, items) => {
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
            <View style={{flex: 1, width: SWidth/items.length,height: 44,alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.type === index ?'#E9EAEB':'#FFFFFF'}}>
                <Text>{item}</Text>
            </View>
        </Touch>
    };
    render() {
        const {finish} = this.props;
        return (
            <SafeView>
            <View style={{flex:1}}>
                <DefaultBar title={'人员审核'}/>
                <View style={{height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: Sip}}>
                    {this.props.menu.map(this._renderMenu)}
                </View>
                <FlatList
                    ref={(flat) => { this._flat = flat; }}
                    ItemSeparatorComponent={()=>{return <View style={{height: Sip}}/>}}
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
import { rolecheck, clearData, set_person } from './../actions/MeAction';
import { PUSH } from './../actions/RouterAction';
import { setDetailID, setDetailData } from './../actions/PostAction';


const mapStateToProps = (state) => {
    return {
        data: state.me.rydata,
        menu: state.me.menu,
        user: state.me.user,
        newLoading: state.me.newLoading,
        moreLoading: state.me.moreLoading,
        finish: state.me.finish,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        RouterAction: bindActionCreators({PUSH}, dispatch),
        MeAction: bindActionCreators({ rolecheck, clearData, set_person}, dispatch),
        PostAction: bindActionCreators({setDetailID, setDetailData}, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleCheckList);


/*
 *
 * AppNavigator 路由设置
 * */

import { addNavigationHelpers, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import {
    AboutUS,
    AppIntro,
    AppWeb,
    PostCheckList,
    RoleCheckList,
    Detail,
    Forget,
    Home,
    InfoSetting,
    Login,
    Me,
    MyCollectionList,
    MySWList,
    MyZLList,
    Post,
    Register,
    Tweet,
    Setting,
    PersonInfo,
} from './pages';

export const Tab = TabNavigator({
    Home: { screen: Home },
    Post: { screen: Post },
    Me: { screen: Me },
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    initialRouteName: "Home",
    tabBarOptions: {
        activeTintColor: '#2c2c2c',
        inactiveTintColor: '#8a8a8a',
        labelStyle: {
            fontSize: 13,
        },
        style: {
            backgroundColor: '#FFFFFF',
        }
    },
    cardStyle: {
        backgroundColor: "#FFFFFF"
    }
});

export const AppNavigator = StackNavigator({
    AppIntro: { screen: AppIntro},
    Tab: { screen: Tab},
    AboutUS: { screen: AboutUS},
    AppWeb: { screen: AppWeb},
    PostCheckList: { screen: PostCheckList},
    RoleCheckList: { screen: RoleCheckList},
    Detail: { screen: Detail},
    Forget: { screen: Forget},
    InfoSetting: { screen: InfoSetting},
    Login: { screen: Login},
    MyCollectionList: { screen: MyCollectionList},
    MySWList: { screen: MySWList},
    MyZLList: { screen: MyZLList},
    Register: { screen: Register},
    Tweet: { screen: Tweet},
    Setting: { screen: Setting},
    PersonInfo: { screen: PersonInfo},
},{
    headerMode: "none",
    mode: 'card',
    cardStyle: {
        backgroundColor: "#FFFFFF"
    }
});



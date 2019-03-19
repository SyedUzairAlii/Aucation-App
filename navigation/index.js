import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Login from '../src/screens/login/authentication'
import Home from '../src/screens/dashboard/dashboard'
import Drawer from '../drawer/drawerComponent'
import Aucationeer from '../src/screens/auctioneerDetails/Aucationeer'
import Live from '../src/screens/itemLive/ItemDetails'
import Chat from '../src/screens/chat/inbox'
import Inbox from '../src/screens/inbox/inbox'
import Profile from '../src/screens/profile/profile'
import ProfilePost from '../src/screens/profilePost/ProfilePost'
import BidAdv from '../src/screens/bidAdvance/BidAdvance'
const StackNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    },
    Aucationeer:{
        screen:Aucationeer
    },
    Live:{
        screen:Live
    },Chat:{
        screen:Chat
    },Inbox:{
        screen:Inbox
    },Profile:{
        screen:Profile
    },ProfilePost:{
        screen:ProfilePost
    },BidAdv:{
        screen:BidAdv
    }

},{
    navigationOptions:{
        drawerLockMode:'locked-closed'
    }

}
);

const DrawerNavigation = createDrawerNavigator(
    {
        Initial: {
            screen: StackNavigator
        },
    },
    {
        drawerWidth: 300,
        initialRouteName: 'Initial',
        contentComponent: Drawer
    }
)





const Navigation = createAppContainer(DrawerNavigation)
export default Navigation;
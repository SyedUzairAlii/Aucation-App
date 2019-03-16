import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Login from '../src/screens/login/authentication'
import Home from '../src/screens/dashboard/dashboard'
import Drawer from '../drawer/index'
import Aucationeer from '../src/screens/auctioneerDetails/Aucationeer'
const StackNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    },
    Aucationeer:{
        screen:Aucationeer
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
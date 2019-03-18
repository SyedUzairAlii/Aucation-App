import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native';
import BackIcon from '../assets/back.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logout } from '../src/store/actions/authAction'
import { StackActions, NavigationActions } from 'react-navigation';
import HomeIcon from '../assets/home-icon.png'
// import Icon from '../../assets/person-dummy.jpg'
import IconFont from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'
import ServiceIcon from '../assets/services.png'
import { Log_Out } from '../src/store/actions/authAction'

class DrawerContent extends Component {
    constructor() {
        super()

        this.state = {
            data: null
        }
    }

    closeDrawer() {
        this.props.navigation.closeDrawer()

    }

    componentDidMount() {
        console.log('componentDid Mount')
        if (this.props.me) {
            this.setState({ data: this.props.me })
        }
    }

    componentWillReceiveProps(props) {
        if (props.me) {
            this.setState({ data: props.me })
        }
    }

    addServices() {
        this.props.navigation.navigate('Aucationeer')
    }

    Home() {
        this.props.navigation.navigate('Home')
    }

    Logout() {
        this.props.logout()

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    notification() {
        this.props.navigation.navigate('notification')

    }

    MyProfile() {
        this.props.navigation.navigate('Profile')
    }

    messages() {
        this.props.navigation.navigate('Inbox')
    }

    contact() {
        this.props.navigation.navigate('Contact')
    }

    render() {
        const { data } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => this.closeDrawer()}>
                        <Image
                            style={styles.ImageIcon}
                            source={BackIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.avtr}
                            source={data ? { uri: data && data.photo } : Icon}
                        />
                    </View>
                    <View style={styles.name}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: '500' }}>
                            {
                                data &&
                                data.name
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.drawerRoutes}>
                    <TouchableOpacity onPress={() => this.Home()}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Image
                                    style={styles.drawerIcons}
                                    source={HomeIcon}
                                />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Home
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addServices()}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Image
                                    style={styles.drawerIcons}
                                    source={ServiceIcon}
                                />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Set Auction
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.MyProfile()}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Icon
                                    size={25}
                                    style={styles.drawerIcons}
                                    name={'settings'}
                                />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Profile
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                   
                    <View style={{ borderWidth: 1, borderColor: 'lightgrey' }}>

                    </View>
                    
                    <TouchableOpacity onPress={() => this.messages()}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Icon
                                    size={25}
                                    style={styles.drawerIcons}
                                    name={'chat'}
                                />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Messages
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.Logout()}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Icon
                                    size={25}
                                    style={styles.drawerIcons}
                                    name={'lock'}
                                />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Logout
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerIcons: {
        width: 30,
        height: 30,
    },
    avatar: {
        paddingTop: 5,
        width: '100%',
        backgroundColor: '#2089dc',
    },
    avtr: {
        // borderWidth: 1,
        width: 100,
        height: 100,
        marginLeft: 20,
        borderRadius: 50
    },
    RouteName: {
        flexDirection: 'row',
        // borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    drawerRoutes: {
        // flex: 1,
        width: '100%',
        paddingVertical: 10
        // borderWidth: 2,
    },
    name: {
        paddingVertical: 15,
        paddingHorizontal: 17,
        // borderWidth: 2,
        width: '100%',
        backgroundColor: '#2089dc',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ImageIcon: {
        width: 25,
        height: 40,
        marginRight: 20
    },
    backIcon: {
        width: '100%',
        // height: 40,
        backgroundColor: '#2089dc',
        alignItems: 'flex-end',
    }
});

function mapStateToProps(state) {
    return ({
        me: state.authReducers.USER,
       
        // resolved: state.authReducer.RESOLVED,
        // userData: state.authReducer.USERDATA,
        // notify: state.authReducer.NOTIFY
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        logout: () => {
            dispatch(Log_Out())
        },
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
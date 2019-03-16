import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import firebase from '../../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Header, } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts } from 'expo';
import { LinearGradient } from 'expo';
import { User_Messages } from '../../store/actions/authAction'
import { Updte } from '../../store/actions/authAction'
import geolib from 'geolib'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    Drawer = () => {
        this.props.navigation.openDrawer();
    }
    _onRefresh = () => {
        const { me } = this.props;
        if (me) {
            setTimeout(() => {
                console.log("me", me)
                this.props.update(me.UID)
            }, 10)
        }
        this.setState({ refreshing: false });
    }

    static navigationOptions = { header: null }

    render() {
        const { allUser, loading, services, match } = this.state
        return (
            <View>
                <ScrollView styel={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >

                    <View >

                        <Header

                            containerStyle={{
                                backgroundColor: '#075e54',
                                justifyContent: 'space-around',

                            }}
                            leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.Drawer() }}
                            centerComponent={{ text: "Auction Point", style: { color: '#fff', fontSize: 20 } }}
                            rightComponent={{ icon: 'search', color: '#fff', onPress: () => this.seacrh() }}
                        />
                        <View >

                        </View>


                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 160,
        width: 165,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    statusBar: {
        backgroundColor: "#075e54",
        height: Constants.statusBarHeight,
    },
    cardTitle: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c59'
    },
    titleName: {
        paddingTop: 6,
        paddingBottom: 3,
        fontSize: 14,
        fontWeight: '600',

    }

});

function mapStateToProp(state) {
    return ({
        me: state.authReducers.USER,
        allUser: state.authReducers.ALLUSER
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        user: (userCurrent) => {
            dispatch(User_Messages(userCurrent))
        },
        update: (uid) => {
            dispatch(Updte(uid))
        }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);


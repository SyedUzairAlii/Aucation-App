import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, Button } from 'react-native';
import firebase from '../../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Header, } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts } from 'expo';
import { LinearGradient } from 'expo';
import { User_Messages } from '../../store/actions/authAction'
import { Updte } from '../../store/actions/authAction'
import geolib from 'geolib'
import moment from 'moment'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentDidMount(){
        const { me, allUser, allPost, currentPosts } = this.props
        console.log(currentPosts ,';my post did')
        setTimeout(() => {
            this.setState({
                me,
            })
    var liveBid = [];
    var upcoming = [];
    var SoldItem = []
    // console.log(allPost ,';all post will')
    if (currentPosts) {
        currentPosts.map(item => {
            if (moment(item.data.StartTime) <= moment(Date.now())
                &&
                moment(item.data.EndTime) >= moment(Date.now())) {
                // console.log(item,'item live know')
                liveBid.push(item)

            }
            else if (moment(item.data.StartTime) > moment(Date.now())) {
                upcoming.push(item)
                // console.log('upcomming', item);
            }
            else if (moment(item.data.EndTime) < moment(Date.now())) {
                SoldItem.push(item)
                // console.log('upcomming', item);
            }

        })
    }

    if (liveBid.length) {
        this.setState({ liveBid })

        // console.log(liveBid, '?>??live???')
    }
    if (upcoming.length) {
        this.setState({ upcoming })

        // console.log(upcoming, '?>????????')

    }
    if (SoldItem.length) {
        this.setState({ SoldItem })

        // console.log(upcoming, '?>????????')

    }
}, 100)
    }

    componentWillReceiveProps(props) {
        const { me, allUser, allPost, currentPosts } = props
       
        console.log(currentPosts ,';my post will')
       
    }
    BidLive = (i) => {
        // console.log(i, "ii")
        this.props.navigation.navigate('ProfilePost', { i })

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
        const { allUser, SoldItem, services, match, upcoming, liveBid,me } = this.state
        return (
            <View styel={{ flex: 1 }}>
                <Header

                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',

                    }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.Drawer() }}
                    centerComponent={{ text: me ? me.name: null, style: { color: '#fff', fontSize: 20 } }}
                />
                <ScrollView styel={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >

                    <View >


                        <View >
                            {upcoming &&
                                <View>
                                    <Text style={{ alignItems: 'center', fontSize: 15, fontWeight: "bold", color: '#075e54', paddingLeft: 20,justifyContent:'center'}}>Your Up Comming Bid's</Text>
                                    <ScrollView alwaysBounceVertical>
                                        {upcoming &&
                                            upcoming.map((i) => {
                                                // console.log(i, "><><><<>")
                                                return (
                                                    <View key={i.key} style={{ flexDirection: 'column', borderWidth: 2, borderRadius: 10, borderColor: '#34b7f1', height: 250, margin: 5, alignItems: 'center', overflow: "hidden" }} >
                                                    <LinearGradient
                                                        colors={['#25d366', 'transparent']}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0,
                                                            right: 0,
                                                            top: 0,
                                                            height: 150,
                                                        }}
                                                    />

                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={styles.titleName}>{i.data.name}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image style={{ width: 300, height: 170 }} source={{ uri: i.data.image }} />
                                                    </View>
                                                    <View style={{ alignItems: 'center', marginTop: 2, marginBottom: 2, paddingTop: 10 }}>
                                                        <Button
                                                            width="100"
                                                            title="View"
                                                            onPress={() => this.BidLive(i)
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                                )
                                            })
                                        }

                                    </ScrollView>


                                </View>

                            }

                            {liveBid &&
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: '#075e54', paddingLeft: 20,alignItems:'center',justifyContent:'center'}}> your Live Auctions</Text>
                                    <ScrollView alwaysBounceVertical>
                                        {liveBid &&
                                            liveBid.map((i) => {
                                                // console.log(i, "><><><<>")
                                                return (
                                                    <View key={i.key} style={{ flexDirection: 'column', borderWidth: 2, borderRadius: 10, borderColor: '#34b7f1', height: 250, margin: 5, alignItems: 'center', overflow: "hidden" }} >
                                                        <LinearGradient
                                                            colors={['#25d366', 'transparent']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                height: 150,
                                                            }}
                                                        />
                                                        {/* <View style={{ height: 200,  borderWidth: 1, flex: 1, margin: 3, borderRadius: 10, borderColor: '#34b7f1',alignItems:'center' }}> */}

                                                        <View style={{ alignItems: 'center' }}>
                                                            <Text style={styles.titleName}>{i.data.name}</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'center' }}>
                                                            <Image style={{ width: 300, height: 170 }} source={{ uri: i.data.image }} />
                                                        </View>
                                                        <View style={{ alignItems: 'center', marginTop: 2, marginBottom: 2, paddingTop: 10 }}>
                                                            <Button
                                                                width="100"
                                                                title="View"
                                                                onPress={() => this.BidLive(i)
                                                                }
                                                            />
                                                        </View>
                                                    </View>
                                                    // </View>
                                                )
                                            })
                                        }
                                    </ScrollView>

                                </View>
                            }

                        </View>


                    </View>
                    <View style={{height:100}}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 170,
        width: 200,
        alignItems: 'center',

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
        allUser: state.authReducers.ALLUSER,
        allPost: state.authReducers.ALLPOST,
        currentPosts: state.authReducers.USERPOST
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

export default connect(mapStateToProp, mapDispatchToProp)(Profile);


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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    // componentWillUnmount(){
    //     console.log('compoenet wi un wount ')
    // }

    componentWillReceiveProps(props) {
        const { me, allUser, allPost, currentPosts } = props
        setTimeout(() => {
            var liveBid = [];
            var upcoming = [];
            // console.log(allPost ,';all post will')
            // console.log(currentPosts ,';my post will')
            if (allPost) {
                allPost.map(item => {
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
        }, 100)
        var  check = setInterval(() => {
            // console.log('hello')
            var liveBid = [];
            var upcoming = [];
            // console.log(allPost ,';all post will')
            // console.log(currentPosts ,';my post will')
            if (allPost) {
                allPost.map(item => {
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

                })
            }

            if (liveBid.length) {
                this.setState({ liveBid })

                console.log(liveBid, '?>??live???')
            }
            if (upcoming.length) {
                this.setState({ upcoming })

                console.log(upcoming, '?>????????')
                
            }
        }, 25000)
    }
     myStopFunction = ()=> {
        clearTimeout(check);
      }
    BidLive = (i) => {
        // console.log(i, "ii")
        this.props.navigation.navigate('Live', { i })

    }
    BidAdv = (i) => {
        // console.log(i, "ii")
        this.props.navigation.navigate('BidAdv', { i })

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
        const { allUser, loading, services, match, upcoming, liveBid } = this.state
        return (
            <View styel={{ flex: 1 }}>
                <Header

                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',

                    }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.Drawer() }}
                    centerComponent={{ text: "Auction Point", style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'search', color: '#fff', onPress: () => this.seacrh() }}
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
                                    <Text style={{ alignItems: 'center', fontSize: 25, fontWeight: "bold", color: '#075e54', paddingLeft: 20 }}>Up Comming Bid's</Text>
                                    <ScrollView horizontal={true}>
                                        {upcoming &&
                                            upcoming.map((i) => {
                                                // console.log(i, "><><><<>")
                                                return (
                                                    <View key={i.key} style={{ flexDirection: "row" }} >
                                                        <LinearGradient
                                                            colors={['#25d366', 'transparent']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                height: 300,
                                                            }}
                                                        />
                                                        <View style={{ height: 350, width: 200, borderWidth: 2, flex: 1, margin: 10, borderRadius: 10, borderColor: '#34b7f1' }}>
                                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text style={styles.titleName}>{i.data.name}</Text>
                                                            </View>
                                                            <View style={{ borderRadius: 5, overflow: 'hidden', height: 200, }}>
                                                                <Image style={styles.img} source={{ uri: i.data.image }} />
                                                            </View>
                                                            <TouchableOpacity onPress={() => this.BidAdv(i)}>
                                                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 16, color: '#3498db', paddingBottom: 8, paddingTop: 3 }}>{`Starting BID ${i.data.Bid} PKR`}</Text>
                                                                </View>
                                                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={styles.cardTitle}>{moment(new Date(i.data.StartTime)).fromNow()}</Text>
                                                                </View>
                                                            </TouchableOpacity>
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
                                    <Text style={{ fontSize: 25, fontWeight: "bold", color: '#075e54', paddingLeft: 20 }}> Live Auctions</Text>
                                    <ScrollView alwaysBounceVertical>
                                        {liveBid &&
                                            liveBid.map((i) => {
                                                // console.log(i, "><><><<>")
                                                return (
                                                    <View key={i.key} style={{ flexDirection: 'column', borderWidth: 2, borderRadius: 10, borderColor: '#34b7f1', height: 300, margin: 5, alignItems: 'center', overflow: "hidden" }} >
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
                                                            <Image style={{ width: 350, height: 200 }} source={{ uri: i.data.image }} />
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
                    <View style={{ height: 100 }}></View>
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

export default connect(mapStateToProp, mapDispatchToProp)(Home);


import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl, Button, KeyboardAvoidingView } from 'react-native';
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

class BidAdv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Bid: ''
        };
    }

    componentDidMount() {
        const { navigation, allUser } = this.props;
        var sellerr
        const item = navigation.getParam('i')
        const Seller = item.data.UID

        if (Seller) {
            allUser.map((i) => {
                if (i.UID === Seller) {
                    sellerr = i
                    console.log(i)
                    this.setState({
                        Seller: sellerr
                    })

                }

            }
            )
        }
        if (item) {
            this.setState({
                Name: item.data.name,
                StartingBid: item.data.Bid,
                EndTime: item.data.EndTime,
                StartingTime: item.data.StartTime,
                Category: item.data.category,
                description: item.data.decscrition,
                image: item.data.image,
            })

        }
        this.bids()
    }
    bids = () => {

        const { me, navigation } = this.props
        const item = navigation.getParam('i')
        console.log(item.data.UID, item.key, "ss")
        var myBid
        var allbid = []
        firebase.database().ref('/Aucation/' + item.data.UID).on('child_changed', snapShot => {
            if (snapShot.key === item.key) {
                console.log(snapShot.val(), '====');

                var bids = snapShot.val().AuctionBid
                if (bids) {
                    bids.map((i) => {
                        if (i.personUID === me.UID) {
                            myBid = i
                        } else {
                            allbid.push(i)
                        }

                    })
                    this.setState({
                        CurrentUserBid: myBid,
                        AllBids: bids
                    })
                }
            }
        })
        firebase.database().ref('/Aucation/' + item.data.UID).on("child_added", snapShot => {
            if (snapShot.key === item.key) {
                console.log(snapShot.val(), '====');

                var bids = snapShot.val().AuctionBid
                if (bids) {
                    bids.map((i) => {
                        if (i.personUID === me.UID) {
                            myBid = i
                        } else {
                            allbid.push(i)
                        }

                    })
                    this.setState({
                        CurrentUserBid: myBid,
                        AllBids: bids
                    })
                }
            }
        })

    }
    
    Chat = () => {
        const { Seller } = this.state
        const item = Seller
        this.props.navigation.navigate('Chat', { item })
    }

    // Updated = () => {
    
    Submite = () => {
        const { Bid, StartingBid, Seller, CurrentUserBid, AllBids } = this.state
        const { me, navigation } = this.props
        const item = navigation.getParam('i')
        var all = AllBids

        console.log(me, Bid)
        if (StartingBid && Bid) {
            if (AllBids) {
                const obj = {

                    bid: Bid,
                    Personpic: me.photo,
                    personUID: me.UID,
                    PersonName: me.name
                }
                all.push(obj)
                firebase.database().ref('/Aucation/' + '/' + Seller.UID + '/' + item.key + '/' + 'AuctionBid').set(all)
            } else {

                const obj = {
                    AuctionBid: [{
                        bid: Bid,
                        Personpic: me.photo,
                        personUID: me.UID,
                        PersonName: me.name
                    }]
                }
                firebase.database().ref('/Aucation/' + '/' + Seller.UID + '/' + item.key).update(obj)


            }
        }
        this.setState({
            Bid: ''
        })
    }
    Drawer = () => {
        this.props.navigation.openDrawer();
    }

    static navigationOptions = { header: null }

    render() {

        const { Name,
            StartingBid,
            EndTime,
            StartingTime,
            Category,
            description,
            image,
            Seller, Bid, CurrentUserBid, AllBids } = this.state


        return (
            <View styel={{ flex: 1 }}>
                <Header

                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',

                    }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.Drawer() }}
                    centerComponent={{ text: Name ? Name : null, style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'comment', color: '#fff', onPress: () => this.Chat() }}
                />
                <ScrollView

                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={this._onRefresh}
                    //     />}
                >
                    {image &&
                        <View style={styles.MainDiv}>
                            <View style={{ borderRadius: 5, overflow: 'hidden', height: 200, justifyContent: 'center', padding: 2 }}>
                                <Image style={{ height: 200, width: 350, alignContent: 'center' }} source={{ uri: image }} />
                            </View>
                            {CurrentUserBid ?
                                <View>
                                    <View style={styles.headings}><Text style={styles.HeadingText}>Update your Bid</Text></View>
                                    <Text>Thank's! your Bid is placed come when Bid is Live.</Text>

                                </View>
                                :
                                <View>
                                    <View style={styles.headings}><Text style={styles.HeadingText}>Place your Bid in advance</Text></View>
                                    <View style={styles.InputDiv}>
                                        <TextInput
                                            style={styles.InputFields}
                                            onChangeText={(e) => this.setState({ Bid: e })}
                                            value={Bid}
                                            placeholder={'Price'}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <View style={{ width: 80, justifyContent: "flex-end", alignContent: "center", }}>
                                        <Button

                                            title="Submite"
                                            onPress={() => this.Submite()
                                            }
                                        />

                                    </View>

                                </View>
                            }

                            <View style={{ margin: 5, flexDirection: "column", borderWidth: 2, flex: 1, margin: 10, borderRadius: 10, borderColor: '#34b7f1', padding: 10 }}>
                                <Text style={styles.HeadingText}>{`Decscrition: ${description}`}</Text>
                                <Text style={styles.HeadingText}>{`Starting Bid: ${StartingBid} pkr`}</Text>
                                <Text style={styles.HeadingText}>{`time left: ${moment(new Date(EndTime)).fromNow()}`}</Text>
                                <Text style={styles.HeadingText}>{`Seller: ${Seller.name}`}</Text>


                            </View>

                        </View>
                    }
                    {/* {AllBids && <View>
                        <Text style={{ alignItems: 'center', fontSize: 25, fontWeight: "bold", color: '#075e54', paddingLeft: 20 }}>Live Biding</Text>
                    {
                        
                    AllBids.map((i)=>{
                        return (
                            <View style={{ minHeight: 40, maxHeight: 160 }} >
                            <View style={styles.view}>
                                <View>
                                    <Image
                                        source={{ uri: i.Personpic }}
                                        style={{ width: 50, height: 60, borderRadius: 25 }}
                                    />

                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16, fontWeight: "700", paddingLeft: 15 }} >{i.PersonName}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: "700", paddingLeft: 15 }} >{i.bid + ' PKR'}</Text>
                                </View>

                            </View>
                        </View>
                        )
                    })}
</View>
                    } */}
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
    view: {
        paddingLeft: 6,
        paddingTop: 15,
        paddingBottom: 15,
        // marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderColor: 'white'
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

    },
    InputFields: {
        alignContent: "center",
        minHeight: 30,
        maxHeight: 100,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 15,

    },
    headings: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    InputDiv: {
        margin: 5,
        padding: 5,
    },
    HeadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#4860a5",

    },
    MainDiv: {
        margin: 5,
        backgroundColor: '#e9f1e2',
        borderRadius: 10,
    },

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

export default connect(mapStateToProp, mapDispatchToProp)(BidAdv);


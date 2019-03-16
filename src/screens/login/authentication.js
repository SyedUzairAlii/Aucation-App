import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Expo from 'expo';
import { Header } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements'
import { Constants } from 'expo';
import { current_User } from '../../store/actions/authAction'
import { connect } from 'react-redux';
import { User_Messages } from '../../store/actions/authAction'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log(user);
                const userCurrent = user
                // this.props.message(userCurrent)
                const currentUser = user
                this.props.user(currentUser)
            }
        })
    }
   
    componentWillReceiveProps(props) {
        const { currentUser } = props;
        if (currentUser) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
        }
    }
   

    async   Goolge() {
        googleAuthenticate = (idToken, accessToken) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            return firebase.auth().signInWithCredential(credential);
        };
    }
    _loginWithGoogle = async function () {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: '499850160098-f5tsbbhms5m4ktehp8tuo5rs90v6ejrt.apps.googleusercontent.com',
                iosClientId: '499850160098-ognlbbt7r08ii07pttod5bt052v48ajn.apps.googleusercontent.com',
                scopes: ["profile", "email"]
            });
            if (result.type === 'success') {
                // this.props.navigation.navigate('Home', result)
                console.log('Result-->', result);

                this.props.profilePic = result.photoUrl
                this.props.profileName = result.givenName
                const { idToken, accessToken } = result;
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential)
                    .then(success => {
                        // console.log('success==>', success);
                        var currentUID = success.user.uid
                        var obj = {
                            name: success.user.displayName,
                            UID: success.user.uid,
                            photo: success.user.photoURL,
                            Token: accessToken,
                        }
                        firebase.database().ref('/Users/' + currentUID).update(obj);
                        this.props.Google_auth(currentUID, obj)
                        this.props.user(currentUID)
                    })
                    .catch(error => {
                        console.log("firebase cred err:", error);
                    });
                return result.accessToken;

            } else {
                return { cancelled: true };
            }

          
        } catch (err) {
            console.log("err:", err);
        }
    };
  
    static navigationOptions = { header: null }
    render() {
        const { Email, Password } = this.state
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Header
                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',
                    }}
                    centerComponent={{ text: "Auction Point", style: { color: '#fff', fontSize: 20 } }}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity  onPress={() => this._loginWithGoogle()}>
                        <View style={{ width: 300, margin: 20 }}>
                            <SocialIcon
                                title='Sign In With Google'
                                button
                                type='google-plus-official'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Heading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 60,
        marginBottom: 85,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
        color: '#fff',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    buton: {
        alignItems: 'center',
        backgroundColor: '#0055ff',
        paddingVertical: 10,
        marginBottom: 20,
        width: 220,


    },
    google: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        paddingVertical: 10,
        marginBottom: 20,
        width: 220,


    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        fontSize: 20
    },
    statusBar: {
        backgroundColor: "#C2185B",
        height: Constants.statusBarHeight,
    },

});
function mapStateToProps(states) {
    return ({
        profilePic: states.authReducers.PROFILEPIC,
        profileName: states.authReducers.PROFILENAME,
        currentUser: states.authReducers.USER,
        allUser: states.authReducers.ALLUSER
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
        message: (userCurrent) => {
            dispatch(User_Messages(userCurrent))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
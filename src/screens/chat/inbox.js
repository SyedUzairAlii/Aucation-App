import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Image, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker, Permissions } from 'expo'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Input, Header, Divider, Avatar, Button } from 'react-native-elements';
import moment from 'moment'
import www from '../../../assets/inbox.png'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            person: '',
            currentUser: '',
            firstTime: false,
            btn: false
        }

    }
    componentDidMount() {
        const { CurrentUser, UID, navigation, ChatMessage, flag } = this.props
        const user = navigation.getParam('item')
        var newUpdate = []
        var AllMessages = []

        if (user || CurrentUser) {
            this.setState({ person: user, currentUser: CurrentUser })
        }

        if (user) {
            firebase.database().ref('/Messages/').on('child_added', snapShot => {
                const Messages = snapShot.val();
                if (Messages.senderUid === UID || Messages.reciverUid === UID) {
                    AllMessages.push(Messages)
                    newUpdate.push(Messages)
                }
                const currentUser = CurrentUser
                const receverPerson = user
                var chat = []
                AllMessages.map((i) => {
                    if (i.senderUid === currentUser.UID && i.reciverUid === receverPerson.UID) {
                        chat.push(i)
                        // console.log(i, 'chat did1')
                        this.setState({
                            firstMsg: true
                        })
                    } else if (i.reciverUid === currentUser.UID && i.senderUid === receverPerson.UID) {
                        chat.push(i)
                        // console.log(i, 'chat did2')
                        this.setState({
                            firstMsg: true
                        })
                    }
                })
                this.setState({ chatMesg: chat })
            })
        }
    }



    Send = () => {
        const { text, person, currentUser, chatMesg, firstMsg } = this.state;
        var user = currentUser.UID
        var recever = person.UID
        var message = text
        if (firstMsg === true) {
            // console.log(chatMesg, 'chat send')

            if (text) {
                const obj = {
                    message: message,
                    senderUid: user,
                    reciverUid: recever,
                    date: Date.now()
                }
                firebase.database().ref('/Messages/').push(obj).then(() => {
                    this.setState({
                        text: null,
                    })
                })
                this.setState({ btn: false })
            }

        } else {
            if (text) {
                // console.log('chat 2send')
                const obj = {
                    message: message,
                    senderUid: user,
                    reciverUid: recever,
                    date: Date.now(),
                    id: 1,
                    sender: currentUser,
                    reciver: person,
                }
                firebase.database().ref('/Messages/').push(obj).then(() => {
                    this.setState({
                        text: null,
                    })
                })
                this.setState({ btn: false })
            }
        }

    }
    static navigationOptions = {

        title: "Chat",

        headerStyle: {
            backgroundColor: '#075e54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        const { text, chatMesg, currentUser, person, btn } = this.state

        const keyboardVerticalOffset = Platform.OS === 'ios' ? 53 : 0 || Platform.OS === 'android' ? 70 : 0
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled keyboardVerticalOffset={keyboardVerticalOffset}>
                    <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>

                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                                {
                                    chatMesg &&
                                    chatMesg.map((i, index) => {
                                        // console.log(i, "mapmsg")
                                        if (i.senderUid === currentUser.UID) {
                                            return (
                                                <View key={index} style={{ backgroundColor: '#E3FDCB', width: 200, marginLeft: 150, borderRadius: 20, marginBottom: 5, marginTop: 5, justifyContent: 'flex-end', }}>
                                                    <Text style={{ fontSize: 14, padding: 1, margin: 2, marginLeft: 20, marginRight: 6, alignItems: 'center' }}>{i.message}</Text>
                                                    <Text style={{ fontSize: 10, margin: 2, color: 'gray' }}>
                                                        {moment((i.date)).format(" h:mm: A")}
                                                    </Text>
                                                </View>

                                            )
                                        } else if (i.senderUid === person.UID) {
                                            return (
                                                <View key={index} style={{ backgroundColor: 'white', width: 200, borderRadius: 20, paddingLeft: 10, justifyContent: 'center', marginBottom: 5, marginTop: 5, justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: 14, padding: 1, margin: 2, marginLeft: 6, marginRight: 6 }}>{i.message}</Text>
                                                    <Text style={{ fontSize: 10, margin: 1, color: 'gray' }}>
                                                        {moment((i.date)).format(" h:mm: A")}
                                                    </Text>
                                                </View>

                                            )
                                        }

                                    })
                                }

                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                            <View style={{ height: 40, backgroundColor: 'white', width: '75%', borderRadius: 40, justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 10 }}>
                                {/* <ScrollView> */}
                                <TextInput
                                    // style={{
                                    //   width:'100%'
                                    // }}
                                    multiline={true}
                                    placeholder={'Type a mesage '}
                                    pl
                                    // inputAccessoryViewID={inputAccessoryViewID}
                                    onChangeText={(e) => {
                                        this.setState({ text: e })
                                        if (e) {
                                            this.setState({ btn: true })
                                        } else {
                                            this.setState({ btn: false })
                                        }
                                    }}
                                    value={text}

                                />
                                {/* </ScrollView> */}
                            </View>
                            <View styele={{ width: '25%', height:14,width:'29%'}}>

                                <Button
                                    linearGradientProps={{
                                        colors: ['#4c669f', '#3b5998', '#192f6a'],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                    onPress={() => this.Send()}

                                    large
                                    // icon={{ name: 'arrow-small-right', type: 'octicon', }}
                                    title='send'
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        // backgroundColor: 'rgba(99, 172, 221,0.5)',
        marginBottom: 10,
        color: '#fff',
        height: 40,
        width: '78%',
        paddingHorizontal: 10,
        fontSize: 18,
        borderRadius: 18
    },
});

function mapStateToProps(states) {
    return ({
        UID: states.authReducers.UID,
        CurrentUser: states.authReducers.USER,
        alluser: states.authReducers.ALLUSER,
        ChatMessage: states.authReducers.CHAT,
        flag: states.authReducers.FLAG,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
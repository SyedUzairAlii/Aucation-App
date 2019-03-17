import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, } from 'react-native';
import firebase from '../../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Header, Input } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';
import { ImagePicker } from 'expo';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome';
const url =
    'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

class Aucationeer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            decscrition: '',
            isDateTimePickerVisibleStart: false,
            isDateTimePickerVisibleEnd: false,
            Bid: '',
        };
    }
    componentDidMount() {
        const { currentUser } = this.props
        console.log(currentUser)
    }
    submit() {
        const { name,decscrition,Bid,category,StartTime,EndTime,image} = this.state
        const { currentUser } = this.props
        const UID = currentUser.UID
        if (!name ) {
            alert('Please add name')
        } else if (!decscrition && decscrition.length < 10) {
            alert('Describe briefly ')
        } else if (!category) {
            alert('Please select Category')
        } else if (moment(StartTime) <= moment(Date.now())) {
            alert('select atlest 10 mint to the current time')
        } else if (!EndTime) {
            alert('Please Select Ending Time')
        } else if (EndTime <= StartTime) {
            alert('Please select Correct Ending Time')
        } else if (!Bid) {
            alert('Please Add Minimum Price')
        } 
        else if (!image) {
            alert('Please Select Image')
        }else {
            alert('Submitted')
            const obj = {
                UID:UID,
                name,
                decscrition,
                Bid,
                category,
                StartTime,
                EndTime,
                image,
            }
            firebase.database().ref('/Aucation/' + UID).push(obj)
            this.props.navigation.navigate('Home')
            console.log(obj)
        }
    }

    Home() {
        this.props.navigation.navigate('Home')
    }

    //start time
    _showDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: true });
    _hideDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: false });

    _handleDatePickedStart = (date) => {
        this.setState({
            StartTime: moment(date).format("LLLL")
        })
        this._hideDateTimePickerStart();
    };

    //end time
    _showDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: true });
    _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: false });


    _handleEndDateEnd = (date) => {
        this.setState({
            EndTime: moment(date).format("LLLL")
        })


        this._hideDateTimePickerEnd();
    };

    _pickImage = async () => {
        console.log('heelooo')
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            // aspect: 1,
        });
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async (pickerResult) => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                console.log(uploadUrl, 'url>>>>>>>>>>>>>')
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            // this.setState({ uploading: false });
            console.log('finally');

        }
    };
    static navigationOptions = { header: null }

    render() {
        const { EndTime, text, StartTime, image, Bid } = this.state
        let Category = [{
            value: 'Mobile',
        }, {
            value: 'Laptop',
        },
        {
            value: 'Tablets',
        }, {
            value: 'Tv accessories',
        }, {
            value: 'Motorbike',
        }, {
            value: 'Car',
        },
        {
            value: 'Colling & Air Treatment',
        },
        {
            value: 'Sports & Travel',
        }
        ];
        return (
            <View style={{ flex: 1 }}>
                <Header
                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={{ icon: 'home', color: '#fff', onPress: () => this.Home() }}
                    centerComponent={{ text: "Creat Auction", style: { color: '#fff', fontSize: 20 } }}
                />
                <ScrollView>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.MainDiv}>
                        <View>
                            <View style={styles.headings}><Text style={styles.HeadingText}>Product Name</Text></View>
                            <View style={styles.InputDiv}>
                                <TextInput
                                    style={styles.InputFields}
                                    onChangeText={(name) => this.setState({ name })}
                                    placeholder={'Product Name'}
                                    value={this.state.text}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.headings}><Text style={styles.HeadingText}>Product Description</Text></View>
                            <View style={styles.InputDiv}>
                                <TextInput
                                    style={styles.InputFields}
                                    multiline={true}
                                    onChangeText={(decscrition) => this.setState({ decscrition })}
                                    placeholder='Product decscrition'
                                    value={this.state.text}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.headings}><Text style={styles.HeadingText}>Starting Bid</Text></View>
                            <View style={styles.InputDiv}>
                                <TextInput
                                    style={styles.InputFields}
                                    onChangeText={(e) => this.setState({ Bid: e })}
                                    value={Bid}
                                    placeholder={'Price'}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.headings}><Text style={styles.HeadingText}>Chose your product category</Text></View>
                            <View style={styles.InputDiv}>
                                <Dropdown
                                    label='Select category'
                                    data={Category}
                                    // baseColor={'#ccff33'}
                                    // textColor={'#ffff99'}
                                    // itemColor={'#00e6e6'}
                                    selectedItemColor={'#ff00aa'}
                                    onChangeText={e => this.setState({ category: e })}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.headings}><Text style={styles.HeadingText}>Set Auction Period</Text></View>

                            <View>
                                <View style={{}}>
                                    <TouchableOpacity style={styles.dateTime} onPress={this._showDateTimePickerStart}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: "#424D62",
                                        }}> <Icon name='clock-o' size={20} color='#30e836' />   Start Time:</Text>
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisibleStart}
                                    onConfirm={this._handleDatePickedStart}
                                    onCancel={this._hideDateTimePickerStart}
                                    is24Hour={true}
                                    mode={'datetime'}
                                    titleIOS={'Open Time'}
                                />
                                {StartTime && <View style={{ alignItems: 'center' }}>
                                    <Text >{StartTime}</Text>
                                </View>}
                            </View>

                            <View >
                                <View>
                                    <TouchableOpacity style={styles.dateTime} onPress={this._showDateTimePickerEnd}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: "#424D62",
                                        }
                                        }> <Icon name='clock-o' size={20} color='#30e836' />   Ending Time:</Text>
                                    </TouchableOpacity>

                                </View>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisibleEnd}
                                    onConfirm={this._handleEndDateEnd}
                                    onCancel={this._hideDateTimePickerEnd}
                                    is24Hour={true}
                                    mode={'datetime'}
                                    titleIOS={'Open Time'}
                                />
                                {EndTime && <View style={{ alignItems: 'center' }}>
                                    <Text >{EndTime}</Text>
                                </View>}
                            </View>
                        </View>
                        <View>
                            <View style={styles.headings}>
                                <Text style={styles.HeadingText}>Product Image</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                {image ?
                                    <Image source={{ uri: image }} style={{ width: 270, height: 230 }} />
                                    :
                                    <Image source={require("../../../assets/up.png")} style={{ width: 200, height: 200 }} />
                                }
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 30 }}>
                                <Button
                                    title="Pick an image from camera roll"
                                    onPress={() => this._pickImage()}
                                />
                            </View>
                        </View>
                        </View>
                        <View style={{ height: 20, marginBottom:10}}>
                            <Button
                                onPress={() => this.submit()}
                                title="Submit"
                                color="#841584"
                            />
                        </View>
                        <View style={{ height: 20 }}></View>

                    </KeyboardAvoidingView>
                </ScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    statusBar: {
        backgroundColor: "#075e54",
        height: Constants.statusBarHeight,
    },
    InputFields: {
        minHeight: 30,
        maxHeight: 100,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 15,
        
    },
    InputDiv: {
        margin: 5,
        padding: 5,
    },
    MainDiv: {
        margin: 5,
        backgroundColor: '#e9f1e2',
        borderRadius: 10,
    },
    headings: {
       paddingHorizontal:10,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    HeadingText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#4860a5",

    },
    inputPrice: {
        backgroundColor: 'rgba(99, 172, 221,0.5)',
        color: '#fff',
        height: 34,
        width: 70,
        paddingHorizontal: 10,
        // paddingVertical: 16,
        justifyContent: 'center',
        fontSize: 18,
        borderRadius: 10,
        overflow: 'hidden'
    },
    dateTime: {
        padding: 10,
        color: '#fff',
        height: 40,
        fontSize: 18,
    },

});

function mapStateToProp(state) {
    return ({
        currentUser: state.authReducers.USER,
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
async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}
export default connect(mapStateToProp, mapDispatchToProp)(Aucationeer);


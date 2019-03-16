import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, TextInput, Button,KeyboardAvoidingView,} from 'react-native';
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
            <View>
                <View style={styles.statusBar} />
                <ScrollView styel={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' enabled>
                    <View>
                        <Header
                            containerStyle={{
                                backgroundColor: '#075e54',
                                justifyContent: 'space-around',
                                height: 60
                            }}
                            leftComponent={{ icon: 'home', color: '#fff', onPress: () => this.map() }}
                            centerComponent={{ text: "Aucationeer", style: { color: '#fff', fontSize: 20 } }}
                        />
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
                                <View style={styles.headings}><Text style={styles.HeadingText}>Set Aucation Period</Text></View>

                                <View >
                                    <View >
                                        <TouchableOpacity style={styles.dateTime} onPress={this._showDateTimePickerStart}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                color: "#424D62",
                                            }}> <Icon name='clock' size={30} color='#30e836' /> Start Time:</Text>
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
                                    {StartTime && <View>
                                        <Text>{StartTime}</Text>
                                    </View>}
                                </View>

                                <View>
                                    <View>
                                        <TouchableOpacity style={styles.dateTime} onPress={this._showDateTimePickerEnd}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                color: "#424D62",
                                            }
                                            }> <Icon name='clock' size={30} color='#30e836' />Ending Time:</Text>
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
                                    {EndTime && <View>
                                        <Text>{EndTime}</Text>
                                    </View>}
                                </View>
                            </View>
                            <View>
                                <View style={styles.headings}>
                                    <Text style={styles.HeadingText}>Product Image</Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    {image &&
                                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 30 }}>
                                    <Button
                                        title="Pick an image from camera roll"
                                        onPress={() => this._pickImage()}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 6 }}>Starting Bid:</Text>
                                <TextInput
                                    style={styles.inputPrice}
                                    onChangeText={(e) => this.setState({ Bid: e })}
                                    value={Bid}
                                    placeholder={'Price'}
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>
                        <View style={{ height: 20 }}></View>
                    </View>
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
        margin: 5
    },
    headings: {
        padding: 5,
        margin: 5,
        justifyContent: 'flex-start',
    },
    HeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#424D62",

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


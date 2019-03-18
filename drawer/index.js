import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Button,Avatar } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { Log_Out } from '../src/store/actions/authAction'

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceSubmit: false
        };
    }
 
    
   
    static navigationOptions = {
        title: 'Menu',
        headerStyle: {
            backgroundColor: '#6699cc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
   
    Aucationeer = () =>{
        this.props.navigation.navigate('Aucationeer')
    }
    LogOut = () => {
        this.props.logout()

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {

        const { allUser, list, userLogin,currentUser,block} = this.state
        return (
            <View>
                
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        justifyContent: 'center',
                        alignItems: "center",
                        marginBottom:70
                    }}>
                        <View style={{ width: 250, height: 220,  overflow:'hidden', marginBottom:10 ,flexDirection:'column',justifyContent:'center'}} >
                            {/* <ImageBackground source={Mmm} style={{ width: '100%', height: '100%' }}> */}
                             <View style={{ flexDirection:'column',justifyContent:'center',marginTop:70,padding:5}}>

                                   <View>
                               {/* <Avatar
                                    size="large"
                                    rounded
                                    title="CR"
                                    // onPress={() => this.pickImage}
                                    activeOpacity={0.7}
                                    source={{
                                        uri: currentUser.photo
                                        
                                    }}
                                    
                                    /> */}
                               </View>
                               <View style={{marginTop:5}}>

                                <Text style={{ fontSize: 20, color:'#d7eeef',fontWeight:'bold',}}>kk</Text>
                               </View>
                                    </View>
                            {/* </ImageBackground> */}
                        </View>
                        <View style={{ width: 200, height: 80, borderRadius: 40 }} >
                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.Aucationeer}
                                
                                large
                                icon={{ name: 'home', type: 'octicon', }}
                                title='Aucationeer' />
                        </View>
                        <View style={{ width: 200, height: 80, borderRadius: 80 }} >
                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.LogOut}
                                large
                                icon={{ name: 'sign-in', type: 'octicon', }}
                                title='Log-Out' />
                        </View>
                    </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    someButtonStyle: {
        flex: 1,
        // backgroundColor: '#7FB3D5',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
        // opacity:0.9
        color: "#f0f"
    },
    statusBar: {
        backgroundColor: "#075e54",
        height: Constants.statusBarHeight,
    },


});

function mapStateToProp(state) {
    return ({
        user: state.authReducers.USER,
        allUser: state.authReducers.ALLUSER,
        me:state.authReducers.USER,
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        logout: () => {
            dispatch(Log_Out())
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Drawer);


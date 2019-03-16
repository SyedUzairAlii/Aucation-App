import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';




// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        dispatch(
            { type: actionTypes.UID, payload: UID }
        )
        firebase.database().ref('/Users/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            if (snapShot.key === currentUser.uid) {
                // console.log("user", snapShot.val())
                dispatch(
                    { type: actionTypes.USER, payload: snapShot.val() }
                )
            }
            else {
                arr.push(snapShot.val())
                // console.log("alluser", arr)
                dispatch(
                    { type: actionTypes.ALLUSER, payload: arr }
                )
            }
        })
    }
}



//messages

// current User messaeg
export function User_Messages(userCurrent) {
    return dispatch => {
        // console.log(userCurrent,'dedux')

        var arr = [];
        var flag
        var chatMessages = []
        firebase.database().ref('/Messages/').on('child_added', snapShot => {
            const Messages = snapShot.val();

            // console.log('ye check karo ',Messages)
            flag = !flag
            if (Messages.senderUid === userCurrent.uid || Messages.reciverUid === userCurrent.uid) {
                // console.log("user", snapShot.val())
                chatMessages.push(Messages)

                dispatch(
                    { type: actionTypes.CHAT, payload: chatMessages }
                )
            }
            dispatch(
                { type: actionTypes.FLAG, payload: flag }
            )


        })
        console.log(chatMessages, 'dheklo')

    }
}



export function Log_Out() {
    return dispatch => {
        firebase.auth().signOut().then(() => {

            dispatch(
                { type: actionTypes.USER, payload: null }
            )
            dispatch(
                { type: actionTypes.ALLUSER, payload: null }
            )
            dispatch(
                { type: actionTypes.SENDREQUEST, payload: null }
            )
            dispatch(
                { type: actionTypes.RECEIVEREQUEST, payload: null }
            )
            dispatch(
                { type: actionTypes.CHAT, payload: null }
            )
            dispatch(
                { type: actionTypes.FLAG, payload: null }
            )
            dispatch(
                { type: actionTypes.NEWCHAT, payload: null }
            )
        })
    }
}


        
export function Updte(uid) {
    return dispatch => {
        const UID =uid
        var arr = [];
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            if (snapShot.key === UID) {
                // console.log("user", snapShot.val())

                dispatch(
                    { type: actionTypes.USER, payload: snapShot.val() }
                )
            }
            else {
                arr.push(snapShot.val())
                dispatch(
                    { type: actionTypes.ALLUSER, payload: arr }
                    )
                }
                console.log("alluser dashboar", arr)
        })
      
        
        }
    
}             

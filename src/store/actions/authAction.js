import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';




// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        currentUserPost = [];
        allPost = [];
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

        //Posts
        firebase.database().ref('/Aucation/').on("child_added", snapShot => {
            for (var key in snapShot.val()) {
                var val = snapShot.val()[key]
                if (snapShot.key === UID) {
                    // console.log(val,"action my post")
                    // console.log(snapShot.key,"key caheck karo")
                    const obj = {
                        key: key,
                        data: val
                    }
                    currentUserPost.push(obj)
                    dispatch(
                        { type: actionTypes.USERPOST, payload: currentUserPost }
                    )
                } else {
                    // console.log(val,"action all post")
                    const obj = {
                        key: key,
                        data: val
                    }
                    allPost.push(obj)
                    dispatch(
                        { type: actionTypes.ALLPOST, payload: allPost }
                    )
                }
            }
        })

    }
}



//messages

// current User messaeg
export function User_Messages(userCurrent) {
    return dispatch => {

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
                { type: actionTypes.ALLPOST, payload: null }
            )
            dispatch(
                { type: actionTypes.USERPOST, payload: null }
            )
            // dispatch(
            //     { type: actionTypes.CHAT, payload: null }
            // )
            // dispatch(
            //     { type: actionTypes.FLAG, payload: null }
            // )
            // dispatch(
            //     { type: actionTypes.NEWCHAT, payload: null }
            // )
        })
    }
}



export function Updte(uid) {
    return dispatch => {
        const UID = uid
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

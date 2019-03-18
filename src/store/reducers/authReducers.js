import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    UID: null,
    USER: null,
    ALLUSER: null,
    USERPOST: null,
    ALLPOST: null,
    FLAG: false,
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UID':
            return ({
                ...states,
                UID: action.payload
            })
        case 'USER':
            return ({
                ...states,
                USER: action.payload
            })
        case 'ALLUSER':
            return ({
                ...states,
                ALLUSER: action.payload
            })
        case 'USERPOST':
            return ({
                ...states,
                USERPOST: action.payload
            })
        case 'ALLPOST':
            return ({
                ...states,
                ALLPOST: action.payload
            })
        case 'FLAG':
            return ({
                ...states,
                FLAG: action.payload
            })



        default:
            return states;
    }
}
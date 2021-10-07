import { CLEAR_STORE, LOGIN } from "./types";


const initialState = {
    credential: { accessToken:  localStorage.getItem('access_token') },
}

export default function loginReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN:
            return { ...state, credential: {...state.credential, ...payload} }
        
            case CLEAR_STORE:
                return { ...state, credential: { ...state.credential, accessToken: undefined } }   
    
        default:
            return state
    }
}

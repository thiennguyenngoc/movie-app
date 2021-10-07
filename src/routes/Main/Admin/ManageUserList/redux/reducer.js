import { GET_ALL_USER_INFO, GET_INFO_BY_USER_NAME, GET_USER_TYPES } from "./types";

const initialState = {
    allUserList: {},
    // infoByUserName: {},
    userTypes: []
}

export default function adminGetUserListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_USER_INFO: {
            return { ...state, allUserList: payload }
        }

        // case GET_INFO_BY_USER_NAME: {
        //     return { ...state, infoByUserName: payload }
        // }

        case GET_USER_TYPES: {
            return { ...state, userTypes: payload }
        }

        default:
            return state
    }
}

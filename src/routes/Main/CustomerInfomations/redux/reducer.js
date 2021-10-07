import { GET_TICKET_INFO } from "./types";

const initialState = {
    thongTinDatVe: []
}

export default function userInfoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_TICKET_INFO: {
            return { ...state, thongTinDatVe: payload }
        }
          
        default:
            return state
    }
}

import { GET_MOVIE_DETAIL } from "./types";

const initialState = {
    movieDetails: {}
}

export default function detailReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_MOVIE_DETAIL: {
            return { ...state, movieDetails: {...payload, heThongRapChieu: payload.heThongRapChieu.map(item => {
                return {...item, isActivated: false}
            }) }
        }}
    
        default:
            return state;
    }
}

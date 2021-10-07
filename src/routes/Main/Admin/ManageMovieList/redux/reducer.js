import { GET_CLUSTER_DETAIL, MANAGE_MOVIE_LIST } from "./types";

const initialState = {
    movieList: [],
    clusterDetail: []
}

export default function adminManageReducer(state = initialState, { type, payload }) {
    switch (type) {
        case MANAGE_MOVIE_LIST: {
            return { ...state, movieList: payload }
        }

        case GET_CLUSTER_DETAIL: {
            return { ...state, clusterDetail: payload }
        }

        default:
            return state
    }
}

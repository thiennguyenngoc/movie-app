import React from 'react'
import { GET_HOT_MOVIES, GET_MOVIE_LIST_BY_PAGES } from '../types'


const initialState = {
    hotMovies: [],
    movieList: {}
}

export default function movieReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_HOT_MOVIES: {
            return { ...state, hotMovies: payload }
        }

        case GET_MOVIE_LIST_BY_PAGES: {
            if (payload.currentPage === 1) {
                return { ...state, movieList: payload }
            }
            return { ...state, movieList: { ...payload, items: [...state.movieList.items, ...payload.items] } }
        }

        default:
            return state
    }
}

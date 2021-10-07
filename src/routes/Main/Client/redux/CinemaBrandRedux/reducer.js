import React from 'react'
import { GET_BRANDS, GET_SCHEDULE, GET_THEATER_DETAIL } from '../types'


const initialState = {
    brandList: [],
    cinemaDetail: [],
    movieSchedule: []
}

export default function brandReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_BRANDS: {
            return { ...state, brandList: payload.map(item =>{ return { ...item, isClicked: false } }) }
        }

        case GET_THEATER_DETAIL: {
            return { ...state, cinemaDetail: payload }
        }

        case GET_SCHEDULE: {
            return { ...state, movieSchedule: payload }
        }

        default:
            return state
    }
}

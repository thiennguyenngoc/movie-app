import React from 'react'
import { GET_INFO_FOR_SEARCHING_SECTION } from '../types'

const initialState = {
    searchingInfo: []
}

export default function searchingSectionReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_INFO_FOR_SEARCHING_SECTION: {
            return { ...state, searchingInfo: payload }
        }

        default:
            return state
    }
}

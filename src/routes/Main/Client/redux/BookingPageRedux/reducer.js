import React from 'react'
import { CHOOSING_SEATS, GET_BOOKING_INFO } from '../types'


const initialState = {
    danhSachGhe: [],
    thongTinPhim: {},
    danhSachVe: {}
}



export default function bookingReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_BOOKING_INFO: {
            const mapping = payload.danhSachGhe.map(ghe => ( {...ghe, isChoosing: false}))
            return { ...state, danhSachGhe: mapping, thongTinPhim: payload.thongTinPhim }
        }

        case CHOOSING_SEATS: {
            const cloneDanhSachGhe = [...state.danhSachGhe]
            const idxFound = cloneDanhSachGhe.findIndex(item => item.maGhe === payload)
            cloneDanhSachGhe[idxFound].isChoosing = !cloneDanhSachGhe[idxFound].isChoosing
            return { ...state, danhSachGhe: cloneDanhSachGhe }
        }

        default:
            return state
    }
}

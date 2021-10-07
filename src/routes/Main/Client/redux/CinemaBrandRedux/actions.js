import axios from 'helpers/axios'
import { GET_BRANDS, GET_THEATER_DETAIL, GET_SCHEDULE } from '../types'

export const getBrands = () => {
    return dispatch => {
        axios({
            url: '/api/QuanLyRap/LayThongTinHeThongRap',
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetBrands(res.data))
            })
    }
}

export const actGetBrands = brands => ({
    type: GET_BRANDS,
    payload: brands
})

export const getTheaterDetail = (maHeThongRap = 'BHDStar') => {
    return dispatch => {
        axios({
            url: `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`,
            method: 'GET',
        })
            .then(res => {
                dispatch(actGetTheaterDetail(res.data))
            })
    }
}

export const actGetTheaterDetail = detail => ({
    type: GET_THEATER_DETAIL,
    payload: detail
})

export const getMovieSchedule = (maHeThongRap = 'BHDStar') => {
    return dispatch => {
        axios({
            url: `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP02`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetMovieSchedule(res.data[0].lstCumRap))
            })
    }
}

export const actGetMovieSchedule = schedule => ({
    type: GET_SCHEDULE,
    payload: schedule
})
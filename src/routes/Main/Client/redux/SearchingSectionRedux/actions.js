import axios from 'helpers/axios'
import { GET_INFO_FOR_SEARCHING_SECTION } from '../types'

export const getInfoForSearching = () => {
    return dispatch => {
        axios({
            url: 'api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP02',
            method: 'GET'
        })
        .then(res => {
            dispatch(actGetInfoForSearching(res.data))
        })
    }
}

export const actGetInfoForSearching = info => ({
    type: GET_INFO_FOR_SEARCHING_SECTION,
    payload: info
})
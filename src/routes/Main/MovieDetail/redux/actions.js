import axios from 'helpers/axios'
import { GET_MOVIE_DETAIL } from './types'

export const getMovieDetail = maPhim => {
    return dispatch => {
        axios({
            url: `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetMovieDetail(res.data))
            })
    }
}

export const actGetMovieDetail = detail => ({
    type: GET_MOVIE_DETAIL,
    payload: detail
})
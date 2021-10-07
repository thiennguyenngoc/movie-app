import axios from 'helpers/axios'
import { GET_HOT_MOVIES, GET_MOVIE_LIST_BY_PAGES } from '../types'


export const getHotMovies = () => {
    return dispatch => {
        axios({
            url: '/api/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=GP02&soTrang=1&soPhanTuTrenTrang=10&tuNgay=01%2F01%2F2021&denNgay=01%2F10%2F2021',
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetHotMovies(res.data))
            })
    }
}

export const actGetHotMovies = hotMovies => ({
    type: GET_HOT_MOVIES,
    payload: hotMovies
})

export const getMovieList = (pageNumber = 1) => {
    return dispatch => {
        axios({
            url: `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP02&soTrang=${pageNumber}&soPhanTuTrenTrang=8`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetMovieList(res.data))
            })
    }
}

export const actGetMovieList = movieList => ({
    type: GET_MOVIE_LIST_BY_PAGES,
    payload: movieList
})
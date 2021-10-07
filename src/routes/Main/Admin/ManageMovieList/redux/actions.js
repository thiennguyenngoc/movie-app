import axios from 'helpers/axios'
import Swal from 'sweetalert2'
import { GET_CLUSTER_DETAIL, MANAGE_MOVIE_LIST } from './types'

// -------------------SHOW ALL MOVIE LIST-------------------
export const manageMovieList = (pageNumber = 1) => {
    return dispatch => {
        axios({
            url: `api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP02&soTrang=${pageNumber}&soPhanTuTrenTrang=10`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actManageMovieList(res.data))
            })
    }
}

export const actManageMovieList = movieList => ({
    type: MANAGE_MOVIE_LIST,
    payload: movieList
})

// -------------------SEARCH MOVIE-------------------
export const getMovieListByKeyword = keyWord => {
    return dispatch => {
        axios({
            url: `api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP02&tenPhim=${keyWord}&soTrang=1&soPhanTuTrenTrang=10`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actManageMovieList(res.data))
            })
    }
}

// -------------------DELETE MOVIE-------------------
export const deleteMovieItem = maPhim => {
    return dispatch => {
        axios({
            url: `api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
            method: 'DELETE'
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'XÓA PHIM THÀNH CÔNG',
                })
                dispatch(manageMovieList())
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'KHÔNG THỂ XÓA PHIM ĐÃ ĐƯỢC ĐẶT LỊCH CHIẾU !',
                })
            })
    }
}

// -------------------CLUSTER INFO-------------------
export const getClustersInfo = (clusterName = 'BHDStar') => {
    return dispatch => {
        axios({
            url: `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${clusterName}`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetClusterInfo(res.data))
            })
    }
}

// -------------------CREATE SCHEDULE-------------------
export const actGetClusterInfo = clusterDetail => ({
    type: GET_CLUSTER_DETAIL,
    payload: clusterDetail
})

export const createANewSchedule = (lichChieuMoi, history) => {
    return dispatch => {
        axios({
            url: '/api/QuanLyDatVe/TaoLichChieu',
            method: 'POST',
            data: lichChieuMoi
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'TẠO LỊCH CHIẾU MỚI THÀNH CÔNG',
                })
                history.push('/admin')
            })
    }
}

// -------------------ADD NEW MOVIE-------------------
export const addMovie = newMovieAttr => {
    return dispatch => {
        axios({
            url: '/api/QuanLyPhim/ThemPhimUploadHinh',
            method: 'POST',
            data: newMovieAttr
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'THÊM PHIM THÀNH CÔNG',
                })
            })
    }
}
import axios from 'helpers/axios'
import Swal from 'sweetalert2'
import { CHOOSING_SEATS, GET_BOOKING_INFO } from '../types'


export const getBookingInfo = (maLichChieu, loading) => {
    return dispatch => {
        loading.current.show()
        axios({
            url: `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetBookingInfo(res.data))
            })
            .finally(loading.current.hide)
    }
}

export const actGetBookingInfo = info => ({
    type: GET_BOOKING_INFO,
    payload: info
})

export const choosingSeat = maGhe => ({
    type: CHOOSING_SEATS,
    payload: maGhe
})

export const booking = (thongTinDatVe, history) => {
    return dispatch => {
        axios({
            url: '/api/QuanLyDatVe/DatVe',
            method: 'POST',
            data: thongTinDatVe
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'ĐẶT VÉ THÀNH CÔNG !',
                })
                history.push('/thongtinnguoidung#vedadat')
            })
    }
}




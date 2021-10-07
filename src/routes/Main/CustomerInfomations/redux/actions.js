import axios from 'helpers/axios'
import { actLogin } from 'routes/Login/redux/action'
import { GET_TICKET_INFO } from './types'
import Swal from 'sweetalert2'

export const getAllInformations = (taiKhoan, loading) => {
    return dispatch => {
        loading.current.show()
        axios({
            url: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            data: { "taiKhoan": taiKhoan }
        })
            .then(res => {
                dispatch(actGetAllInformations(res.data))
            })
            .finally(loading.current.hide)
    }
}

export const actGetAllInformations = thongTinDatVe => ({
    type: GET_TICKET_INFO,
    payload: thongTinDatVe
})

export const editUser = (updatedInfo, history) => {
    return dispatch => {
        axios({
            url: `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method: 'PUT',
            data: updatedInfo
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'CẬP NHẬT THÔNG TIN THÀNH CÔNG !!!',
                }).then(res => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'VUI LÒNG ĐĂNG NHẬP LẠI !!!',
                    })
                })
                const mapping = {
                    ...res.data,
                    matKhau: ''
                }
                dispatch(actLogin(mapping))
                history.push('/login')
            })
    }
}

import axios from 'helpers/axios'
import { LOGIN, REGISTER } from './types'
import Swal from 'sweetalert2'


export const login = (userInfo, history) => {
    return dispatch => {
        axios({
            url: '/api/QuanLyNguoiDung/DangNhap',
            method: 'POST',
            data: userInfo
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: `Chào mừng ${res.data.hoTen}`,
                })
                dispatch(actLogin(res.data))
                history.push('/')
                localStorage.setItem('access_token', res.data.accessToken)
                axios.defaults.headers['Authorization'] = `Bearer ${res.data.accessToken}`
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sai thông tin đăng nhập',
                    text: 'Có vẻ bạn đã nhập sai TÀI KHOẢN hoặc MẬT KHẨU !',
                })
            })
    }
}

export const actLogin = (credential) => ({
    type: LOGIN,
    payload: credential
})




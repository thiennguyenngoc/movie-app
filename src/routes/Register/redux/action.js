import axios from 'helpers/axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';



export const register = (regisInfo, history) => {
    const mapping = {
        ...regisInfo,
        maNhom: 'GP01',
        maLoaiNguoiDung: 'KhachHang'
    }

    return dispatch => {
        axios({
            url: '/api/QuanLyNguoiDung/DangKy',
            method: 'POST',
            data: mapping
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công',
                })
                console.log(res)
                
                history.push('/login')
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'TÀI KHOẢN hoặc EMAIL đã được sử dụng !',
                  })
            })
    }
}
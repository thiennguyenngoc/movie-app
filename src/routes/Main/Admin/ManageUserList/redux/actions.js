import axios from 'helpers/axios'
import Swal from 'sweetalert2'
import { GET_ALL_USER_INFO, GET_INFO_BY_USER_NAME, GET_USER_TYPES } from './types'

export const getAllUserInfo = (pageNumber = 1) => {
    return dispatch => {
        axios({
            url: `api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${pageNumber}&soPhanTuTrenTrang=15`,
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetAllUserInfo(res.data))
            })
    }
}
export const getUserByKeyword = (keyWord = '') => {
    return dispatch => {
        axios({
            url: `api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keyWord}&soTrang=1&soPhanTuTrenTrang=15`,
            method: 'GET'
        })
            .then(res => {
                console.log(res)
                dispatch(actGetAllUserInfo(res.data))
            })
    }
}

export const actGetAllUserInfo = allUserList => ({
    type: GET_ALL_USER_INFO,
    payload: allUserList
})

export const deleteUserByAdmin = taiKhoan => {
    return dispatch => {
        axios({
            url: `api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method: 'DELETE'
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'ĐÃ XÓA NGƯỜI DÙNG',
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'KHÔNG THỂ XÓA NGƯỜI DÙNG ĐÃ ĐẶT VÉ',
                })
            })
    }
}

export const getUserTypes = () => {
    return dispatch => {
        axios({
            url: 'api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung',
            method: 'GET'
        })
            .then(res => {
                dispatch(actGetUserType(res.data))
            })
    }
}

export const actGetUserType = types => ({
    type: GET_USER_TYPES,
    payload: types
})

export const updateUserInfo = (updatedInfo, history) => {
    return dispatch => {
        axios({
            url: '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            method: 'PUT',
            data: updatedInfo
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'CẬP NHẬT THÔNG TIN THÀNH CÔNG',
                })
                history.push('/admin')
            })
            .catch(res => {
                Swal.fire({
                    icon: 'warning',
                    title: 'VUI LÒNG CHỌN LOẠI NGƯỜI DÙNG',
                })
            })
    }
}

export const addUserInfo = (newInfo, history) => {
    return dispatch => {
        axios({
            url: '/api/QuanLyNguoiDung/ThemNguoiDung',
            method: 'POST',
            data: newInfo
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: `Thêm người dùng thành công`,
                })

                history.push('/admin')
            })
    }
}
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import CommonUserForm from '../../components/CommonUserForm/CommonUserForm'
import { getUserTypes, updateUserInfo } from '../../redux/actions'
import axios from 'helpers/axios'
import { Loading } from 'components/Loading/Loading'

export default function EditUserContainer() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const loading = useRef()

    const userTypes = useSelector(state => state.adminGetUserList.userTypes)

    const [info, setInfo] = useState({
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        email: '',
        soDt: '',
        maNhom: '',
        maLoaiNguoiDung: ''
    })

    const fetchUserDetail = useCallback(() => {
        loading.current.show()
        axios({
            url: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            data: { "taiKhoan": params.taiKhoan }
        })
            .then(res => {
                setInfo(prevInfo => ({
                    ...prevInfo,
                    taiKhoan: res.data.taiKhoan,
                    matKhau: res.data.matKhau,
                    hoTen: res.data.hoTen,
                    email: res.data.email,
                    soDt: res.data.soDT,
                    maNhom: res.data.maNhom,
                }))
            })
            .finally(loading.current.hide)
    },
        [params.taiKhoan],
    )

    useEffect(() => {
        dispatch(getUserTypes())
        fetchUserDetail()
    }, [dispatch, fetchUserDetail])

    const submit = useCallback(
        () => {
            dispatch(updateUserInfo(info, history))
        },
        [dispatch, history, info],
    )

    return (
        <div>
            <CommonUserForm
                title='CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG'
                info={info}
                setInfo={newInfo => setInfo({ ...info, ...newInfo })}
                userTypes={userTypes}
                btnFunc='Cập nhật thông tin'
                submit={submit}
            />
            <Loading ref={loading} />
        </div>
    )
}

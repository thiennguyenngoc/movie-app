import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CommonUserForm from '../../components/CommonUserForm/CommonUserForm'
import { addUserInfo, getUserTypes } from '../../redux/actions'

export default function AddUserContainer() {
    const dispatch = useDispatch()
    const history = useHistory()

    const userTypes = useSelector(state => state.adminGetUserList.userTypes)

    const [info, setInfo] = useState({
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        email: '',
        soDt: '',
        maNhom: 'GP01',
        maLoaiNguoiDung: ''
    })

    useEffect(() => {
        dispatch(getUserTypes())
    }, [dispatch])

    const submit = useCallback(
        () => {
            dispatch(addUserInfo(info, history))
        }, [dispatch, history, info],
    )

    return (
        <div>
            <CommonUserForm
                title='THÊM NGƯỜI DÙNG'
                info={info}
                setInfo={newInfo => setInfo({ ...info, ...newInfo })}
                userTypes={userTypes}
                btnFunc='Thêm người dùng'
                submit={submit}
            />
        </div>
    )
}

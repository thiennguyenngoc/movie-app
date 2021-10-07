import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import CustomerInfors from './CustomerInfors'
import { useDispatch } from 'react-redux'
import { getAllInformations } from './redux/actions'
import { Loading } from 'components/Loading/Loading'

export default function CustomerInforsContainer() {
    const loading = useRef()

    const userInfors = useSelector(state => state.users.credential)
    const thongTinDatVe = useSelector(state => state.ticketInfors.thongTinDatVe.thongTinDatVe)
    const matKhau = useSelector(state => state.ticketInfors.thongTinDatVe.matKhau)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllInformations(userInfors.taiKhoan, loading))
    }, [dispatch, userInfors.taiKhoan])

    return (
        <div>
            <CustomerInfors
                userInfors={userInfors}
                thongTinDatVe={thongTinDatVe}
                matKhau={matKhau}
            />
            <Loading ref={loading} />
        </div>
    )
}

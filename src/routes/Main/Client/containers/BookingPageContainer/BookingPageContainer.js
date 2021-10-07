import React, { useEffect, useRef, useCallback } from 'react'
import BookingPage from '../../components/BookingPage/BookingPage'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingInfo, booking } from '../../redux/BookingPageRedux/actions'
import Swal from 'sweetalert2'
import { Loading } from 'components/Loading/Loading'

export default function BookingPageContainer() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const loading = useRef()

    const danhSachGhe = useSelector(state => state.booking.danhSachGhe)
    const thongTinPhim = useSelector(state => state.booking.thongTinPhim)
    const taiKhoanNguoiDung = useSelector(state => state.users.credential.taiKhoan)

    useEffect(() => {
        dispatch(getBookingInfo(params.maLichChieu, loading))
    }, [dispatch, params.maLichChieu])

    const [total, reservedSeat, danhSachVe] = danhSachGhe.reduce((choosingInfo, item, index) => {
        if (item.isChoosing) {
            choosingInfo[0] += item.giaVe
            choosingInfo[1].push(<h6 key={index} className='m-1'>{item.tenGhe}</h6>)
            choosingInfo[2].push({
                maGhe: item.maGhe,
                giaVe: item.giaVe
            })
        }
        return choosingInfo
    }, [0, [], []])

    const bookTicket = useCallback(
        () => {
            dispatch(booking({
                maLichChieu: params.maLichChieu,
                danhSachVe,
                taiKhoanNguoiDung
            }, history))
        },
        [danhSachVe, dispatch, history, params.maLichChieu, taiKhoanNguoiDung],
    )

    return (
        <div>
            <BookingPage
                danhSachGhe={danhSachGhe}
                thongTinPhim={thongTinPhim}
                bookTicket={bookTicket}
                total={total}
                reservedSeat={reservedSeat}
            />
            <Loading ref={loading} />
        </div>
    )
}

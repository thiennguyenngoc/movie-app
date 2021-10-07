import React, { useState } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { useHistory } from 'react-router'
import '../../assets/SearchingSection.scss'
import ticket from 'assets/images/icon-ticket.png'
import diamond from 'assets/images/bg-diamond1.png'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'


export default function SearchingSection({ searchingInfo }) {
    const history = useHistory()

    const [movieName, setMovieName] = useState('')
    const [theaterName, setTheaterName] = useState('')
    const [date, setDate] = useState('')
    const [scheduleId, setScheduleId] = useState('')

    const user = useSelector(state => state.users.credential)

    const sendMovieNameToState = name => {
        setMovieName(name)
    }

    const sendTheaterNameToState = theaterName => {
        setTheaterName(theaterName)
    }

    const sendDateToState = (date) => {
        setDate(date)
    }

    const sendMaLichChieu = scheduleId => {
        setScheduleId(scheduleId)
    }

    const hdToBooking = () => {
        if (user.accessToken) {
            history.push(`${scheduleId}/chitietphongve`)
        } else {
            Swal.fire({
                title: 'Vui lòng đăng nhập',
                showCancelButton: true,
                cancelButtonText: 'Hủy',
                cancelButtonColor: '#ff0000',
                confirmButtonText: 'Đăng nhập',
                confirmButtonColor: '#ff5e01'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/login')
                }
            })
        }
    }

    return (
        <div className='searchingSection'>
            <div className='fastBooking'>
                <img src={ticket} />
                <h1>ĐẶT VÉ NHANH</h1>
            </div>
            <div className='searchingWrapper'>
                <div className='form-group'>
                    <select
                        className='form-control'
                        onChange={e => sendMovieNameToState(e.target.value)}
                    >
                        <option>Chọn tên phim</option>
                        {
                            _.map(searchingInfo, info => {
                                return info.lstCumRap.map(cumRap => {
                                    return cumRap.danhSachPhim.map((phim, index) => (
                                        <option key={index} value={phim.tenPhim}>{phim.tenPhim}</option>
                                    ))
                                })
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <select
                        className='form-control'
                        onChange={e => sendTheaterNameToState(e.target.value)}
                    >
                        <option>Chọn cụm rạp</option>
                        {
                            _.map(searchingInfo, info => {
                                return info.lstCumRap.map((cumRap, index) => {
                                    return movieName && (
                                        <option key={index}>{cumRap.tenCumRap}</option>
                                    )
                                })
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <select
                        className='form-control'
                        onChange={e => sendDateToState(e.target.value)}>
                        <option>Chọn ngày chiếu</option>
                        {
                            _.map(searchingInfo, info => {
                                return info.lstCumRap.map(cumRap => {
                                    return cumRap.tenCumRap === theaterName && (
                                        cumRap.danhSachPhim.map(phim => {
                                            return phim.tenPhim === movieName && (
                                                _.map(_.uniq(_.map(phim.lstLichChieuTheoPhim, lichChieu => moment(lichChieu.ngayChieuGioChieu).format('DD/MM'))), (date, index) => {
                                                    return <option key={index}>{date}</option>
                                                })
                                            )
                                        })
                                    )
                                })
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <select
                        className='form-control'
                        onChange={e => sendMaLichChieu(e.target.value)}>
                        <option>Chọn suất chiếu</option>
                        {
                            _.map(searchingInfo, info => {
                                return info.lstCumRap.map(cumRap => {
                                    return cumRap.tenCumRap === theaterName && (
                                        cumRap.danhSachPhim.map(phim => {
                                            return phim.tenPhim === movieName && (
                                                phim.lstLichChieuTheoPhim.map((lichChieu, index) => {
                                                    return moment(lichChieu.ngayChieuGioChieu).format('DD/MM') === date && (
                                                        <option key={index} value={lichChieu.maLichChieu}>{moment(lichChieu.ngayChieuGioChieu).format('HH:mm')}</option>
                                                    )
                                                })
                                            )
                                        })
                                    )
                                })
                            })
                        }
                    </select>
                </div>
            </div>

            <button disabled={scheduleId ? false : true} className='btn btn-warning searchingBtn' onClick={() => hdToBooking()}>Đặt vé</button>

        </div>
    )
}



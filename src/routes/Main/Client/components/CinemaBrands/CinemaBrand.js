import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import '../../assets/CinemaBrands.scss'
import _ from 'lodash'
import Aos from 'aos'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export default function CinemaBrand({ brands, details = [], schedule, getCinemaDetail, getSchedule }) {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])


    const [maCumRap, setMaCumRap] = useState('bhd-star-cineplex-bitexco')
    const [isCumRapClicked, setCumRapClicked] = useState('bhd-star-cineplex-bitexco')

    const [maHeThongRap, setMaHeThongRap] = useState("BHDStar")

    const user = useSelector(state => state.users.credential)

    const history = useHistory()

    const onHandleClicked = (maHeThongRap) => {
        // brands.forEach(item => {
        //     item.isClicked = item.maHeThongRap === maHeThongRap
        // })
        setMaHeThongRap(maHeThongRap)
        getCinemaDetail(maHeThongRap)

        getSchedule(maHeThongRap)
    }

    const sendMHT = (maHeThong, maCumRap) => {
        getSchedule(maHeThong)
        setMaCumRap(maCumRap)

        //isClicked
        setCumRapClicked(maCumRap)
    }

    const hdToBooking = (maLichChieu) => {
        if (user.accessToken) {
            history.push(`/${maLichChieu}/chitietphongve`)
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
        <div id='cinemaList' className='row' data-aos='fade-up'>
            <div id='cinema-brands-wrapper' className='col-xl-2 col-lg-12 col-md-12 cinemaBrands__wrapper'>
                <h2>Cụm rạp</h2>
                {
                    _.map(brands, item => {
                        return (
                            <div
                                className={`cinemaBrands ${maHeThongRap === item.maHeThongRap ? 'logoClicked' : ''}`}
                                key={item.biDanh}
                                onClick={() => onHandleClicked(item.maHeThongRap)}
                            >
                                <img src={item.logo} alt='Cinema Logo' />
                            </div>
                        )
                    })
                }
            </div>
            <div id='cinema-location-wrapper' className='col-xl-5 col-lg-6 col-md-6 cinemaLocation__wrapper'>
                <h2>Chọn rạp</h2>
                {
                    _.map(details.lstCumRap, info => {
                        return (
                            <div
                                key={info.maCumRap}
                                className={`cinemaLocation d-flex justify-content-left ${isCumRapClicked === info.maCumRap ? 'clicked' : ''}`}
                                title={info.diaChi}
                                onClick={() => sendMHT(details.maHeThongRap, info.maCumRap)}
                            >
                                <div>
                                    <img src={details.logo} />
                                </div>
                                <div className='w-100 ml-3'>
                                    <p>{info.tenCumRap}</p>
                                    <p>{info.diaChi}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div id='schedule-wrapper' className='col-xl-5 col-lg-6 col-md-6 schedule__wrapper'>
                <h2>Chọn lịch chiếu</h2>
                {
                    _.map(schedule, (scheduleItem, index) => {
                        return scheduleItem.maCumRap === maCumRap && (
                            <div key={index}>
                                {
                                    _.map(scheduleItem.danhSachPhim, movie => {
                                        return (
                                            <div key={movie.maPhim} className='row mt-3 schedule__area'>
                                                <div className='schedule__picture col-lg-5 col-md-12 col-sm-12'>
                                                    <img src={movie.hinhAnh} alt={movie.tenPhim} />
                                                    <div className='d-flex'>
                                                        <button className='mr-2'>2D Digital</button>
                                                        <button onClick={() => history.push(`/${movie.maPhim}/chitietphim`)}>Chi tiết</button>
                                                    </div>
                                                </div>
                                                <div className='schedule__time col-lg-7 col-md-12 col-sm-12'>
                                                    <p className='movieTitle'>{movie.tenPhim}</p>
                                                    <span>Lịch chiếu:</span>
                                                    <div className='row'>
                                                        {
                                                            _.map(movie.lstLichChieuTheoPhim, (time, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className='schedule__button col-lg-4 col-md-4 col-sm-6'
                                                                        onClick={() => hdToBooking(time.maLichChieu)}>
                                                                        <p>{moment(`${time.ngayChieuGioChieu}`).format('HH:mm')}</p>
                                                                        <p>~</p>
                                                                        <p>{moment(`${time.ngayChieuGioChieu}`).format('DD/MM')}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



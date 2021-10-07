import React, { useState } from 'react'
import moment from 'moment'
import bgImg from 'assets/images/movie-list-bg.jpg'
import './assets/MovieDetail.scss'
import { useHistory } from 'react-router'
import _ from 'lodash'
import ModalVideo from 'react-modal-video'
import { Link as ScrollLink } from 'react-scroll'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export default function MovieDetail({ detail }) {
    const [isOpen, setOpen] = useState(false)
    const [heThong, setHeThong] = useState('')
    const [availableDates, setAvailableDates] = useState('')
    const [theaterInfo, setTheaterInfo] = useState('')
    const [chosenDate, setChoosenDate] = useState('')

    const history = useHistory()

    const user = useSelector(state => state.users.credential)


    const sendSystem = (system) => {
        detail.heThongRapChieu.forEach(item => (
            item.isActivated = item.maHeThongRap === system.maHeThongRap
        ))

        setHeThong(system)
        setAvailableDates('')
        setTheaterInfo('')
    }

    const sendDateAndInfo = (date) => {
        setAvailableDates(date)
        setChoosenDate(date)
    }

    const hdToBooking = maLichChieu => {
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
        <div className='movieDetail__wrapper' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='container movieDetail__content'>
                <div className='row'>
                    <div className='col-lg-5 col-md-12 movieDetail__wrapper-direct-01'>
                        <img src={detail.hinhAnh} />
                        <div>
                            <ScrollLink to='available-schedule' smooth={true} duration={1000}><button className='mr-3'>ĐẶT VÉ</button></ScrollLink>
                            <ModalVideo
                                className='modalVideo'
                                isOpen={isOpen}
                                onClose={() => setOpen(false)}
                            >
                                <iframe width="790" height="444" src={detail.trailer} ></iframe>
                            </ModalVideo>
                            <button onClick={() => setOpen(true)}>TRAILER</button>
                        </div>
                    </div>
                    <div className='col-lg-7 col-md-12 movieDetail__wrapper-direct-02'>
                        <h1>{detail.tenPhim}</h1>
                        <div className='format'>2D Digital</div>
                        <p><span className='introduce'>Nội dung phim:</span> {detail.moTa}</p>
                        <p><span className='introduce'>Đạo diễn: </span>Cate Shortland</p>
                        <p><span className='introduce'>Thể loại: </span>Hành động, phiêu lưu, khoa học viễn tưởng</p>
                        <p><span className='introduce'>Ngày khởi chiếu: </span>{moment(detail.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                        <p><span className='introduce'>Thời lượng: </span>120 phút</p>
                        <p><span className='introduce'>Phụ đề: </span>Tiếng Việt</p>
                        <p><span className='introduce'>Đánh giá: </span>{detail.danhGia}/10</p>
                    </div>
                </div>
            </div>
            <h2 className='notice'>Vui lòng chọn rạp và ngày chiếu</h2>
            <div id='available-schedule' className=' bg-light mt-5 row availableSchedule' >
                <div className='col-lg-4 col-md-12 availableSchedule__inside-left'>
                    {
                        _.map(detail.heThongRapChieu, (system, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`availableTheater d-flex align-items-center ${system.isActivated ? 'clicked' : ''} `}
                                    onClick={() => sendSystem(system)}
                                >
                                    <img src={system.logo} alt="Theater's logo" />
                                    <p className='ml-3'>{system.tenHeThongRap}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='col-lg-8 col-md-12 availableSchedule__inside-right'>
                    <div className='availableSchedule__inside-right-above'>
                        {
                            _.map(heThong.cumRapChieu, (info, index) => {
                                return (
                                    <div key={index} className='availableDate'>
                                        {
                                            _.map(_.uniq(_.map(info.lichChieuPhim, item => moment(item.ngayChieuGioChieu).format('DD-MM'))), (date, index) => {
                                                return (
                                                    <p key={index} className={`${date === chosenDate ? 'chose' : ''}`} onClick={() => sendDateAndInfo(date, info, index)}>{date}</p>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='availableSchedule__inside-right-below'>
                        {
                            _.map(heThong.cumRapChieu, (info, index) => {
                                return (
                                    <div key={index}>
                                        <div className='insideRightBelow d-flex text-left mt-3'>
                                            <img src={heThong.logo} />
                                            <div className='insideRightBelow__names'>
                                                <p className='systemName'>{heThong.tenHeThongRap}</p>
                                                <p className='clusterName'>{info.tenCumRap}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex bookingBtn'>
                                            {
                                                _.map(info.lichChieuPhim, item => {
                                                    return moment(item.ngayChieuGioChieu).format('DD-MM') === availableDates &&
                                                        <div key={item.maLichChieu} className='canBeSelectedHours'>
                                                            <p onClick={() => hdToBooking(item.maLichChieu)}>{moment(item.ngayChieuGioChieu).format('HH:mm')}</p>
                                                        </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

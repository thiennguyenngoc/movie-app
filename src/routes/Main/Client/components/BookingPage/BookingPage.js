import React, { useState } from 'react'
import _ from 'lodash'
import '../../assets/BookingPage.scss'
import Seats from './Seats';
import screen from 'assets/images/screen.png'
import bgImg from 'assets/images/movie-list-bg.jpg'
import WeekendIcon from '@material-ui/icons/Weekend';

export default function BookingPage({ danhSachGhe, thongTinPhim, bookTicket, total, reservedSeat }) {
    return (
        <div className='container-fluid bookingPageBackground' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='row'>
                <div className='seatInfo col-lg-8 col-md-12'>
                    <div><img src={screen} /></div>
                    {
                        _.map(danhSachGhe, (ghe, index) => {

                            return (
                                <React.Fragment key={index}>
                                    <Seats ghe={ghe} />
                                    {(index + 1) % 16 === 0 && <br />}
                                </React.Fragment>
                            )
                        })
                    }
                    <div className='d-flex justify-content-center mt-3'>
                        <div className='mr-2'><WeekendIcon className='noteThuong'></WeekendIcon>Ghế thường</div>
                        <div className='mr-2'><WeekendIcon className='noteVIP'></WeekendIcon> Ghế VIP</div>
                        <div><WeekendIcon className='noteBooked'></WeekendIcon> Ghế đã đặt</div>
                    </div>
                </div>
                <div className='bookingInfo col-lg-4 col-md-12'>
                    <div>
                        <div><img src={thongTinPhim.hinhAnh} width={300} height={300} /></div>
                        <div className='bookingInfo__inside'>
                            <h2>{thongTinPhim.tenPhim}</h2>
                            <h6>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</h6>
                            <h5>{thongTinPhim.tenCumRap}</h5>
                            <p>{thongTinPhim.diaChi}</p>
                            <p className='gheDangDat'>Ghế đang đặt:</p>
                            <div id='choosingSeat'>{reservedSeat}</div>
                            <p id='total'>Tổng tiền: {total.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}</p>
                            <button onClick={bookTicket}>Đặt vé</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

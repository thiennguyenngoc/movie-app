import React, { useState } from 'react'
import { useHistory } from 'react-router';
import _ from 'lodash'
import TextField from "@material-ui/core/TextField";
import { DateTimePicker, DatePicker } from 'components'
import moment from 'moment';
import bg from 'assets/images/admin-bg.jpg'
import '../../assets/CreateSchedule.scss'

export default function CreateSchedule({ maPhim, detail, theaterList, getTheaterCluster, clustersList, createNewSchedule }) {
    const history = useHistory()

    const [tenCumRap, setTenCumRap] = useState('')
    const [lichChieu, setLichChieu] = useState({
        maPhim: maPhim
    })

    const submitForm = (e) => {
        e.preventDefault()
        createNewSchedule(lichChieu)
    }

    return (
        <div id='createScheduleBackground' style={{ backgroundImage: `url(${bg})` }}>
            <h1 id=''>Tạo lịch chiếu cho phim <span>{detail.tenPhim}</span></h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="maPhim">Mã phim</label>
                    <input
                        className="form-control"
                        id='maPhim'
                        type='text'
                        value={maPhim}
                        disabled={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tenHeThongRap">Tên hệ thống rạp</label>
                    <select
                        className="form-control"
                        onChange={e => getTheaterCluster(e)}>
                        {
                            _.map(theaterList, (theater, index) => (
                                <option key={index} value={theater.maHeThongRap}>{theater.maHeThongRap}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tenCumRap">Tên cụm rạp</label>
                    <select
                        className="form-control"
                        id='tenCumRap'
                        onClick={e => setTenCumRap(e.target.value)}>
                        <option>Chọn tên cụm rạp</option>
                        {
                            _.map(clustersList, (cluster, index) => (
                                <option key={index} value={cluster.tenCumRap}>{cluster.tenCumRap}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="maRap">Mã rạp</label>
                    <select
                        className="form-control"
                        id='maRap'
                        onClick={(e) => setLichChieu({ ...lichChieu, maRap: e.target.value })}>
                        <option>Chọn mã rạp</option>
                        {
                            _.map(clustersList, cluster => {
                                return cluster.tenCumRap === tenCumRap &&
                                    (
                                        _.map(cluster.danhSachRap, (info, index) => {
                                            return (
                                                <option key={index} value={info.maRap}>{info.maRap}</option>
                                            )
                                        })
                                    )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="datetime-local">Ngày giờ chiếu</label>
                    <TextField
                        className='form-control'
                        id="datetime-local"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={(e) => setLichChieu({ ...lichChieu, ngayChieuGioChieu: moment(e.target.value).format('DD/MM/yyyy hh:mm:ss') })}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="ngay-gio-chieu">Ngày và giờ chiếu</label>
                    <DateTimePicker
                        className='form-control datePicker'
                        id='ngay-gio-chieu'
                        cb={e => console.log(e.value)}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="giaVe">Giá vé</label>
                    <input
                        type="text"
                        className="form-control"
                        id="giaVe"
                        onChange={(e) => setLichChieu({ ...lichChieu, giaVe: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-danger' onClick={() => history.goBack()}>Hủy bỏ</button>
                    <button className='btn btn-success'>Tạo lịch chiếu</button>
                </div>
            </form>
        </div>
    )
}

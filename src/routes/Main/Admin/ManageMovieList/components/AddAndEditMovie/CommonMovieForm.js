import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DateTimePicker, DatePicker } from 'components'
import bg from 'assets/images/admin-bg.jpg'
import { useHistory } from 'react-router';
import '../../assets/CommonMovieForm.scss'


export default function CommonMovieForm({ title, btn, movieForm, setMovieForm, submit, initNgayKhoiChieu }) {
    const history = useHistory()
    const [preview, setPreview] = useState(null)

    const onHandleChooseFile = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setMovieForm({ hinhAnh: e.target.files[0] })
    }

    return (
        <div id='commonMovieFormBackground' style={{ backgroundImage: `url(${bg})` }}>
            <h1 className='text-center'>{title}</h1>

            <div className="form-group">
                <label htmlFor="ten-phim">Tên phim</label>
                <input
                    type="text"
                    className="form-control"
                    id="ten-phim"
                    value={movieForm.tenPhim}
                    onChange={e => setMovieForm({ tenPhim: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bi-danh">Bí danh</label>
                <input
                    type="text"
                    className="form-control"
                    id="bi-danh"
                    value={movieForm.biDanh}
                    onChange={e => setMovieForm({ biDanh: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="trailer">Trailer</label>
                <input
                    type="text"
                    className="form-control"
                    id="trailer"
                    value={movieForm.trailer}
                    onChange={e => setMovieForm({ trailer: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mo-ta">Mô tả phim</label>
                <textarea
                    rows="5"
                    value={movieForm.moTa}
                    className="form-control"
                    id="mo-ta"
                    onChange={e => setMovieForm({ moTa: e.target.value })}>
                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="ngay-khoi-chieu">Ngày khởi chiếu</label>
                <DatePicker
                    className='form-control datePicker'
                    id='ngay-khoi-chieu'
                    cb={e => setMovieForm({ ngayKhoiChieu: e.value })}
                    value={moment(initNgayKhoiChieu).format('DD/MM/YYYY HH:mm')} />
            </div>
            <div className="form-group">
                <label htmlFor="danh-gia">Đánh giá</label>
                <input
                    type="text"
                    className="form-control"
                    id="danh-gia"
                    value={movieForm.danhGia}
                    onChange={e => setMovieForm({ danhGia: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="hinh-anh">Chọn hình ảnh phim</label>
                <input
                    type="file"
                    className="form-control"
                    id="hinh-anh"
                    onChange={e => onHandleChooseFile(e)}
                />
            </div>
            <div className='form-group'>
                {
                    preview ? <img id='previewImg' src={preview} alt='movie picture' /> : <img id='previewImg' src={movieForm.hinhAnh} alt='movie picture' />
                }
            </div>
            <div className='form-group btnSection'>
                <button className='btn btn-danger' onClick={() => history.goBack()}>Hủy bỏ</button>
                <button className='btn btn-success' onClick={submit}>{btn}</button>
            </div>
        </div>
    )
}

import React from 'react'
import _ from 'lodash'
import { useHistory } from 'react-router';
import bg from 'assets/images/admin-bg.jpg'
import '../../assets/CommonUserForm.scss'

export default function EditUser({ title, info, userTypes, setInfo, btnFunc, submit }) {
    const history = useHistory()

    return (
        <div id='commonUserFormBackground' style={{ backgroundImage: `url(${bg})` }}>
            <h1>{title}</h1>
            <div className="form-group">
                <label htmlFor="ho-ten">Họ và tên</label>
                <input
                    type="text"
                    className="form-control"
                    id="ho-ten"
                    value={info.hoTen}
                    onChange={(e) => setInfo({ hoTen: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="tai-khoan">Tài khoản</label>
                <input
                    type="text"
                    className="form-control"
                    id="tai-khoan"
                    value={info.taiKhoan}
                    onChange={(e) => setInfo({ taiKhoan: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mat-khau">Mật khẩu</label>
                <input
                    type="text"
                    className="form-control"
                    id="mat-khau"
                    value={info.matKhau}
                    onChange={(e) => setInfo({ matKhau: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={info.email}
                    onChange={(e) => setInfo({ email: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="sdt">Số điện thoại</label>
                <input
                    type="text"
                    className="form-control"
                    id="sdt"
                    value={info.soDt}
                    onChange={(e) => setInfo({ soDt: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="loaiNguoiDung">Loại người dùng</label>
                <select
                    className="form-control"
                    id='loaiNguoiDung'
                    onChange={(e) => setInfo({ maLoaiNguoiDung: e.target.value })}>
                    <option>CHỌN LOẠI NGƯỜI DÙNG</option>
                    {
                        _.map(userTypes, (type, index) => (
                            <option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group btnSection">
                <button className='btn btn-danger' onClick={() => history.goBack()}>Hủy bỏ</button>
                <button className='btn btn-success' onClick={submit}>{btnFunc}</button>
            </div>
        </div >
    )
}

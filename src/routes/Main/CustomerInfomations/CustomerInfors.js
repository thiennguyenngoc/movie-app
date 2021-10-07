import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { Tabs } from "antd";
import './assets/CustomerInfors.scss'
import bgImg from 'assets/images/movie-list-bg.jpg'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { editUser } from './redux/actions'
import axios from 'helpers/axios'

const { TabPane } = Tabs;

function CustomerInfors({ userInfors, thongTinDatVe, matKhau, location }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const [isConfirm, setConfirm] = useState(true)

    const hdTabClick = useCallback(
        (activeKey) => {
            history.push('/thongtinnguoidung' + activeKey)
        },
        [history],
    )

    return (
        <div className='background' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='container formWrapper'>
                <Tabs tabPosition="left" activeKey={location.hash || '#thongtin'} onChange={hdTabClick} >
                    <TabPane tab="THÔNG TIN TÀI KHOẢN" key="#thongtin">
                        <Formik
                            initialValues={{ hoTen: userInfors.hoTen, taiKhoan: userInfors.taiKhoan, email: userInfors.email, soDt: userInfors.soDT }}
                            validationSchema={Yup.object().shape({
                                hoTen: Yup.string().required("Vui lòng nhập tên người dùng"),
                                taiKhoan: Yup.string().required("Vui lòng nhập tên tài khoản"),
                                email: Yup.string()
                                    .email("Email không hợp lệ")
                                    .required("Vui lòng nhập email"),
                                soDt: Yup.string()
                                    .matches(/^[0-9]*$/, 'Vui lòng nhập đúng số điện thoại')
                                    .required("Vui lòng nhập số điện thoại"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                Swal.fire({
                                    title: 'Vui lòng nhập mật khẩu',
                                    input: 'password',
                                    inputAttributes: {
                                        autocapitalize: 'off'
                                    },
                                    showCancelButton: true,
                                    confirmButtonText: 'Xác nhận',
                                    confirmButtonColor: '#ec7532',
                                    cancelButtonText: 'Hủy',
                                    cancelButtonColor: '#ff0000',
                                    showLoaderOnConfirm: true,
                                    preConfirm: (password) => {
                                        if (password === matKhau) {
                                            axios({
                                                url: '/api/QuanLyNguoiDung/DangNhap',
                                                method: 'POST',
                                                data: { 'taiKhoan': values.taiKhoan, 'matKhau': password }
                                            })
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        dispatch(editUser({
                                                            "taiKhoan": values.taiKhoan,
                                                            "matKhau": password,
                                                            "email": values.email,
                                                            "soDt": values.soDt,
                                                            "maNhom": "GP01",
                                                            "maLoaiNguoiDung": "KhachHang",
                                                            "hoTen": values.hoTen
                                                        }, history))
                                                        localStorage.setItem('access_token', res.data.accessToken)
                                                        axios.defaults.headers['Authorization'] = `Bearer ${res.data.accessToken}`
                                                    }
                                                })
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'VUI LÒNG NHẬP ĐÚNG MẬT KHẨU !',
                                            })
                                        }
                                    }
                                })
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => {
                                const names = [
                                    {
                                        name: 'hoTen',
                                        placeholder: 'Họ tên'
                                    },
                                    {
                                        name: 'taiKhoan',
                                        placeholder: 'Tài khoản',
                                        disable: true
                                    },
                                    {
                                        name: 'email',
                                        placeholder: 'Email'
                                    },
                                    {
                                        name: 'soDt',
                                        placeholder: 'Số điện thoại'
                                    }
                                ]
                                return (
                                    <Form className='w-75 mx-auto'>
                                        {
                                            names.map((item, index) => (
                                                <div key={index} className='form-group mb-2'>
                                                    <label htmlFor={item.name}>{item.placeholder}</label>
                                                    <input
                                                        type="text"
                                                        name={item.name}
                                                        id={item.name}
                                                        disabled={item.disable}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[item.name]}
                                                        className={`form-control ${errors[item.name] && touched[item.name] && "form-control is-invalid"}`}
                                                        placeholder={item.placeholder}
                                                        autoComplete='off'
                                                    />
                                                    {errors[item.name] && touched[item.name] && <div className="invalid-feedback">{errors[item.name]}</div>}
                                                </div>
                                            ))
                                        }
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" onClick={() => setConfirm(!isConfirm)} />
                                                Xác nhận thay đổi thông tin
                                            </label>
                                        </div>
                                        <button disabled={isConfirm} className="btn btn-success w-100 mt-3" type="submit">
                                            Cập nhật thông tin
                                        </button>

                                    </Form>
                                )
                            }}
                        </Formik>
                    </TabPane>
                    <TabPane tab="DANH SÁCH ĐẶT VÉ" key="#vedadat">
                        <div>
                            <table className="table bookingList">
                                <thead>
                                    <tr>
                                        <th>Tên phim</th>
                                        <th>Ngày đặt</th>
                                        <th>Giá vé</th>
                                        <th>Hệ thống rạp</th>
                                        <th>Rạp</th>
                                        <th>Số ghế</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        _.map(thongTinDatVe, (thongTin, index) => (
                                            <tr key={index}>
                                                <td>{thongTin.tenPhim}</td>
                                                <td>
                                                    {moment(thongTin.ngayDat).format('DD/MM/yyyy')} <br />
                                                    {moment(thongTin.ngayDat).format('HH:ss')}
                                                </td>
                                                <td>
                                                    {(thongTin.giaVe).toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </td>
                                                <td>{thongTin.danhSachGhe[0].tenHeThongRap}</td>
                                                <td>{thongTin.danhSachGhe[0].tenCumRap}</td>
                                                <td>{thongTin.danhSachGhe.map(item => <span key={item.tenGhe} className='m-1'>{item.tenGhe}</span>)}</td>
                                                <td>
                                                    {(thongTin.giaVe * thongTin.danhSachGhe.map(item => <span key={item.tenGhe} className='m-1'>{item.tenGhe}</span>).length).toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane tab="ĐỔI MẬT KHẨU" key="#doimatkhau">
                        <Formik
                            initialValues={{ matKhau: '', matKhauMoi: '', xacNhanMatKhauMoi: '' }}
                            validationSchema={Yup.object().shape({
                                matKhau: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
                                matKhauMoi: Yup.string()
                                    .required("Vui lòng nhập mật khẩu mới")
                                    .min(6, "* Mật khẩu quá ngắn - ít nhất phải 6 ký tự.")
                                    .matches(/(?=.*[0-9])/, "* Mật khẩu phải chứa nhất một số."),
                                xacNhanMatKhauMoi: Yup.string()
                                    .required("Vui lòng nhập đúng mật khẩu mới")
                                    .oneOf([Yup.ref("matKhauMoi"), null], "Xác nhận mật khẩu không đúng"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.matKhau === matKhau) {
                                    axios({
                                        url: '/api/QuanLyNguoiDung/DangNhap',
                                        method: 'POST',
                                        data: { 'taiKhoan': userInfors.taiKhoan, 'matKhau': values.matKhau }
                                    })
                                        .then(res => {
                                            console.log(res)
                                            if (res.status === 200) {
                                                dispatch(editUser({
                                                    "taiKhoan": res.data.taiKhoan,
                                                    "matKhau": values.matKhauMoi,
                                                    "email": res.data.email,
                                                    "soDt": res.data.soDT,
                                                    "maNhom": res.data.maNhom,
                                                    "maLoaiNguoiDung": res.data.maLoaiNguoiDung,
                                                    "hoTen": res.data.hoTen
                                                }, history))
                                                localStorage.setItem('access_token', res.data.accessToken)
                                                axios.defaults.headers['Authorization'] = `Bearer ${res.data.accessToken}`
                                            }
                                        })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'VUI LÒNG NHẬP CHÍNH XÁC THÔNG TIN !',
                                    })
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => {
                                const names = [
                                    {
                                        name: 'matKhau',
                                        placeholder: 'Mật khẩu hiện tại',
                                        type: 'password'
                                    },
                                    {
                                        name: 'matKhauMoi',
                                        placeholder: 'Mật khẩu mới',
                                        type: 'password'
                                    },
                                    {
                                        name: 'xacNhanMatKhauMoi',
                                        placeholder: 'Xác nhận mật khẩu mới',
                                        type: 'password'
                                    }
                                ]
                                return (
                                    <Form className='w-75 mx-auto'>
                                        {
                                            names.map((item, index) => (
                                                <div key={index} className='form-group mb-2'>
                                                    <label htmlFor={item.name}>{item.placeholder}</label>
                                                    <input
                                                        type={item.type}
                                                        name={item.name}
                                                        id={item.name}
                                                        disabled={item.disable}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[item.name]}
                                                        className={`form-control ${errors[item.name] && touched[item.name] && "form-control is-invalid"}`}
                                                        placeholder={item.placeholder}
                                                        autoComplete='off'
                                                    />
                                                    {errors[item.name] && touched[item.name] && <div className="invalid-feedback">{errors[item.name]}</div>}
                                                </div>
                                            ))
                                        }
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" onClick={() => setConfirm(!isConfirm)} />
                                                Xác nhận thay đổi mật khẩu
                                            </label>
                                        </div>
                                        <button disabled={isConfirm} className="btn btn-success w-100 mt-3" type="submit">
                                            Cập nhật mật khẩu
                                        </button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default withRouter(CustomerInfors)

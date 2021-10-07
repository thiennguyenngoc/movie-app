import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../redux/action';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import '../assets/Login.scss'
import logo from 'assets/images/logo.svg'
import Swal from 'sweetalert2'
import _ from 'lodash'

export default function Login() {
    const dispatch = useDispatch()
    const history = useHistory()

    const toHome = () => {
        Swal.fire({
            title: 'HỦY BỎ ĐĂNG NHẬP ?',
            text: "Bạn muốn thoát khỏi trang Đăng Nhập và quay lại Trang Chủ ?",
            icon: 'warning',
            iconColor: '#ec7532',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec7532',
            cancelButtonText: 'Tiếp tục Đăng Nhập',
            confirmButtonText: 'Trở về Trang Chủ'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/')
            }
        })
    }

    return (
        <div className='loginBackground'>
            <img src={logo} alt='Logo' id='loginLogo' />
            <div className='loginForm'>
                <button id='loginCloseButton' onClick={toHome}>X</button>
                <Formik
                    initialValues={{ taiKhoan: '', matKhau: '' }}
                    validationSchema={Yup.object().shape({
                        taiKhoan: Yup
                            .string()
                            .required("* Vui lòng nhập tên tài khoản"),
                        matKhau: Yup
                            .string()
                            .required("* Vui lòng nhập mật khẩu")
                            .min(6, "* Mật khẩu quá ngắn - ít nhất phải 6 ký tự.")
                            .matches(/(?=.*[0-9])/, "* Mật khẩu phải chứa nhất một số.")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(login(values, history))
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
                                name: 'taiKhoan',
                                placeholder: 'Tài khoản',
                                type: 'text'
                            },
                            {
                                name: 'matKhau',
                                placeholder: 'Mật khẩu',
                                type: 'password'
                            }

                        ]
                        return (
                            <Form onSubmit={handleSubmit} className='formikLoginForm'>
                                {
                                    names.map((item, index) => (
                                        <div key={index} className='form-group mb-2 loginInput__wrapper'>
                                            <input
                                                id={item.name}
                                                type={item.type}
                                                name={item.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values[item.name]}
                                                className={`form-control styledInput ${errors[item.name] && touched[item.name] && "is-invalid"}`}
                                                autoComplete='off'
                                            />
                                            <label htmlFor={item.name}>{item.placeholder}</label>
                                            {errors[item.name] && touched[item.name] && <div className="invalid-feedback">{errors[item.name]}</div>}
                                        </div>
                                    ))
                                }
                                <button className="btn btn-success loginBtn" type="submit">
                                    Đăng nhập
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
                <div className='noticeToRegis'>Nếu chưa có tài khoản, <Link to='/register'>Đăng ký</Link></div>
            </div>
        </div>
    )
}

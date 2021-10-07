import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { register } from 'routes/Register/redux/action';
import { Link } from 'react-router-dom';
import '../assets/Register.scss'
import logo from 'assets/images/logo.svg'
import Swal from 'sweetalert2'



export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()

    const toHome = () => {
        Swal.fire({
            title: 'HỦY BỎ ĐĂNG KÝ ?',
            text: "Bạn muốn thoát khỏi trang Đăng Ký và quay lại Trang Chủ ?",
            icon: 'warning',
            iconColor: '#ec7532',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ec7532',
            cancelButtonText: 'Tiếp tục Đăng Ký',
            confirmButtonText: 'Trở về Trang Chủ'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/')
            }
        })
    }

    return (
        <div className='registerBackground'>
            <img src={logo} alt='Logo' id='registerLogo' />
            <div className='registerForm'>
                <button id='registerCloseButton' onClick={toHome}>X</button>
                <Formik
                    initialValues={{ hoTen: '', taiKhoan: '', matKhau: '', email: '', soDt: '' }}
                    validationSchema={Yup.object().shape({
                        hoTen: Yup.string().required("* Vui lòng nhập tên người dùng"),
                        taiKhoan: Yup.string().required("* Vui lòng nhập tài khoản"),
                        matKhau: Yup.string()
                            .required("* Vui lòng nhập mật khẩu")
                            .min(6, "* Mật khẩu quá ngắn - ít nhất phải 6 ký tự.")
                            .matches(/(?=.*[0-9])/, "* Mật khẩu phải chứa nhất một số."),
                        email: Yup.string()
                            .email("* Email không hợp lệ")
                            .required("* Vui lòng nhập email"),
                        soDt: Yup.string()
                            .matches(/^[0-9]*$/, '* Vui lòng nhập đúng số điện thoại')
                            .required("* Vui lòng nhập số điện thoại"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(register(values, history))
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
                                placeholder: 'Họ tên',
                                type: 'text'
                            },
                            {
                                name: 'taiKhoan',
                                placeholder: 'Tài khoản',
                                type: 'text'
                            },
                            {
                                name: 'matKhau',
                                placeholder: 'Mật khẩu',
                                type: 'password'
                            },
                            {
                                name: 'email',
                                placeholder: 'Email',
                                type: 'text'
                            },
                            {
                                name: 'soDt',
                                placeholder: 'Số điện thoại',
                                type: 'text'
                            }
                        ]
                        return (
                            <Form onSubmit={handleSubmit} className='formikRegisterForm'>
                                {
                                    names.map((item, index) => (
                                        <div key={index} className='form-group mb-2 registerInput__wrapper'>
                                            <input
                                                type={item.type}
                                                name={item.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values[item.name]}
                                                className={`form-control styledInput ${errors[item.name] && touched[item.name] && "form-control is-invalid"}`}
                                                autoComplete='off'
                                            />
                                            <label htmlFor={item.name}>{item.placeholder}</label>
                                            {errors[item.name] && touched[item.name] && <div className="invalid-feedback">{errors[item.name]}</div>}
                                        </div>
                                    ))
                                }
                                <button className="btn btn-success registerBtn" type="submit">
                                    Đăng ký
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
                <p className='noticeLogin'>Nếu đã có tài khoản, <Link to='/login'>Đăng nhập</Link></p>
            </div>
        </div>
    )
}

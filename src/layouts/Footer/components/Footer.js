import React, { useState } from 'react'
import diamond from 'assets/images/main-bg.jpg'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import logo from 'assets/images/logo.svg'
import payment1 from 'assets/images/napas-40.png'
import payment2 from 'assets/images/momo.jpg'
import payment3 from 'assets/images/payment-mastercard.png'
import payment4 from 'assets/images/payment-visa.png'
import payment5 from 'assets/images/zalopay.png'
import fbicon from 'assets/images/fb-icon.png'
import insicon from 'assets/images/insta-icon.png'
import '../assets/Footer.scss'

export default function Footer() {
    const brandList = useSelector(state => state.brands.brandList)

    const [paymentList, setPaymentList] = useState([payment1, payment2, payment3, payment4, payment5])
    const [contactList, setContactList] = useState([fbicon, insicon])

    return (
        <div id='footer' className='container-fluid' style={{ background: `url(${diamond})` }}>
            <div className='text-center mb-5 pt-5'><img src={logo} /></div>
            <div className='row'>
                <div className='col-lg-3 col-md-6 terms'>
                    <h5>MovieStar</h5>
                    <ul>
                        <li><p>FAQ</p></li>
                        <li><p>Điều khoản MovieStar</p></li>
                        <li><p>Thỏa thuận sử dụng</p></li>
                        <li><p>Chính sách bảo mật</p></li>
                    </ul>
                </div>
                <div className='col-lg-3 col-md-6 brandList'>
                    <h5>Đối tác</h5>
                    {
                        _.map(brandList, brand => {
                            return (
                                <img key={brand.biDanh} src={brand.logo} alt={brand.tenHeThongRap} />
                            )
                        })
                    }
                </div>
                <div className='col-lg-3 col-md-6 payment'>
                    <h5>Chấp nhận thanh toán</h5>
                    {
                        _.map(paymentList, (payment, index) => (
                            <img key={index} src={payment} alt='payment' />
                        ))
                    }
                </div>
                <div className='col-lg-3 col-md-6 contact'>
                    <h5>Thông tin liên hệ</h5>
                    {
                        _.map(contactList, (contact, index) => (
                            <img key={index} src={contact} width={50} height={50} alt='contact' />
                        ))
                    }
                    <p>Email: nguyenngocthien568@gmail.com</p>
                    <p>Phone: 0399354230</p>
                </div>
            </div>
        </div>
    )
}

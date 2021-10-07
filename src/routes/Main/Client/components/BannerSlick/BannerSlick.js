import React, { useState } from "react";
import Slider from "react-slick";
import banner1 from 'assets/images/slickPic1.jpg'
import banner2 from 'assets/images/slickPic2.jpg'
import banner3 from 'assets/images/slickPic3.jpg'
import banner4 from 'assets/images/slickPic4.jpg'
import '../../assets/BannerSlick.scss'
import { Modal, Button } from 'antd';
import { NextArrow, PrevArrow } from "../Movies/modules/SlickArrows";

export default function BannerSlick() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
    };
    return (
        <div>
            <div className='banner__wrapper'>
                <Slider {...settings}>
                    <div><img src={banner1} alt='Banner phim' /></div>
                    <div><img src={banner2} alt='Banner phim' /></div>
                    <div><img src={banner3} alt='Banner phim' /></div>
                    <div><img src={banner4} alt='Banner phim' /></div>
                </Slider>
            </div>
        </div>

    );
}


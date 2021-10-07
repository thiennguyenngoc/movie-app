import React from 'react'
import insideFrame1 from 'assets/images/slidephone1.jpg'
import insideFrame2 from 'assets/images/slidephone2.jpg'
import insideFrame3 from 'assets/images/slidephone3.jpg'
import insideFrame4 from 'assets/images/slidephone4.jpg'
import insideFrame5 from 'assets/images/slidephone5.jpg'
import downloadIOS from 'assets/images/download.png'
import downloadAndroid from 'assets/images/download 2.png'
import '../../assets/MobileApp.scss'
import Slider from "react-slick";

export default function MobileApp() {
    const settings = {
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
    };

    const collection = [
        insideFrame1,
        insideFrame2,
        insideFrame3,
        insideFrame4,
        insideFrame5
    ]

    return (
        <div id='applications' className='promotion'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 introduceApp'>
                        <h2>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h2>
                        <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <button><a href='https://play.google.com/store'>App miễn phí - Tải về ngay</a></button>
                        <p><span id='highlighted-brand'>MOVIE STAR</span> có hai phiên bản </p>
                        <div className='downloadMethod'>
                            <a href='https://www.apple.com/app-store/' target='blank' ><img src={downloadIOS} alt="App Store's logo" /></a>
                            <a href='https://play.google.com/store' target='blank'><img src={downloadAndroid} alt="Google Play's logo" /></a>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                        <div className='showApp'>
                            <div className='showApp_inside'>
                                <Slider {...settings}>
                                    {
                                        collection.map((item, index) => {
                                            return (
                                                <img key={index} src={item} alt='Advertisements' />
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

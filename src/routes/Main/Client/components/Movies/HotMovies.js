import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../../assets/MovieListAssets/HotMovies.scss'
import _ from 'lodash'
import { NextArrow, PrevArrow } from './modules/SlickArrows';
import ModalVideo from 'react-modal-video'
import StarRateIcon from '@material-ui/icons/StarRate';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Aos from 'aos'

export default function HotMovies({ hotMovies }) {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const [isOpen, setOpen] = useState(false)
    const [trailer, setTrailer] = useState('')
    
    const sendToModal = trailer => {
        setOpen(true)
        setTrailer(trailer)
    }
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='hotMovies__wrapper' data-aos='fade-up'>
            <h1 className='text-center'>PHIM <span>HOT</span> TRONG THÁNG</h1>
            <div>
                <Slider {...settings}>
                    {
                        _.map(hotMovies, (movie, index) => {
                            return (
                                <div key={index} id='hotMovies__wrapper-direct'>
                                    <img src={movie.hinhAnh} alt='Phim HOT trong tháng' />
                                    <PlayCircleOutlineIcon id='playIcon' onClick={() => sendToModal(movie.trailer)}  />
                                    <Link to={`${movie.maPhim}/chitietphim`}>
                                        <p className='text-center movieName'>{movie.tenPhim}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <ModalVideo
                className='modalVideo'
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            >
                <iframe width="790" height="444" src={trailer} ></iframe>
            </ModalVideo>
        </div>
    )
}

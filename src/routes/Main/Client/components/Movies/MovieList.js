import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import '../../assets/MovieListAssets/MovieList.scss'
import bgImg from 'assets/images/movie-list-bg.jpg'
import _ from 'lodash'
import Aos from 'aos'

export default function MovieList({ movieList, showMore }) {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const history = useHistory()

    return (
        <div id='showing' className='movieList__wrapper' style={{ backgroundImage: `url(${bgImg})` }} data-aos='fade-up'>
            <h1>PHIM <span>ĐANG CHIẾU</span></h1>
            <div className='row'>
                {
                    _.map(movieList.items, (item, index) => {
                        return (
                            <div key={index} className='movieList__wrapper-direct col-lg-3  mb-5 mx-auto'>
                                <img src={item.hinhAnh} />
                                <p onClick={() => history.push(`/${item.maPhim}/chitietphim`)}>{item.tenPhim}</p>
                            </div>
                        )
                    })
                }
            </div>
            {
                _.get(movieList, 'currentPage', 1) < _.get(movieList, 'totalPages', 10) &&
                <button
                    className='btnShowMore mx-auto'
                    onClick={() => showMore(movieList.currentPage + 1)}
                >XEM THÊM
                </button>
            }
        </div>
    )
}

import axios from 'helpers/axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BannerSlick from './components/BannerSlick/BannerSlick'
import MobileApp from './components/MobileApp/MobileApp'
import CinemaBrand from './containers/CinemaBrandsContainer/CinemaBrandContainer'
import HotMovies from './containers/MovieListContainer/HotMoviesContainer'
import MovieList from './containers/MovieListContainer/MovieListContainer'
import SearchingSection from './containers/SearchingSectionContainer/SearchingSectionContainer'
import mainBg from 'assets/images/main-bg.jpg'
import './assets/ClientMainPage.scss'
import TechnoIntro from './components/TechnoIntro/TechnoIntro'

export default function ClientMainPage() {
    const accessToken = useSelector(state => state.users.credential.accessToken)

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
        }
    }, [accessToken])
    
    return (
        <div id='clientMainPage' style={{ background: `url(${mainBg})` }}>
            <BannerSlick />
            <SearchingSection />
            <TechnoIntro />
            <HotMovies />
            <MovieList />
            <CinemaBrand />
            <MobileApp />
        </div>
    )
}

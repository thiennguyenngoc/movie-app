import React, { useEffect } from 'react'
import MovieDetail from './MovieDetail'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetail } from './redux/actions'

export default function MovieDetailContainer() {
    const params = useParams()
    const dispatch = useDispatch()

    const detail = useSelector(state => state.detail.movieDetails)

    useEffect(() => {
        dispatch(getMovieDetail(`${params.maPhim}`))
    }, [dispatch, params.maPhim])

    return (
        <div>
            <MovieDetail
                detail={detail}
            />
        </div>
    )
}

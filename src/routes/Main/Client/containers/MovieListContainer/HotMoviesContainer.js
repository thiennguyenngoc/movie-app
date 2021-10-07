import React, { useCallback, useEffect } from 'react'
import HotMovies from '../../components/Movies/HotMovies'
import { useDispatch, useSelector } from 'react-redux'
import { getHotMovies } from '../../redux/MovieListRedux/actions'

export default function HotMoviesContainer() {
    const dispatch = useDispatch()

    const hotMovies = useSelector(state => state.movies.hotMovies)

    useEffect(() => {
        dispatch(getHotMovies())
    }, [dispatch])

    return (
        <div>
            <HotMovies
                hotMovies={hotMovies}
            />
        </div>
    )
}

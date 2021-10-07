import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieList from '../../components/Movies/MovieList'
import { getMovieList } from '../../redux/MovieListRedux/actions'

export default function MovieListContainer() {
    
    const dispatch = useDispatch()
    const movieList = useSelector(state => state.movies.movieList)

    useEffect(() => {
        dispatch(getMovieList())
    }, [dispatch])

    const showMore = useCallback(
        pageNumber => {
            dispatch(getMovieList(pageNumber))
        },
        [dispatch],
    )
   

    return (
        <div>
            <MovieList
                showMore={showMore}
                movieList={movieList}
            />
        </div>
    )
}

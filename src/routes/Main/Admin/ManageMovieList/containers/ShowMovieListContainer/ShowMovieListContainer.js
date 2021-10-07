import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowMovieList from '../../components/ShowMovieList/ShowMovieList'
import { deleteMovieItem, getMovieListByKeyword, manageMovieList } from '../../redux/actions'

export default function ShowMovieListContainer() {
    const dispatch = useDispatch()

    const movieList = useSelector(state => state.manage.movieList)

    useEffect(() => {
        dispatch(manageMovieList())
    }, [dispatch])

    const sendPageNumber = useCallback(
        pageNumber => {
            dispatch(manageMovieList(pageNumber))
        },
        [dispatch],
    )

    const deleteMovie = useCallback(
        maPhim => {
            dispatch(deleteMovieItem(maPhim))
        },
        [dispatch],
    )

    const searchMovieByKeyword = useCallback(
        keyWord => {
            if (keyWord === '') {
                dispatch(manageMovieList())
            } else {
                dispatch(getMovieListByKeyword(keyWord))
            }
        },
        [dispatch],
    )

    return (
        <div>
            <ShowMovieList
                movieList={movieList}
                deleteMovie={deleteMovie}
                sendPageNumber={sendPageNumber}
                searchMovieByKeyword={searchMovieByKeyword}
            />
        </div>
    )
}

import React, { useCallback, useEffect } from 'react'
import CinemaBrand from '../../components/CinemaBrands/CinemaBrand'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, getTheaterDetail, getMovieSchedule } from '../../redux/CinemaBrandRedux/actions'

export default function CinemaBrandContainer() {
    const dispatch = useDispatch()

    const brands = useSelector(state => state.brands.brandList)
    const details = useSelector(state => state.brands.cinemaDetail[0])
    const schedule = useSelector(state => state.brands.movieSchedule)

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTheaterDetail())
    }, [dispatch])

    const getCinemaDetail = useCallback(
        maHeThongRap => {
            dispatch(getTheaterDetail(maHeThongRap))
        },
        [dispatch],
    )

    useEffect(() => {
        dispatch(getMovieSchedule())
    }, [dispatch])

    const getSchedule = useCallback(
        maHeThongRap => {
            dispatch(getMovieSchedule(maHeThongRap))
        },
        [dispatch],
    )

    return (
        <div>
            <CinemaBrand
                brands={brands}
                details={details}
                schedule={schedule}
                getCinemaDetail={getCinemaDetail}
                getSchedule={getSchedule}
            />
        </div>
    )
}

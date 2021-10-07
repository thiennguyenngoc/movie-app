import React, { useEffect } from 'react'
import CreateSchedule from '../../components/CreateSchedule/CreateSchedule'
import { useHistory, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { getClustersInfo, createANewSchedule } from '../../redux/actions'
import { getMovieDetail } from 'routes/Main/MovieDetail/redux/actions'


export default function CreateScheduleContainer() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const theaterList = useSelector(state => state.brands.brandList)
    const clustersList = useSelector(state => state.manage.clusterDetail)
    const detail = useSelector(state => state.detail.movieDetails)

    useEffect(() => {
        dispatch(getMovieDetail(`${params.maPhim}`))
    }, [dispatch, params.maPhim])

    const getTheaterCluster = (e) => {
        dispatch(getClustersInfo(e.target.value))
    }

    useEffect(() => {
        dispatch(getClustersInfo())
    }, [dispatch])

    const createNewSchedule = lichChieu => {
        dispatch(createANewSchedule(lichChieu, history))
    }

    return (
        <div>
            <CreateSchedule
                maPhim={params.maPhim}
                detail={detail}
                theaterList={theaterList}
                clustersList={clustersList}
                getTheaterCluster={getTheaterCluster}
                createNewSchedule={createNewSchedule}
            />
        </div>
    )
}

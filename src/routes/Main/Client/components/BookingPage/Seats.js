import React from 'react'
import WeekendIcon from '@material-ui/icons/Weekend';
import { useDispatch } from 'react-redux';
import { choosingSeat } from '../../redux/BookingPageRedux/actions';

export default function Seats({ ghe }) {
    const dispatch = useDispatch()

    const isReservation = ghe => {
        if (!ghe.daDat) {
            dispatch(choosingSeat(ghe.maGhe))
        }
    }

    return (
        <>
            <div
                className={`ghe ${ghe.loaiGhe} d-inline-block ${ghe.isChoosing ? 'isChoosing' : ''} ${ghe.daDat ? 'daDat' : ''}`}
                onClick={() => isReservation(ghe)}
            >
                <WeekendIcon className='seatIcon'></WeekendIcon>
                <p id='ten-ghe'>{ghe.tenGhe}</p>
            </div>

        </>
    )
}

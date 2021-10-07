import React, { useCallback, useEffect, useState, Fragment } from 'react'
import _ from 'lodash'
import { DatePicker, TimePicker } from 'components'

export const DateTimePicker = ({ value, cb, name }) => {
    const [datetime, setDateTime] = useState([])

    const hdChange = useCallback(e => {
        setDateTime(prev => {
            let prevData = _.cloneDeep(prev)
            prevData[_.toNumber(e.name)] = e.value
            cb({ name, value: prevData.join('') ? prevData.join(' ') : '' })
            return prevData
        })
    }, [cb, name])

    useEffect(() => {
        if (value) {
            const [date, time] = _.split(value, ' ')
            setDateTime([date || '', time || ''])
        }
    }, [value])

    return (
        <Fragment>
            <div className='row d-flex align-items-center'>
                <div className='col-6'>
                    <DatePicker
                        name='0'
                        value={datetime[0]}
                        cb={hdChange}
                    />
                </div>
                <div className='col-6'>
                    <TimePicker
                        name='1'
                        value={datetime[1]}
                        cb={hdChange}
                    />
                </div>
            </div>
        </Fragment>
    )
}


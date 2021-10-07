import React, { useCallback, useEffect, useState } from 'react'
import { TimePicker as AntTimePicker } from 'antd'
import locale from 'antd/es/date-picker/locale/vi_VN'
import moment from 'moment'
import _ from 'lodash'

export const TimePicker = ({ value, cb, name }) => {
    const [time, setTime] = useState('')

    const hdChange = useCallback((date, dateString) => {
        cb({ name, value: dateString })
        setTime(date)
    }, [cb, name])

    useEffect(() => {
        if (!_.isEmpty(value)) {
            let getTime = moment(value, 'HH:mm')
            setTime(getTime)
        } else {
            setTime(null)
        }
    }, [value])

    return (
        <AntTimePicker
            style={{ width: '100%' }}
            locale={locale}
            format='HH:mm'
            onChange={hdChange}
            value={time}
            placeholder='hh:mm'
        />

    )
}

TimePicker.defaultProps = {
    name: 'time',
    value: '',
    cb: () => { }
}


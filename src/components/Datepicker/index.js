import React, { useCallback, useEffect, useState } from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/vi_VN'
import _ from 'lodash'

export const DatePicker = ({ name, value, cb, dateFormat, placeHolder }) => {
    const [date, setDate] = useState('')

    const hdChange = useCallback((date, dateString) => {
        cb({ value: dateString })
        setDate(date)
    }, [cb])

    //Control
    useEffect(() => {
        if (!_.isEmpty(value)) {
            setDate(moment(value, dateFormat))
        } else {
            setDate(null)
        }
    }, [dateFormat, value])

    return (
        <AntDatePicker
            locale={locale}
            format={dateFormat}
            onChange={hdChange}
            value={date}
            placeholder={placeHolder || 'DD/MM/YYYY'}
        />
    )
}

DatePicker.defaultProps = {
    name: 'date',
    value: '',
    cb: () => { },
    dateFormat: 'DD/MM/YYYY',
    placeHolder: ''
}


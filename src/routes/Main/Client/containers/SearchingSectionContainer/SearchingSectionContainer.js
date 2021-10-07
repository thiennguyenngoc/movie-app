import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchingSection from '../../components/SearchingSection/SearchingSection'
import { getInfoForSearching } from '../../redux/SearchingSectionRedux/actions'

export default function SearchingSectionContainer() {
    const dispatch = useDispatch()

    const searchingInfo = useSelector(state => state.searching.searchingInfo)

    useEffect(() => {
        dispatch(getInfoForSearching())
    }, [dispatch])

    return (
        <div>
            <SearchingSection
                searchingInfo={searchingInfo}
            />
        </div>
    )
}

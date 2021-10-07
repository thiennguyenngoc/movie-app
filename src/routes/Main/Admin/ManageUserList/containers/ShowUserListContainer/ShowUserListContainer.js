import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowUserList from '../../components/ShowUserList/ShowUserList'
import { getAllUserInfo, deleteUserByAdmin, getUserByUserName, getUserByKeyword } from '../../redux/actions'
import { getAllInformations } from '../../../../CustomerInfomations/redux/actions'

export default function ShowUserListContainer() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.adminGetUserList.allUserList)

    useEffect(() => {
        dispatch(getAllUserInfo())
    }, [dispatch])

    const sendPageNumber = useCallback(
        pageNumber => {
            dispatch(getAllUserInfo(pageNumber))
        },
        [dispatch],
    )

    // const getUserWantToEdit = useCallback(
    //     taiKhoan => {
    //         dispatch(getUserByUserName(taiKhoan))
    //     },
    //     [dispatch],
    // )

    const searchUserByKeyword = useCallback(
        keyWord => {
            if (keyWord === '') {
                dispatch(getAllUserInfo())
            } else {
                dispatch(getUserByKeyword(keyWord.replace(/\s+/g, '-')))
            }
        },
        [dispatch],
    )

    const onHandleDelete = useCallback(
        taiKhoan => {
            dispatch(deleteUserByAdmin(taiKhoan))
        },
        [dispatch],
    )

    return (
        <div>
            <ShowUserList
                userList={userList}
                sendPageNumber={sendPageNumber}
                // getUserWantToEdit={getUserWantToEdit}
                onHandleDelete={onHandleDelete}
                searchUserByKeyword={searchUserByKeyword}
            />
        </div>
    )
}

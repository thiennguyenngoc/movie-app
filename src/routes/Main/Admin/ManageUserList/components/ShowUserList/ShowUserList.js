import React, { useState } from 'react'
import { Pagination } from 'antd';
import { Modal, Button } from "antd";
import _ from 'lodash'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditUser from '../../containers/EditUserContainer/EditUserContainer';
import AddUser from '../../containers/AddUserContainer/AddUserContainer';
import '../../assets/ShowUserList.scss'
import { useHistory } from 'react-router';


export default function ShowUserList({ userList, sendPageNumber, onHandleDelete, searchUserByKeyword }) {
    const history = useHistory()

    return (
        <div>
            <h2 id='pageTitle'>QUẢN LÝ NGƯỜI DÙNG</h2>
            <button className='btn btn-success addBtn' onClick={() => history.push('/admin/themnguoidung')}>Thêm người dùng</button>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control searchBar" 
                placeholder="Tìm kiếm người dùng" 
                onChange={(e) => searchUserByKeyword(e.target.value)}
                />
            </div>

            <table className="table userListTable">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Loại người dùng</th>
                        <th>Email</th>
                        <th>Tùy chỉnh</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _.map(userList.items, (item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.taiKhoan}</td>
                                    <td>{item.matKhau}</td>
                                    <td>{item.hoTen}</td>
                                    <td>{item.soDt}</td>
                                    <td>{item.maLoaiNguoiDung}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <CreateOutlinedIcon id='editUserBtn' onClick={() => history.push(`/admin/${item.taiKhoan}/chinhsuathongtinnguoidung`)} />
                                        <DeleteForeverOutlinedIcon id='delUserBtn' onClick={() => onHandleDelete(item.taiKhoan)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={userList.totalCount}
                onChange={(e) => sendPageNumber(e)}
            />
        </div>
    )
}

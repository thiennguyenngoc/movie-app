import React, { useState } from 'react'
import _ from 'lodash'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Modal, Button } from "antd";
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';
import CommonMovieForm from '../AddAndEditMovie/CommonMovieForm';
import '../../assets/ShowMovieList.scss'

export default function ShowMovieList({ movieList, deleteMovie, searchMovieByKeyword, sendPageNumber }) {
    const history = useHistory()

    return (
        <div>
            <div>
                <h2 id='PageTitle'>QUẢN LÝ PHIM</h2>
                <button className='btn btn-success addBtn' onClick={() => history.push('/admin/themphim')}>Thêm phim</button>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control searchBar"
                    placeholder="Tìm kiếm phim"
                    onChange={(e) => searchMovieByKeyword(e.target.value)}
                />
            </div>

            <div>
                <table className="table movieListTable">
                    <thead>
                        <tr>
                            <th>Mã phim</th>
                            <th>Hình ảnh</th>
                            <th>Tên phim</th>
                            <th>Mô tả</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(movieList.items, movie => (
                                <tr key={movie.maPhim}>
                                    <td>{movie.maPhim}</td>
                                    <td><img src={movie.hinhAnh} width={60} height={60} /></td>
                                    <td>{movie.tenPhim}</td>
                                    <td>{movie.moTa}</td>
                                    <td className='d-flex'>
                                        <CreateOutlinedIcon id='editBtn' onClick={() => history.push(`/admin/${movie.maPhim}/chinhsuathongtin`)} />
                                        <DeleteForeverOutlinedIcon id='dltBtn' onClick={() => deleteMovie(movie.maPhim)} />
                                        <CalendarTodayIcon id='crtScheBtn' onClick={() => history.push(`/admin/${movie.maPhim}/taolichchieu`)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination
                    defaultCurrent={1}
                    total={movieList.totalCount}
                    current={movieList.currentPage}
                    onChange={(e) => sendPageNumber(e)}
                />
            </div>
        </div>
    )
}

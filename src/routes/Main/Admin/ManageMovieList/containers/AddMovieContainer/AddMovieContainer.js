import React, { useState, useCallback } from 'react'
import CommonMovieForm from '../../components/AddAndEditMovie/CommonMovieForm'
import axios from 'helpers/axios'
import { objectToFormData } from 'helpers/func'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'

export default function AddMovieContainer() {
    const history = useHistory()

    const [movieForm, setMovieForm] = useState({
        tenPhim: '',
        biDanh: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        danhGia: '',
        hinhAnh: '',
        maNhom: 'GP02',
        maPhim: 0
    })

    const submit = useCallback(() => {
        axios({
            url: 'api/QuanLyPhim/ThemPhimUploadHinh',
            method: 'POST',
            data: objectToFormData(movieForm)
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: `Cập nhật phim thành công`,
                })

                history.push('/admin')
            })
    }, [history, movieForm])

    return (
        <div>
            <CommonMovieForm
                title='THÊM PHIM MỚI'
                btn='Thêm phim'
                movieForm={movieForm}
                setMovieForm={newInfo => setMovieForm({ ...movieForm, ...newInfo })}
                submit={submit}
            />
        </div>
    )
}

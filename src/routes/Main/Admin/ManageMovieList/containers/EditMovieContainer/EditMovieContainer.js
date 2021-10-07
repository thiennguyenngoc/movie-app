import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import CommonMovieForm from '../../components/AddAndEditMovie/CommonMovieForm'
import axios from 'helpers/axios'
import { objectToFormData } from 'helpers/func'
import Swal from 'sweetalert2'
import { Loading } from 'components/Loading/Loading'

export default function EditMovieContainer() {
    const params = useParams()
    const history = useHistory()
    const loading = useRef()

    const [initNgayKhoiChieu, setInitNgayKhoiChieu] = useState('')

    const [movieForm, setMovieForm] = useState({
        tenPhim: '',
        biDanh: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        danhGia: '',
        hinhAnh: '',
        maNhom: '',
        maPhim: ''
    })

    const fetchMovieDetail = useCallback(() => {
        loading.current.show()
        axios({
            url: `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${params.maPhim}`,
            method: 'GET'
        })
            .then(res => {
                setMovieForm({
                    tenPhim: res.data.tenPhim,
                    biDanh: res.data.biDanh,
                    trailer: res.data.trailer,
                    moTa: res.data.moTa,
                    ngayKhoiChieu: res.data.ngayKhoiChieu,
                    danhGia: res.data.danhGia,
                    maNhom: res.data.maNhom,
                    hinhAnh: res.data.hinhAnh,
                    maPhim: res.data.maPhim
                })
                setInitNgayKhoiChieu(res.data.ngayKhoiChieu)
            })
            .finally(loading.current.hide)
    }, [params.maPhim])

    useEffect(() => {
        fetchMovieDetail()
    }, [fetchMovieDetail])

    const submit = useCallback(() => {
        axios({
            url: '/api/QuanLyPhim/CapNhatPhimUpload',
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
                title='CHỈNH SỬA THÔNG TIN PHIM'
                btn='Cập nhật thông tin'
                movieForm={movieForm}
                setMovieForm={newInfo => setMovieForm({ ...movieForm, ...newInfo })}
                initNgayKhoiChieu={initNgayKhoiChieu}
                submit={submit}
            />
            <Loading ref={loading} />
        </div>
    )
}

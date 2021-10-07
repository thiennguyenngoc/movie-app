import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useHistory } from 'react-router'
import '../assets/Header.scss'
import logo from 'assets/images/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import diamond from 'assets/images/main-bg.jpg'
import MenuIcon from '@material-ui/icons/Menu';
import { CLEAR_STORE } from '../../../routes/Login/redux/types'
import Swal from 'sweetalert2'

export default function Header() {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.users.credential)

    const logout = () => {
        Swal.fire({
            title: 'Bạn muốn đăng xuất ?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            confirmButtonColor: '#FF0000'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                dispatch({ type: CLEAR_STORE })
            }
            history.push('/') 
        })
    }

    return (
        <div id='header' style={{ background: `url(${diamond})` }} >
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to='/' ><img src={logo} id='logo' alt="Logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <MenuIcon id='collapsedBtn' />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <ScrollLink className="nav-link" to="showing" smooth={true} duration={1000} >Phim đang chiếu</ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="cinemaList" smooth={true} duration={1000}>Cụm rạp</ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="news" smooth={true} duration={1000}>Tin tức</ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" to="applications" smooth={true} duration={1000}>Ứng dụng</ScrollLink>
                        </li>
                    </ul>
                    {
                        user.accessToken
                            ? <div className='d-flex information'>
                                <p className='userName' onClick={() => history.push('/thongtinnguoidung')}>Xin chào, {user.hoTen}</p>
                                <p className='logoutBtn' onClick={() => logout()}>Đăng xuất</p>
                            </div>
                            : <div className='loginAndRegister'>
                                <Link className='mr-3' to='/login'>Đăng nhập</Link>
                                <Link className='mr-3' to='/register'>Đăng ký</Link>
                            </div>
                    }
                </div>
            </nav>
        </div>
    )
}

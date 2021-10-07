
import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'helpers/axios'
import Header from 'layouts/Header/components/Header';
import Footer from 'layouts/Footer/components/Footer';
import Login from 'routes/Login';
import Register from 'routes/Register';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CustomerInforsContainer from 'routes/Main/CustomerInfomations/CustomerInforsContainer';
import MovieDetailContainer from 'routes/Main/MovieDetail/MovieDetailContainer';
import BookingPageContainer from 'routes/Main/Client/containers/BookingPageContainer/BookingPageContainer';
import AdminMainPage from 'routes/Main/Admin/AdminMainPage';
import EditMovieContainer from 'routes/Main/Admin/ManageMovieList/containers/EditMovieContainer/EditMovieContainer'
import CreateScheduleContainer from 'routes/Main/Admin/ManageMovieList/containers/CreateScheduleContainer/CreateScheduleContainer'
import AddMovieContainer from 'routes/Main/Admin/ManageMovieList/containers/AddMovieContainer/AddMovieContainer';
import AddUserContainer from 'routes/Main/Admin/ManageUserList/containers/AddUserContainer/AddUserContainer';
import EditUserContainer from 'routes/Main/Admin/ManageUserList/containers/EditUserContainer/EditUserContainer';
import ClientMainPage from 'routes/Main/Client/ClientMainPage';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'


function App() {
  const accessToken = useSelector(state => state.users.credential.accessToken)
  const user = useSelector(state => state.users.credential)

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }
  }, [accessToken])

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route
          path="/admin"
          render={routeProps => {
            if (user.maLoaiNguoiDung === 'QuanTri') {
              return (
                <>
                  <Route path={`${routeProps.match.url}`} component={AdminMainPage} exact />
                  <Route path={`${routeProps.match.url}/themphim`} component={AddMovieContainer} />
                  <Route path={`${routeProps.match.url}/:maPhim/taolichchieu`} component={CreateScheduleContainer} />
                  <Route path={`${routeProps.match.url}/:maPhim/chinhsuathongtin`} component={EditMovieContainer} />
                  <Route path={`${routeProps.match.url}/themnguoidung`} component={AddUserContainer} />
                  <Route path={`${routeProps.match.url}/:taiKhoan/chinhsuathongtinnguoidung`} component={EditUserContainer} />
                </>
              )
            } else {
              return <Redirect to='/' />
            }
          }}
        />
        <Route
          path="/"
          render={routeProps => {
            return (
              <>
                <Header />
                <Route path='/' component={ClientMainPage} exact />
                <Route path='/thongtinnguoidung' component={CustomerInforsContainer} />
                <Route path='/:maPhim/chitietphim' component={MovieDetailContainer} />
                <Route path='/:maLichChieu/chitietphongve' component={BookingPageContainer} />
                <Footer />
              </>
            )
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;

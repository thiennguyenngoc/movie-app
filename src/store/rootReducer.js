import { combineReducers } from "redux";
import loginReducer from "routes/Login/redux/reducer";
import adminManageReducer from "routes/Main/Admin/ManageMovieList/redux/reducer";
import adminGetUserListReducer from "routes/Main/Admin/ManageUserList/redux/reducer";
import bookingReducer from "routes/Main/Client/redux/BookingPageRedux/reducer";
import brandReducer from "routes/Main/Client/redux/CinemaBrandRedux/reducer";
import searchingSectionReducer from "routes/Main/Client/redux/SearchingSectionRedux/reducer";
import userInfoReducer from "routes/Main/CustomerInfomations/redux/reducer";
import detailReducer from "routes/Main/MovieDetail/redux/reducer";
import movieReducer from "routes/Main/Client/redux/MovieListRedux/reducer";

export default combineReducers ({
    users: loginReducer,
    ticketInfors: userInfoReducer,
    searching: searchingSectionReducer,
    brands: brandReducer,
    movies: movieReducer,
    detail: detailReducer,
    booking: bookingReducer,
    manage: adminManageReducer,
    adminGetUserList: adminGetUserListReducer
})
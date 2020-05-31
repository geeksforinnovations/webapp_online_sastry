import { combineReducers } from 'redux';

// import layout from '../components/Layout/LayoutState';
// import login from '../pages/login/LoginState';
import pujas from '../reducers/puja.reducer'
import pujaries from '../reducers/pujari.reducer'
import booking from "../reducers/booking.reducer";

export default combineReducers({
    pujas,
    pujaries,
    booking
    //   layout,
    //   login,
});
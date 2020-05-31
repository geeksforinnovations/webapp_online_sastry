import { BOOKING } from "./actions.constants";

export const setBooking = (booking) => {
    return {
        type: BOOKING.SET,
        booking
    }
}
export const setPuja = (puja) => {
    return {
        type: BOOKING.SET_PUJA,
        puja
    }
}
export const setPujari = (pujari) => {
    return {
        type: BOOKING.SET_PUJARI,
        pujari
    }
}

export const clearBooking = () => {
    return {
        type: BOOKING.CLEAR
    }
}
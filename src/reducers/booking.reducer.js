import Booking from "../models/Booking"
import { BOOKING } from "../actions/actions.constants"
import Puja from "../models/Puja"

const initialState = {
    booking: new Booking(),
    selectedPuja: new Puja(),
    selectedPujaries: [],
    availableBookings: []
}

const booking = (state = initialState, action) => {
    switch (action.type) {
        case BOOKING.SET:
            return {
                ...state,
                booking: action.booking
            }
        case BOOKING.CLEAR:
            return {
                ...state,
                booking: initialState
            }
        case BOOKING.SET_PUJA:
            return {
                ...state,
                selectedPuja: action.puja,
                booking: { pujaId: action.puja.id }
            }
        case BOOKING.SET_PUJARI:
           
            return {
                ...state,
                selectedPujaries: action.pujaris,
                booking: { ...state.booking, selectedPujaries: action.pujaris.map(p => p.id) }
            }
        case BOOKING.SET_BOOKINGS:

        return {
            ...state,
            availableBookings: action.bookings
        }
        default:
            return state
    }
}

export default booking
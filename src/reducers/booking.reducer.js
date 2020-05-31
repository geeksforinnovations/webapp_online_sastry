import Booking from "../models/Booking"
import { BOOKING } from "../actions/actions.constants"
import Puja from "../models/Puja"

const initialState = {
    booking: new Booking(),
    selectedPuja: new Puja(),
    selectedPujaries: []
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
                selectedPuja: action.puja
            }
        case BOOKING.SET_PUJARI:
            return {
                ...state,
                selectedPujaries: [action.pujari]
            }
        default:
            return state
    }
}

export default booking
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
                selectedPuja: action.puja,
                booking: { pujaId: action.puja.id }
            }
        case BOOKING.SET_PUJARI:
            let pujaries = []
            pujaries.push(action.pujari)
            return {
                ...state,
                selectedPujaries: pujaries,
                booking: { ...state.booking, selectedPujaries: [action.pujari.id] }
            }
        default:
            return state
    }
}

export default booking
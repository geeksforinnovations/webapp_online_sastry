import { PUJARI } from '../actions/actions.constants'


const initialState = {
    availablePujaries: []
}

const pujaries = (state = initialState, action) => {
    switch (action.type) {
        case PUJARI.SET:
            return {
                ...state,
                availablePujaries: action.pujaries
            }
        case PUJARI.CLEAR:
            return {
                ...state,
                availablePujaries: []
            }



        default:
            return state
    }
}

export default pujaries
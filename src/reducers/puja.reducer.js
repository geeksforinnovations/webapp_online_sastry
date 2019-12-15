
const initialState = {
    availablePujas: []
}

const pujas = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PUJAS':
            return {
                ...state,
                availablePujas: action.pujas
            }



        default:
            return state
    }
}

export default pujas
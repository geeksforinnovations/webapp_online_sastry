import { PUJARI } from './actions.constants'

export const setPujaries = (pujaries) => {
    return {
        type: PUJARI.SET,
        pujaries
    }
}

export const clearPujaries = () => {
    return {
        type: PUJARI.CLEAR,
    }
}
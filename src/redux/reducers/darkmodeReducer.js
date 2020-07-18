import { ADD_DARKMODE, REMOVE_DARKMODE, TOGGLE_DARKMODE } from '../actions/types';

const initialState = {
    darkmode: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DARKMODE:
            return {
                ...state,
                darkmode: !state.darkmode
            };
        case ADD_DARKMODE:
            return {
                ...state,
                darkmode: true
            };
        case REMOVE_DARKMODE:
            return {
                ...state,
                darkmode: false
            };
        default:
            return state;
    }
}
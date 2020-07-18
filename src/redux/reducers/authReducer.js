import { SET_CURRENT_USER, GET_CURRENT_USER, } from "../actions/types";
import isEmpty from '../../validation/';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}

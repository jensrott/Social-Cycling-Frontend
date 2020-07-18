import {
    GET_PROFILE,
    GET_PROFILES,
    GET_PROFILE_POSTS,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    profilePosts: [],
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            }
        case GET_PROFILES: {
            return {
                ...state,
                profiles: action.payload
            }
        }
        case GET_PROFILE_POSTS: {
            return {
                ...state,
                profilePosts: action.payload
            }
        }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}
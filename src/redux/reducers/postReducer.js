import {
    ADD_POST,
    GET_POST,
    GET_POSTS,
    GET_PROFILE_POST,
    GET_PROFILE_PICTURE_POST,
    DELETE_POST,
} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    profilePost: {},
    profilePicturePost: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };

        case GET_PROFILE_POST:
            return {
                ...state,
                profilePost: action.payload,
                loading: false
            }

        case GET_PROFILE_PICTURE_POST:
            return {
                ...state,
                profilePicturePost: action.payload,
                loading: false,
            }

        case ADD_POST:
            console.log(action.payload);

            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            console.log(action.payload);

            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload) // Remove the post with the id that matches the payload.
            };
        default:
            return state;
    }
}
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_PROFILE_POSTS,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,
    PROFILE_LOADING
} from './types';
import axios from 'axios';
import setAuthToken from '../../utils';
// const url = 'http://localhost:3001'; // Heroku in production
const url = 'https://protected-scrubland-81975.herokuapp.com'; // Heroku in production

export const getCurrentUser = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios.get(`${url}/api/v1/profile`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${url}/api/v1/profile`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getProfileByUsername = (username) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${url}/api/v1/profile/username/${username}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getProfileById = (userId) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${url}/api/v1/profile/user/${userId}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getPostsFromProfileById = (userId) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${url}/api/v1/profile/user/posts/${userId}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_POSTS,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get(`${url}/api/v1/profiles`)
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const createOrUpdateProfile = (profileData, history) => (dispatch) => {
    axios.post(`${url}/api/v1/profile`, profileData)
        .then(res => {
            // history.push(`/profile/username/${res.data.user}`)
            history.push(`/dashboard`)
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteAccount = (history) => (dispatch) => {
    axios.delete(`${url}/api/v1/profile`)
        .then(res => {
            history.push('/register');
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
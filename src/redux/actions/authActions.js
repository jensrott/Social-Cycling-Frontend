import axios from "axios";
import setAuthToken from "../../utils";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER } from "./types";

// const url = 'http://localhost:3001'; // Heroku in production
const url = 'https://protected-scrubland-81975.herokuapp.com'; // Heroku in production

export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post(`${url}/api/v1/user/register`, userData)
        .then(res => {
            console.log(res);
            history.push("/login")
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );

};

export const loginUser = (userData, history) => (dispatch) => {
    axios
        .post(`${url}/api/v1/user/login`, userData)
        .then(res => {
            console.log(res)

            // Save to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Authorization header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user data
            dispatch(setCurrentUser(decoded));

            // Go to profile
            history.push("/dashboard");
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const changeProfilePicture = (userData, history) => dispatch => {
    axios
        .post(`${url}/api/v1/user/picture`, userData)
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            })
            history.push("/profiles")
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const getCurrentUser = () => (dispatch) => {
    axios.get(`${url}/api/v1/user/me`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_USER,
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

// Log user out
export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    history.push("/login");
};

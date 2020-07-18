import {
    ADD_POST,
    GET_POST,
    GET_PROFILE_POST,
    GET_PROFILE_PICTURE_POST,
    GET_POSTS,
    DELETE_POST,
    EDIT_POST,
    GET_ERRORS
} from './types';
import axios from 'axios';
// const url = 'http://localhost:3001'; // Heroku link in production
const url = 'https://protected-scrubland-81975.herokuapp.com'; // Heroku in production

export const addPost = (postBody, history) => (dispatch) => {
    axios.post(`${url}/api/v1/posts`, postBody)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            history.push('/posts');
            // history.push(`/post/${res.data._id}`);
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getPost = (id) => (dispatch) => {
    axios.get(`${url}/api/v1/post/${id}`)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getProfileForProfilePicture = (profilePic) => (dispatch) => {
    axios.get(`${url}/api/v1/post/${profilePic}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_PICTURE_POST,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getProfileForPost = (id) => (dispatch) => {
    axios.get(`${url}/api/v1/post/profile/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_POST,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deletePost = (id, history) => (dispatch) => {
    axios.delete(`${url}/api/v1/post/${id}`)
        .then(res => {
            history.push(`/posts`)
            dispatch({
                type: DELETE_POST,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const editPost = (id, postData, history) => (dispatch) => {
    axios.patch(`${url}/api/v1/post/${id}`, postData)
        .then(res => {
            dispatch({
                type: EDIT_POST,
                payload: res.data,
            })
            history.push(`/post/${res.data._id}`);
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getPosts = () => (dispatch) => {
    axios.get(`${url}/api/v1/posts`)
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const likePost = (id) => (dispatch) => {
    axios
        .post(`${url}/api/v1/post/like/${id}`)
        .then(res => {
            console.log(res);

            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const unlikePost = id => dispatch => {
    axios
        .delete(`${url}/api/v1/post/unlike/${id}`)
        .then(res =>

            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const addComment = (postId, commentData) => dispatch => {
    axios
        .post(`${url}/api/v1/post/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
};

export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`${url}/api/v1/post/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
};
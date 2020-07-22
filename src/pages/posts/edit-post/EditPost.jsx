import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editPost, getPost } from '../../../redux/actions/postActions';

import isEmpty from '../../../validation';

import './editpost.scss'
import ReactTooltip from 'react-tooltip';
import Errors from '../../../components/common/errors/Errors';

const EditPost = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");

    const dispatch = useDispatch();

    const postId = props.match.params.id;
    console.log(postId);

    const errors = {
        title: useSelector(state => state.errors.title),
        startLocation: useSelector(state => state.errors.startLocation),
        endLocation: useSelector(state => state.errors.endLocation),
    }

    const post = useSelector(state => state.post.post);

    console.log(post);

    const scrollTop = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    const getPostData = (post) => {
        post.title = !isEmpty(post.title) ? post.title : "";
        post.description = !isEmpty(post.description) ? post.description : "";
        post.startLocation = !isEmpty(post.startLocation) ? post.startLocation : "";
        post.endLocation = !isEmpty(post.endLocation) ? post.endLocation : "";

        setTitle(post.title);
        setDescription(post.description);
        setStartLocation(post.startLocation);
        setEndLocation(post.endLocation);
    }


    useEffect(() => {
        getPost(postId);
        getPostData(post);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            title,
            description,
            startLocation,
            endLocation
        };

        if (errors) {
            console.log(errors)
            scrollTop();
        }
        dispatch(editPost(postId, body, props.history));
    };

    const goBack = () => {
        props.history.goBack();
    }


    return (
        <div className="edit-post">
            <div className="edit-post__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            {errors.title || errors.startLocation || errors.endLocation ? <Errors errors={errors} /> : null}
            <div className="edit-post__container">
                <div className="edit-post__card">
                    <h1 className="edit-post__main-title">Edit Groupride</h1>
                    <form noValidate="novalidate" className="edit-post__form" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                name="title"
                                type="description"
                                placeholder="Title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                            <small>Title of your group ride? (required)</small>
                        </div>
                        <div className="form-field">
                            <textarea
                                name="description"
                                placeholder="e.g. We always stay together in group until the end."
                                id=""
                                cols="54"
                                rows="5"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            >
                            </textarea>
                            <small>A little more information? (min: 10 characters) (optional)</small>
                        </div>
                        <div className="form-field question-container">
                            <input
                                name="start"
                                type="text"
                                placeholder="e.g. Gent"
                                onChange={e => setStartLocation(e.target.value)}
                                value={startLocation}
                            />
                            <i data-tip="A route will be generated with your start and end location" className="fa fa-question-circle" aria-hidden="true"></i>
                            <small>Where does your group ride start? (required)</small>
                        </div>
                        <div className="form-field question-container">
                            <input
                                name="start"
                                type="text"
                                placeholder="e.g. Aalst"
                                onChange={e => setEndLocation(e.target.value)}
                                value={endLocation}
                            />
                            <i data-tip="The distance of the route will also be calculated" className="fa fa-question-circle" aria-hidden="true"></i>
                            <small>Where does your group ride end? (required)</small>
                        </div>
                        <ReactTooltip />
                        <div className="edit-post__button-container">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost;

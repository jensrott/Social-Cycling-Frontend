import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../redux/actions/postActions';
import { Modal } from '@material-ui/core';
import Errors from '../../../components/common/errors/Errors';
import ReactTooltip from 'react-tooltip';

import './createpost.scss';

const CreatePost = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");

    const [open, setOpen] = useState(false);

    const profile = useSelector(state => state.post.post);
    console.log(profile);

    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    const errors = {
        title: useSelector(state => state.errors.title),
        startLocation: useSelector(state => state.errors.startLocation),
        endLocation: useSelector(state => state.errors.endLocation),
        wrongFormat: useSelector(state => state.errors.wrongFormat),
    }

    const scrollTop = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

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
        dispatch(addPost(body, props.history));
    };

    const goBack = () => {
        props.history.goBack();
    }

    return (
        <div className="create-post">

            <div className="create-post__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>

            <div className="create-post__container">
                {errors.title || errors.startLocation || errors.endLocation || errors.wrongFormat ? <Errors errors={errors} /> : null}
                <div className="create-post__card">
                    <h1 className="create-post__main-title">Create Groupride</h1>
                    <form noValidate="novalidate" className="create-post__form" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                name="title"
                                type="description"
                                placeholder="e.g. Ride around Belgium"
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
                                placeholder="e.g. Gent, Belgium"
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
                                placeholder="e.g. Aalst, Belgium"
                                onChange={e => setEndLocation(e.target.value)}
                                value={endLocation}
                            />
                            <i data-tip="The distance and moving time of the route will also be calculated" className="fa fa-question-circle" aria-hidden="true"></i>
                            <small>Where does your group ride end? (required)</small>
                        </div>
                        <ReactTooltip />
                        <div className="create-post__button-container">
                            <input
                                type="submit"
                                value="Create Post" />
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                open={open}
                onClose={closeModal}
                onBackdropClick={closeModal}
            >
                <div className="create-post__modal">
                    <div className="modal-wrapper">
                        <h1>Too high distance?</h1>
                        <p>Isn't that too far?</p>
                        <div className="buttons-container">
                            <button onClick={closeModal} className="delete-button">
                                Ok
                                            </button>
                            <button onClick={closeModal} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreatePost;
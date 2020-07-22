import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/actions/postActions';

import { Modal } from '@material-ui/core';

import './commentform.scss';

const CommentForm = ({ postId }) => {

    const [comment, setComment] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [classDisabled, setClassDisabled] = useState('disabled');

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const comments = useSelector(state => state.post.post.comments);

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    const minChar = 5;

    const handleChange = (e) => {
        setComment(e.target.value);
        if (e.target.value.length > minChar) {
            setDisabled(false);
            setClassDisabled("");
        } else if (e.target.value.length < minChar) {
            setDisabled(true);
            setClassDisabled('disabled');
        }
    }

    const goTop = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            description: comment,
            name: user.name,
            profilePicture: user.profilePicture
        }

        // Don't allow duplicate comments
        if (comments.some(comment => comment.description === body.description)) {
            openModal();
            return
        } else {
            goTop();
            dispatch(addComment(postId, body));
        }
    }

    return (
        <div className="comment-form">
            <div className="comment-form__container">
                <div className="comment-form__card">
                    <div className="top-part">
                        <h1>Write a comment</h1>
                    </div>
                    <form className="comment-form__form" noValidate="novalidate" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <textarea
                                required={true}
                                name="comment"
                                placeholder="e.g. I will be there!"
                                cols="54"
                                rows="4"
                                onChange={e => handleChange(e)}
                                value={comment}
                            >
                            </textarea>
                            <small>Please be friendly (min: {minChar} characters)</small>
                        </div>
                        <div className="comment-form__button-container">
                            <input
                                type="submit"
                                disabled={disabled}
                                id="submit-button"
                                className={classDisabled}
                                value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={open}
                onClose={closeModal}
                onBackdropClick={closeModal}
            >
                <div className="comment-form__modal">
                    <div className="modal-wrapper">
                        <h1>Adding duplicate comment?</h1>
                        <p>You already added this!</p>
                        <div className="buttons-container">
                            <button onClick={closeModal} className="delete-button">Ok</button>
                            <button onClick={closeModal} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.string
}

export default CommentForm

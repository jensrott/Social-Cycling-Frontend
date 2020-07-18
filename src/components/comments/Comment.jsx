import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { deleteComment } from '../../redux/actions/postActions';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '@material-ui/core';
import Moment from 'react-moment';

import './comment.scss';

const Comment = ({ comment, postId }) => {

    const userId = useSelector(state => state.auth.user.id);
    const commentUserId = comment.user;
    const commentId = comment._id;

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();


    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    const onDeleteComment = () => {
        dispatch(deleteComment(postId, commentId));
        closeModal();
    }


    useEffect(() => {
        console.log(comment);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="comment">
            <div className="comment__card">
                <div className="comment__image">
                    <img src={`/uploads/${comment.profilePicture}`} alt="comment-pic" />
                    <p>{comment.name}</p>
                </div>
                <div className="comment__text">
                    <p>{comment.description}</p>
                    <Moment fromNow>{comment.created_at}</Moment>
                </div>
                <div>
                    {/* If your user id is the same as the id passed in the comment we can delete it. Because it is our own comment */}
                    {userId === commentUserId ? (
                        <div>
                            <i className="fas fa-trash" onClick={openModal}></i>
                            <Modal
                                open={open}
                                onClose={closeModal}
                                onBackdropClick={closeModal}
                            >
                                <div className="comment__modal">
                                    <div className="modal-wrapper">
                                        <h1>Remove this comment?</h1>
                                        <p>Are you sure you want to delete this comment?</p>
                                        <div className="buttons-container">
                                            <button onClick={onDeleteComment} className="delete-button">
                                                Confirm
                                            </button>
                                            <button onClick={closeModal} className="cancel-button">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    postId: PropTypes.string
}

export default Comment

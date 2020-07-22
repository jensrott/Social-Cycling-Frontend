import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPost, getProfileForPost, deletePost, likePost, unlikePost } from '../../../redux/actions/postActions';
import { Link } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import CommentForm from '../../../components/comments/CommentForm';

import CommentsList from '../../../components/comments/CommentsList';
import ScrollTop from '../../../components/common/scrolltop/ScrollTop';
import ReactTooltip from "react-tooltip";
import Map from '../../../components/map/Map';

import classnames from 'classnames';

import './postdetail.scss';

const PostDetail = (props) => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const post = useSelector(state => state.post.post);
    const profilePost = useSelector(state => state.post.profilePost);
    const userId = useSelector(state => state.auth.user.id);
    const comments = useSelector(state => state.post.post.comments);

    const [showScrollButton, setShowScrollButton] = useState(false);

    const postId = props.match.params.id;

    const onLikePost = (id) => {
        dispatch(likePost(id));
    }

    const onUnLikePost = (id) => {
        dispatch(unlikePost(id));
    }

    const handleLikePost = () => {
        onLikePost(post._id);
    }

    const handleDislikePost = () => {
        onUnLikePost(post._id)
    }

    // Check if user has already liked the post
    const findUserLikes = (likes) => {
        if (likes) {
            if (likes.filter(like => like.user === userId).length > 0) {
                return true
            } else {
                return false
            }
        }
    }

    const removePost = () => {
        console.log("delete post");
        dispatch(deletePost(postId, props.history));
    }

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(getPost(postId));
        dispatch(getProfileForPost(postId));
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

    }, [props])

    return (
        <div className="post-detail">
            <div className="post-detail__back-button-container">
                <Link className="back-button" to="/posts">
                    Group Rides
                </Link>
            </div>
            <div className="post-detail__container">
                {/* If user id of the logged in user is the same as the user id from the post you can do these actions */}
                {post.user === userId ? (
                    <React.Fragment>
                        <div className="post-detail__personal-controls">
                            <button data-tip="Only you can see this button!" className="personal-button" onClick={openModal}>
                                <p>
                                    Delete
                                </p>
                            </button>
                            <Link data-tip="Only you can see this button!" to={`/post/edit/${post._id}`}>
                                <button className="personal-button">
                                    Edit
                                </button>
                            </Link>
                        </div>
                        <ReactTooltip />

                        <Modal
                            open={open}
                            onClose={closeModal}
                            onBackdropClick={closeModal}
                        >
                            <div className="post-detail__modal">
                                <div className="modal-wrapper">
                                    <h1>Remove this post?</h1>
                                    <p>Are you sure you want to delete this post?</p>
                                    <div className="buttons-container">
                                        <button onClick={removePost} className="delete-button">
                                            Confirm
                                        </button>
                                        <button onClick={closeModal} className="cancel-button">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </React.Fragment>
                ) : ""}

                <div className="post-detail__card">
                    <h1>{post.title}</h1>

                    <div style={{ marginBottom: "1rem" }}>
                        <p>{post.origin} to {post.destination} is {post.distance}</p>
                        <p>Estimated time: {post.moving_time}</p>
                    </div>

                    <p> {post.description}</p>

                    <div className="like-container">

                        {post.likes ? post.likes.length : null}
                        <div>
                            <button disabled={findUserLikes(post.likes)} onClick={handleLikePost} className={classnames({
                                "disabled": findUserLikes(post.likes)
                            })} >
                                <i className="fa fa-thumbs-up"></i>
                            </button>
                            <button onClick={handleDislikePost}>
                                <i className="fa fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>

                    {profilePost ? (
                        <React.Fragment>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    marginLeft: "0.5rem",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    color: "inherit"
                                }}
                                data-tip="View full profile!"
                                to={`/profile/${profilePost.user}`}>{profilePost.username ? (<p>Created by: {profilePost.username} </p>) : null}
                            </Link>
                            <ReactTooltip />
                        </React.Fragment>
                    ) : null}
                </div>

                <CommentsList postId={postId} comments={comments} />


                {post.start_lat ? (
                    <div className="post-detail__card" style={{ padding: "0" }}>
                        <Map
                            origin={{ lat: post.start_lat, lng: post.start_lng }}
                            destination={{ lat: post.stop_lat, lng: post.stop_lng }}
                        />
                    </div>
                ) : null}

                <CommentForm postId={postId} />

            </div>
            {
                showScrollButton ? (
                    <ScrollTop />
                ) : null
            }
        </div >
    )
}

export default PostDetail

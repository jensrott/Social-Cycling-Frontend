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

import './postdetail.scss';

const PostDetail = (props) => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [likesStatus, setLikesStatus] = useState();

    const post = useSelector(state => state.post.post);
    const profilePost = useSelector(state => state.post.profilePost);
    const userId = useSelector(state => state.auth.user.id);
    const comments = useSelector(state => state.post.post.comments);

    const [showScrollButton, setShowScrollButton] = useState(false);

    const postId = props.match.params.id;

    const onLikePost = (id) => {
        dispatch(likePost(id));
        setLikesStatus(true);
    }

    const onUnLikePost = (id) => {
        dispatch(unlikePost(id));
        setLikesStatus(false);
    }

    // We can not add the same like twice
    const handleLike = () => {
        if (!likesStatus) { // false
            onLikePost(post._id)
        } else { // true
            onUnLikePost(post._id)
        }
        console.log(likesStatus)
        console.log(post);
    }

    // Check if user has already liked the post
    // TODO: fix this
    const findUserLikes = (likes) => {
        if (likes) {
            if (likes.filter(like => like.user === userId).length > 0) {
                return setLikesStatus(true);
            } else {
                return setLikesStatus(false);
            }
        }
    }

    const handleLikesUser = () => {
        findUserLikes(post.likes);
        console.log(post.likes);
        console.log('woopie');
        console.log(likesStatus);
    }


    // console.log(post.likes);


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
        handleLikesUser();

        // console.log("userId", userId);
        // post.likes ? findUserLikes(post.likes) : null;
        // console.log(post.likes);
        // console.log(post);

        // findUserLikes(post.likes);
        dispatch(getPost(postId));
        dispatch(getProfileForPost(postId));
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="post-detail">
            <div className="post-detail__back-button-container">
                <Link className="back-button" to="/posts">
                    Posts
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

                        {!likesStatus ?
                            (
                                <i onClick={handleLike} className="far fa-heart" ></i>
                            ) : (
                                <i onClick={handleLike} className="fas fa-heart"></i>

                            )}

                        <button onClick={handleLikesUser}>Click</button>

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


                    {/* {post.likes.filter(like => like.user === userId).length > 0 ? (<i className="fas fa-heart"></i>) : (<i className="far fa-heart" ></i>)} */}

                    {/* TODO */}
                    {/* {<i
                    className={classnames('fas fa-thumbs-up', {
                        'text-info': findUserLikes(post.likes)
                    })}
                />} */}

                </div>

                <CommentsList postId={postId} comments={comments} />


                <div className="post-detail__card" style={{ padding: "0" }}>
                    <Map
                        origin={{ lat: post.start_lat, lng: post.start_lng }}
                        destination={{ lat: post.stop_lat, lng: post.stop_lng }}
                    />
                </div>


                <CommentForm postId={postId} />

            </div>
            {showScrollButton ? (
                <ScrollTop />
            ) : null}
        </div >
    )
}

export default PostDetail

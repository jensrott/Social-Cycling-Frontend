import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';

import PostsList from '../../components/posts/PostsList';

import ScrollTop from '../../components/common/scrolltop/ScrollTop';
import ReactTooltip from "react-tooltip";

import './posts.scss';

const Posts = (props) => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    const posts = useSelector(state => state.post.posts);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const goBack = () => {
        props.history.goBack();
    }

    useEffect(() => {
        dispatch(getPosts());
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="posts">
            <div className="posts__back-button-container">
                <button className="back-button" onClick={goBack}>Go back</button>
                <React.Fragment>
                    {isAuthenticated ? (
                        <React.Fragment>
                            <Link to="/create-posts">
                                <button data-tip="Only you can see this button!" className="create-button"> Create Groupride</button>
                            </Link>
                            <ReactTooltip />
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            </div>

            <PostsList posts={posts} />

            {showScrollButton ? (
                <ScrollTop />
            ) : null}
        </div >
    );
}

export default Posts;

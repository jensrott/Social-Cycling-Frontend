import React from 'react'
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './post.scss'

const Post = ({ post }) => {

    return (
        post ?
            <React.Fragment>
                <Link to={`/post/${post._id}`} className="post">
                    <h1 className="post__title">{post.title}</h1>
                    <div className="post__bottom-container">
                        <Moment fromNow>{post.created_at}</Moment>
                        <p>{post.likes.length}<i className="fas fa-heart"></i></p>
                    </div>
                </Link>
            </React.Fragment>
            : null
    )
}

Post.propTypes = {
    post: PropTypes.object
}

export default Post

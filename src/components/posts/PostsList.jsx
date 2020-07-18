import React from 'react'
import PropTypes from 'prop-types';

import Post from './Post';
import { Link } from 'react-router-dom';

import Spinner from '../common/spinner/Spinner';

import './postslist.scss';

const PostsList = ({ posts }) => {
    return (
        <React.Fragment>
            {posts.length > 0 ? (
                <div className="posts-list">
                    <div className="posts-list__container">
                        {posts.map((post, index) => {
                            return (
                                <Post post={post} key={index} />
                            )
                        }
                        )}
                    </div>
                </div>
            ) : (
                    <div className="no-posts">
                        <Spinner />
                    </div>
                )}

            {posts.length === 0 ? (
                <div className="no-posts">
                    <p>No posts yet! Create one <Link to="create-post">here</Link></p>
                </div>
            ) : null}
        </React.Fragment>
    )
}

PostsList.propTypes = {
    posts: PropTypes.array
}

export default PostsList

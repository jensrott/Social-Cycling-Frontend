import React from 'react';
import PropTypes from 'prop-types';
import Post from '../../../components/posts/Post';

import './profileposts.scss';

const ProfilePosts = ({ posts }) => {
    return (
        <div className="profile-posts">
            <div className="profile-posts__container">
                {posts.map((post, index) => {
                    return (
                        <Post post={post} key={index} />
                    )
                }
                )}
            </div>
        </div>
    )
}

ProfilePosts.propTypes = {
    posts: PropTypes.array
}

export default ProfilePosts

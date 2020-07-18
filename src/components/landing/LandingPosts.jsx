import React from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';

import './landingposts.scss';

const LandingPosts = ({ posts }) => {
    return (
        <React.Fragment>
            {posts.length > 0 ? (
                <div className="landing-posts">
                    <div className="landing-posts__container">
                        {posts.map((post, index) => {
                            return (
                                <Post post={post} key={index} />
                            )
                        }
                        )}
                    </div>
                </div>
            ) : (
                    null
                )}
        </React.Fragment>
    )
}

LandingPosts.propTypes = {
    posts: PropTypes.array
}

export default LandingPosts

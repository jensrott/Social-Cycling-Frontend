import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import Spinner from '../common/spinner/Spinner';

import './commentslist.scss';

const CommentsList = ({ comments, postId }) => {
    return (
        <React.Fragment>
            {comments ? (
                <div className="comments-list">
                    <div className="comments-list__container">
                        {comments.map((comment, index) => {
                            return (
                                <Comment postId={postId} comment={comment} key={index} />
                            )
                        }
                        )}
                    </div>
                </div>
            ) : (
                    <div className="no-comments">
                        <Spinner />
                    </div>
                )}
        </React.Fragment>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array
}

export default CommentsList

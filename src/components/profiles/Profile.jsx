import React from 'react';
import { Link } from 'react-router-dom';

import './profile.scss';

const Profile = ({ profile }) => {
    return (
        <div className="profile">
            {profile.user ? (
                <React.Fragment>
                    <div className="profile__card">
                        <div className="sort-vertical">
                            <h1>{profile.user.name}</h1>
                            <small>{profile.username}</small>
                            <p>{profile.location}</p>
                            <Link to={`/profile/${profile.user._id}`}>View Profile</Link>
                        </div>
                        <div>
                            <Link to={`/profile/${profile.user._id}`}>
                                <img src={`/uploads/${profile.user.profilePicture}`} alt="profile-pic" />
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            ) : null}
        </div>
    )
}

export default Profile

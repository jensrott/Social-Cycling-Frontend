import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProfileById, getPostsFromProfileById } from '../../../redux/actions/profileActions';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';
import { Popover } from '@material-ui/core';

import ProfilePosts from '../profile-posts/ProfilePosts';

import './profiledetail.scss';

const ProfileDetail = (props) => {

    const profileId = props.match.params.id;

    const userId = useSelector(state => state.auth.user.id);
    const profile = useSelector(state => state.profile.profile);
    const profilePosts = useSelector(state => state.profile.profilePosts);

    const [showPopOver, setShowPopOver] = useState(false);

    const dispatch = useDispatch();

    const openPopOver = () => {
        setShowPopOver(true);
    }

    const closePopOver = () => {
        setShowPopOver(false);
    }

    const goBack = () => {
        props.history.goBack();
    }

    useEffect(() => {
        dispatch(getProfileById(profileId));
        dispatch(getPostsFromProfileById(profileId));
        console.log(profile);
    }, [])

    return (
        <div className="profile-detail">
            {profile ? (
                <div>
                    <div className="profile-detail__back-button-container">
                        <button className="back-button" onClick={goBack}>Go back</button>
                    </div>
                    <div className="profile-detail__card center-vertical">
                        <img onClick={openPopOver} data-tip="View image!" src={`/uploads/${profile.user.profilePicture}`} alt="profile-pic" />
                            <Popover 
                                open={showPopOver}
                                onClose={closePopOver}
                                classes={{root: "popover-root", paper: "paper-popover"}}
                                backdropInvisible={false}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                  }}
                                  transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                  }}
                            >
                                <img className="profile-detail__popover" src={`/uploads/${profile.user.profilePicture}`} alt="profile-pic" /> 
                            </Popover>
                        <h1 style={{fontSize: "2.5rem"}}>
                            {profile.user.name}
                        </h1>
                        <p>{profile.level}</p>
                    </div>
                    <div className="profile-detail__card center-vertical">
                        {profile.bio ? (
                            <div>
                                <h2>{profile.user.name}'s Bio:</h2>
                                {profile.bio}
                            </div>
                        ) : (<p> {profile.user.name} doesn't have a bio! </p>)}
                    </div>
                    <div className="profile-detail__card">
                        <div className="profile-detail__info-card">
                            <p>Username: {profile.username}</p>
                            {profile.location ? (
                            <p>Location: {profile.location}</p>
                            ) : (<p>{profile.user.name} didn't add his location yet</p>)}
                            <p>Member since: <Moment format="DD/MM/YYYY">{profile.created_at}</Moment></p>
                        </div>
                    </div>
                    <div className="profile-detail__card">
                        {profile.social ? (
                            <div className="profile-detail__social-container">
                               {profile.social.youtube ? (
                                    <a href={`https://youtube.com/user/${profile.social.youtube}`} target="_blank">
                                        <i className="fab fa-youtube youtube-icon"></i>
                                   </a>
                                   ) : null}
                               {profile.social.twitter ? (
                               
                                   <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank">
                                        <i className="fab fa-twitter twitter-icon"></i>
                                   </a>
                               ) : null}
                               {profile.social.instagram ? (
                                    
                                    <a href={`https://www.instagram.com/${profile.social.instagram}`} target="_blank">
                                        <i className="fab fa-instagram instagram-icon"></i>
                                    </a>
                                ) : null}
                            </div>
                        ) : (
                        <p>{profile.user.name} didn't add social links!</p>
                        )}
                    </div>

                    {profilePosts.length !== 0 ? (
                        <div className="profile-detail__card">
                            <h2>Created posts:</h2>
                            <ProfilePosts posts={profilePosts} />
                        </div>
                    ) : (
                        <div className="profile-detail__card">
                            <p>{profile.user.name} didn't create any posts yet!</p>
                        </div>
                    )}

                    {profileId === userId ? (
                        <div className="profile-detail__card">
                                <div className="profile-detail__your-profile-card">
                                    <h3>This is your profile!</h3>
                                    <Link data-tip="Only you can see this button!" to="/edit-profile">Edit</Link>
                                    <ReactTooltip />
                                </div>
                        </div>
                    ) : null}

                </div>

            ) : 
            <div className="profile-detail__no-profile">
                <h1>The profile doesn't seem to be created yet</h1>
                <Link to="/create-profile">Create</Link>
            </div>
            }
        </div>
    )
}

export default ProfileDetail
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile, createOrUpdateProfile } from "../../../redux/actions/profileActions";
import { getCurrentUser } from "../../../redux/actions/profileActions";

import ReactTooltip from "react-tooltip";

import Errors from '../../../components/common/errors/Errors';

import isEmpty from '../../../validation/index';

import './editprofile.scss';

const EditProfile = (props) => {
    const [username, setUsername] = useState("");
    const [level, setLevel] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");

    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    const [showSocialLinks, setShowSocialLinks] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);

    const errors = {
        username: useSelector(state => state.errors.username),
        level: useSelector(state => state.errors.level)
    }

    console.log(useSelector(state => state.errors));

    const getProfileData = (profile) => {

        console.log(profile)

        profile.username = !isEmpty(profile.username) ? profile.username : "";
        profile.level = !isEmpty(profile.level) ? profile.level : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
        profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
        profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

        setUsername(profile.username);
        setLevel(profile.level);
        setLocation(profile.location);
        setBio(profile.bio);
        setYoutube(profile.social.youtube);
        setTwitter(profile.social.twitter);
        setInstagram(profile.social.instagram);
    }

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(getCurrentProfile());
        getProfileData(profile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleShowSocialLinks = () => {
        setShowSocialLinks(!showSocialLinks);
    }

    const scrollTop = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            username,
            level,
            location,
            bio,
            youtube,
            twitter,
            instagram
        }

        if (errors) {
            console.log(errors)
            scrollTop();
        }
        dispatch(createOrUpdateProfile(body, props.history));
    }

    const minChar = 15;

    const handleBioChange = (e) => {
        setBio(e.target.value);

        if (e.target.value.length > minChar) {
            setDisabled(false);
        } else if (e.target.value.length < minChar) {
            setDisabled(true)
        }
    }

    const goBack = () => {
        props.history.goBack();
    }
    const options = [
        { label: 'Hobbyist', value: 'Hobbyist' },
        { label: 'Junior', value: 'Junior' },
        { label: 'Amateur', value: 'Amateur' },
        { label: 'Pro Cyclist', value: 'Pro Cyclist' },
        { label: 'Other', value: 'Other' }
    ];

    return (
        <div className="edit-profile">
            <div className="edit-profile__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            <div className="edit-profile__container">
                {errors.username || errors.level ? <Errors errors={errors} /> : null}
                <div className="edit-profile__card">
                    <h1 className="edit-profile__main-title">Edit your profile</h1>
                    <form noValidate="novalidate" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                name="username"
                                type="text"
                                placeholder="e.g. FastCyclist123"
                                required
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                            <small>What is your username? (required)</small>
                        </div>
                        <div className="form-field-select">
                            <select name="level" required value={level} onChange={e => setLevel(e.target.value)}>
                                {options.map(option =>
                                    <option key={option.label} value={option.value}>
                                        {option.label}
                                    </option>
                                )}
                            </select>
                            <i data-tip="Choose your skill level!" className="fas fa-sort-down"></i>

                            <small>What is your skill level? (required)</small>
                        </div>

                        <div style={{ marginTop: '1.5rem' }} className="form-field">
                            <input
                                name="location"
                                type="text"
                                placeholder="e.g. Belgium, Gent"
                                required
                                onChange={e => setLocation(e.target.value)}
                                value={location}
                            />
                            <small>Where do you live? (optional)</small>

                        </div>

                        <div onClick={toggleShowSocialLinks} className="form-field-social">
                            <p>Social Usernames</p> <i data-tip="Add your social media profiles!" className="fas fa-sort-down"></i>
                            <ReactTooltip />
                        </div>

                        {showSocialLinks ? (
                            <div className="social-links">
                                <ul>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="youtube"
                                                placeholder="Youtube"
                                                onChange={e => setYoutube(e.target.value)}
                                                value={youtube}
                                            />
                                            <i className="fab fa-youtube youtube-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="twitter"
                                                placeholder="Twitter"
                                                onChange={e => setTwitter(e.target.value)}
                                                value={twitter}
                                            />
                                            <i className="fab fa-twitter twitter-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="instagram"
                                                placeholder="Instagram"
                                                onChange={e => setInstagram(e.target.value)}
                                                value={instagram}
                                            />
                                            <i className="fab fa-instagram instagram-icon"></i>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ) : null}

                        <div className="form-field">
                            <textarea
                                required={true}
                                name="bio"
                                placeholder="e.g. I love long rides"
                                id=""
                                cols="54"
                                rows="5"
                                onChange={e => handleBioChange(e)}
                                value={bio}
                            >
                            </textarea>
                            <small>Tell us more about yourself (min: {minChar} characters) (optional)</small>
                        </div>


                        <div className="create-profile__button-container">
                            <input type="submit" value="Edit Profile" disabled={disabled} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EditProfile

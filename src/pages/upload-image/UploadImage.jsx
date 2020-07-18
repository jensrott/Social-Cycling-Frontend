import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { changeProfilePicture } from '../../redux/actions/authActions';

import './uploadimage.scss';


const UploadImage = (props) => {

    const dispatch = useDispatch();

    const [profilePictureFile, setProfilePictureFile] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const user = useSelector(state => state.auth.user);

    const goBack = () => {
        props.history.goBack();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("profilePicture", profilePictureFile);
        dispatch(changeProfilePicture(formData, props.history));
    }

    const onChange = (e) => {
        setProfilePictureFile(e.target.files[0]);
        console.log(e.target.files[0].name)
    }


    useEffect(() => {
        dispatch(getCurrentProfile());
        setProfilePicture(user.profilePicture)
    }, [])

    return (
        <div className="upload-image">
            <div className="upload-image__container">
                <div className="upload-image__back-button-container">
                    <button onClick={goBack} className="back-button">Go back</button>
                </div>
                <div className="upload-image__card"
                    style={{ padding: '1rem 2.5rem' }}
                >
                    <h1>Change your picture!</h1>
                </div>
                <div className="upload-image__card">
                    <form onSubmit={onSubmit}>
                        <img src={`/uploads/${profilePicture}`} alt="profile-pic" />
                        <input type="file" onChange={onChange} />
                        <input type="submit" placeholder="Upload" />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default UploadImage

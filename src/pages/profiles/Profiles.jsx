import React, { useEffect, useState } from 'react';
import { getProfiles } from '../../redux/actions/profileActions';
import { useSelector, useDispatch } from 'react-redux';
import ProfilesList from '../../components/profiles/ProfilesList';

import ScrollTop from '../../components/common/scrolltop/ScrollTop';

import './profiles.scss';

const Profiles = (props) => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    const profiles = useSelector(state => state.profile.profiles);

    const dispatch = useDispatch();

    const goBack = () => {
        props.history.goBack();
    }

    useEffect(() => {
        dispatch(getProfiles());
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="profiles">
            <div className="profiles__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            <ProfilesList profiles={profiles} />
            {showScrollButton ? (
                <ScrollTop />
            ) : null}
        </div>
    )
}

export default Profiles;

import React from 'react'
import Profile from '../profiles/Profile';
import Spinner from '../common/spinner/Spinner';

import './profileslist.scss';

const ProfilesList = ({ profiles }) => {
    return (
        <React.Fragment>
            {profiles ? (
                <div className="profiles-list">
                    <div className="profiles-list__container">
                        {profiles.map((profile, index) => {
                            return (
                                <Profile profile={profile} key={index} />
                            )
                        }
                        )}
                    </div>
                </div>
            ) : (
                    <div className="no-profiles">
                        <Spinner />
                    </div>
                )
            }
        </React.Fragment >
    )
}

export default ProfilesList

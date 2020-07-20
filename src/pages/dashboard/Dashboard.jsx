import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { deleteAccount, getCurrentProfile } from '../../redux/actions/profileActions';
import { toggleDarkmode } from '../../redux/actions/darkmodeActions';

import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import Modal from '@material-ui/core/Modal';

import Spinner from '../../components/common/spinner/Spinner';

import './dashboard.scss';

const Dashboard = (props) => {

    const dispatch = useDispatch();

    const [openLogout, setOpenLogout] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);

    useEffect(() => {
        dispatch(getCurrentProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeDarkTheme = () => {
        let body = document.querySelector('html');
        body.classList.remove('darkTheme')
        localStorage.setItem('darkmode', 'false')
    }

    const removeHasProfileStatus = () => {
        localStorage.setItem('hasProfile', false);
    }

    const logout = () => {
        removeDarkTheme();
        dispatch(logoutUser(props.history));
    }

    const removeAccount = () => {
        removeDarkTheme();
        removeHasProfileStatus();
        dispatch(deleteAccount(props.history));
    }

    const openLogoutModal = () => {
        setOpenLogout(true)
    }

    const closeLogoutModal = () => {
        setOpenLogout(false);
    }

    const openRemoveModal = () => {
        setOpenRemove(true)
    }

    const closeRemoveModal = () => {
        setOpenRemove(false);
    }

    const profile = useSelector(state => state.profile.profile);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.profile.loading);

    const toggleTheme = () => {
        dispatch(toggleDarkmode());
    }

    let dashboardLogic;

    if (profile === null || loading) {
        dashboardLogic = (
            <React.Fragment>
                <Spinner />
            </React.Fragment>
        )
    } else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
            dashboardLogic = (
                <React.Fragment>
                    <h1 className="dashboard__main-title">Welcome  <Link data-tip="View your own profile!" to={`/profile/${user.id}`}>{user.name}</Link></h1>
                    <div>
                        <div className="dashboard__buttons-container">
                            <Link to="/edit-profile">Edit Profile</Link>
                            <Link to="/profiles">All Profiles</Link>
                            <Link to="/create-posts">Create Groupride</Link>
                        </div>
                        <div className="dashboard__card main">
                            <div>
                                {user.name}
                            </div>
                            <div>
                                {user.email}
                            </div>
                            <div>
                                <Link data-tip="Click to change your profile picture!" className="upload-image" to="upload-image">
                                    Add profile picture
                                </Link>
                                <ReactTooltip />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            // logged in but no profile
            dashboardLogic = (
                <React.Fragment>
                    <div className="dashboard__card">
                        <div>
                            Finish creating your profile!
                        </div>
                        <div>
                            <Link className="button" to="/create-profile" data-tip="Make yourself recognisable!">Profile</Link>
                        </div>
                        <ReactTooltip />
                    </div>
                </React.Fragment>
            );
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard__container">

                {dashboardLogic}

                <div className="dashboard__card">
                    <div className="dashboard__toggle-container">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p className="dashboard__theme-text" onClick={toggleTheme} style={{ marginRight: "1rem" }}> Choose theme:</p>
                            <i data-tip="Change theme" style={{ cursor: "pointer" }} onClick={toggleTheme} className="far fa-moon"></i>
                        </div>
                    </div>
                    <div>
                        <button className="button" onClick={openLogoutModal}>Logout</button>
                    </div>
                    <Modal
                        open={openLogout}
                        onClose={closeLogoutModal}
                        onBackdropClick={closeLogoutModal}
                    >
                        <div className="dashboard__modal">
                            <div className="modal-wrapper">
                                <h1>Logout?</h1>
                                <p>Are you sure you want to logout?</p>
                                <div className="buttons-container">
                                    <button onClick={logout} className="delete-button">
                                        Confirm
                                </button>
                                    <button onClick={closeLogoutModal} className="cancel-button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="dashboard__card">
                    <div className="dashboard__toggle-container">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p style={{ marginRight: "1rem" }}> Delete account:</p>
                        </div>
                    </div>
                    <div>
                        <button className="button delete-btn" data-tip="This action is irreversibel!" onClick={openRemoveModal}>Delete</button>
                    </div>

                    <Modal
                        open={openRemove}
                        onClose={closeRemoveModal}
                        onBackdropClick={closeRemoveModal}
                    >
                        <div className="dashboard__modal">
                            <div className="modal-wrapper">
                                <h1>Delete your account?</h1>
                                <p>Are you sure you want to delete your account?</p>
                                <div className="buttons-container">
                                    <button onClick={removeAccount} className="delete-button">
                                        Confirm
                                </button>
                                    <button onClick={closeRemoveModal} className="cancel-button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './header.scss'

const Header = () => {
    // https://codepen.io/graubnla/pen/EgdgZm?editors=1010

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [openMenu, setOpenMenu] = useState(false);

    const toggle = () => {
        setOpenMenu(!openMenu);
        console.log(openMenu);

    }

    return (
        <React.Fragment>
            <header className="header">
                <div className="header__container">
                    <a className="header__logo" href="/">SocialCycling</a>
                    <nav>
                        <ul className="header__menu">
                            <li>
                                <Link to="/posts">Group Rides</Link>
                            </li>
                            {isAuthenticated ? (
                                <li>
                                    <Link to="/dashboard"><button>Dashboard</button></Link>
                                </li>
                            ) : (
                                    <li>
                                        <Link to="/login"><button>Login</button></Link>
                                    </li>
                                )}
                        </ul>

                        <div className="header__hamburger">
                            {!openMenu ? (<i onClick={toggle} className="fas fa-bars"></i>) : (<i onClick={toggle} className="fas fa-times"></i>)}
                        </div>

                    </nav>
                </div>
            </header>

            <div className="mobile-header">
                {openMenu ? (

                    <div className="mobile-header__mobile-container">
                        <li>
                            <Link to="/posts">Group Rides</Link>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <Link to="/dashboard" style={{ paddingBottom: '3%' }}><button>Dashboard</button></Link>
                            </li>
                        ) : (
                                <li>
                                    <Link to="/login" style={{ paddingBottom: '3%' }}><button>Login</button></Link>
                                </li>
                            )}
                    </div>
                ) : null}
            </div>

        </React.Fragment >
    )
}

export default Header

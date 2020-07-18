import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import community from "../../assets/community.svg";
import bike from "../../assets/bike.svg";
import nature from "../../assets/nature.svg";
import environment from "../../assets/environment.svg";
import prefer from "../../assets/prefer.svg";

import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';

import LandingPosts from './LandingPosts';

import './landing.scss';

const Landing = () => {
    const posts = useSelector(state => state.post.posts);
    const lessPosts = posts.slice(0, 12);
    const dispatch = useDispatch();

    /** Smooth scroll to a specific element.
     *  @param {HTMLElement} element
     */
    const smoothScroll = (element) =>
        document.querySelector(element).scrollIntoView({
            behavior: 'smooth'
        });

    const scrollBottom = () => {
        smoothScroll('.landing__section-2')
    }

    useEffect(() => {
        dispatch(getPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="landing">
            <section className="landing__section-1">
                <div className="landing-intro">
                    <div>
                        <p>
                            Social <br />
                            Cycling
                        </p>
                        <Link to="/register">Join</Link>
                    </div>
                    <div>
                        <img onClick={scrollBottom} src={bike} alt="bike-logo" />
                    </div>
                </div>
            </section>

            <section className="landing__section-2">
                <h1 className="landing-title">Why SocialCycling</h1>
                <div className="landing-features">
                    <div>
                        <img src={environment} alt="logo" />
                        <h1>Good for planet!</h1>
                    </div>
                    <div>
                        <img style={{ marginLeft: "12%" }} src={community} alt="logo" />
                        <h1>Meet new people!</h1>
                    </div>
                    <div>
                        <img src={prefer} alt="logo" />
                        <h1>Like group rides!</h1>
                    </div>
                </div>
            </section>

            <section className="landing__section-3">
                <div className="landing-latest">
                    <Link className="landing-title" to="/posts">Latest Grouprides</Link>
                    <div className="landing-grouprides">
                        <LandingPosts posts={lessPosts} />
                    </div>
                </div>
            </section>
            <section className="landing__section-4">
                <div className="landing-what">
                    <div className="landing-title">Ride in group</div>
                    <div className="landing-container">
                        <div className="landing-text">
                            <p><span>Social Cycling</span> is a platform where cyclists of all levels can come together and organise group rides.</p>
                            <p>Cycling is fun, and it is more fun with friends!</p>
                            <Link to="/register">Join</Link>
                        </div>
                        <div className="landing-image">
                            <img src={nature} alt="nature-img" />
                        </div>
                    </div>

                </div>
            </section>
            {/* <Map /> */}
        </div>


    )
}

export default Landing;

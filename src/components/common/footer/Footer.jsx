import React from 'react';
import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p>Copyright © {new Date().getFullYear()} Social Cycling</p>
            </div>
        </footer>
    )
}

export default Footer


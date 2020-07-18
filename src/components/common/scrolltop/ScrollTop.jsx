import React from 'react';

import './scrolltop.scss';

const ScrollTop = () => {

    const goTop = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    return (
        <div className="scroll-top">
            <button onClick={goTop}>
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    )
}

export default ScrollTop

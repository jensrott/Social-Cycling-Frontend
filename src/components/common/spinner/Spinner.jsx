import React from 'react';
import PropTypes from 'prop-types';

import './spinner.scss';

const Spinner = ({ size }) => {
    return (
        // <div style={{ width: size, height: size }} class="spinner"><div></div><div></div><div></div><div></div></div>
        <div className="spinner"><div></div><div></div><div></div><div></div></div>
    )
}

// Spinner.propTypes = {
//     size: PropTypes.number.isRequired
// }

export default Spinner

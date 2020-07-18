import React from 'react';
import PropTypes from 'prop-types';

import './errors.scss';

const Errors = ({ errors }) => {
    return (
        Object.keys(errors).length > 0 ?
            <div className="errors">
                <div className="errors__container">
                    {errors.username ? (<p className="errors__error"> {errors.username} </p>) : ""}
                    {errors.level ? (<p className="errors__error"> {errors.level} </p>) : ""}
                    {errors.title ? (<p className="errors__error"> {errors.title} </p>) : ""}
                    {errors.startLocation ? (<p className="errors__error"> {errors.startLocation} </p>) : ""}
                    {errors.endLocation ? (<p className="errors__error"> {errors.endLocation} </p>) : ""}
                    {errors.wrongFormat ? (<p className="errors__error"> {errors.wrongFormat} </p>) : ""}
                </div>
            </div >
            : null
    )
}

Errors.propTypes = {
    errors: PropTypes.object
}

export default Errors

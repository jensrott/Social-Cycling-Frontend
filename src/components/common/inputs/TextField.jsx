import React from "react";
import PropTypes from "prop-types";

import './inputs.scss';

const TextField = ({
    label,
    name,
    placeholder,
    value,
    error,
    type,
    onChange,
    disabled,
    info
}) => {
    return (
        <React.Fragment>
            {label ? (
                <label>{label}</label>
            ) : null}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small>{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </React.Fragment>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    info: PropTypes.string
};

TextField.defaultProps = {
    type: "text"
};
export default TextField;

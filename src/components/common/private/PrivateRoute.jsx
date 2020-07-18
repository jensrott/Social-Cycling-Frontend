import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object
};

export default PrivateRoute

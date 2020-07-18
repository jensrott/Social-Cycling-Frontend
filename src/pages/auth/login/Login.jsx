import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions';

import TextField from "../../../components/common/inputs/TextField";

import "./login.scss";

const Login = (props) => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [className, setClassName] = useState('far fa-eye-slash');

    const [errors, setErrors] = useState({});

    console.log(errors);
    
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const errorsData = useSelector(state => state.errors);

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            loginEmail,
            loginPassword
        };

        console.log(errorsData)

        if (errorsData) {
            setErrors(errorsData);
        }
        dispatch(loginUser(body, props.history));
    };

    const toggleShow = () => {
        setHidden(!hidden);
        hidden ? setClassName('far fa-eye') : setClassName('far fa-eye-slash')
    }

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__card">
                    <h1 className="login__main-title">Login</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="login-body">
                            <div className="form-field">
                                <TextField
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={e => setLoginEmail(e.target.value)}
                                    value={loginEmail}
                                    error={errorsData.loginEmail}
                                />
                            </div>
                            <div className="form-field password-container">
                                <div style={{ position: "relative" }}>
                                    <TextField
                                        name="password"
                                        type={hidden ? "password" : "text"}
                                        placeholder="Password"
                                        onChange={e => setLoginPassword(e.target.value)}
                                        value={loginPassword}
                                        error={errorsData.loginPassword}
                                    />
                                    <i onClick={toggleShow} className={className} />
                                </div>
                            </div>
                            <div className="login__button-container">

                                <div className="login__login-button-container">
                                    <i className="fas fa-envelope"></i>
                                    <input type="submit" value="Login using Email" />
                                </div>

                                <div className="login__login-button-container">
                                    <i className="fab fa-facebook-square"></i>
                                    <input type="submit" value="Login using Facebook" />
                                </div>

                                <div className="login__login-button-container">
                                    <i className="fab fa-google"></i>
                                    <input type="submit" value="Login using Google" />
                                </div>

                                <p>
                                    No account yet? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

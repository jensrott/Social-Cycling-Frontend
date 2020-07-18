import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions'

import TextField from "../../../components/common/inputs/TextField";

import "./register.scss";

const Register = (props) => {
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");

    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [classNamePassword, setClassNamePassword] = useState('far fa-eye-slash');

    const [hiddenRepeatPassword, setHiddenRepeatPassword] = useState(true);
    const [classNameRepeatPassword, setClassNameRepeatPassword] = useState('far fa-eye-slash');

    const [errors, setErrors] = useState({});

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const errorsData = useSelector(state => state.errors);

    // console.log(errorsData);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(registerName)

        const body = {
            registerName,
            registerEmail,
            registerPassword,
            registerRepeatPassword
        };

        console.log(errorsData)

        if (errorsData) {
            setErrors(errorsData);
        }
        dispatch(registerUser(body, props.history));
    };

    const toggleShowPassword = () => {
        setHiddenPassword(!hiddenPassword);
        hiddenPassword ? setClassNamePassword('far fa-eye') : setClassNamePassword('far fa-eye-slash')
    }

    const toggleShowRepeatPassword = () => {
        setHiddenRepeatPassword(!hiddenRepeatPassword);
        hiddenRepeatPassword ? setClassNameRepeatPassword('far fa-eye') : setClassNameRepeatPassword('far fa-eye-slash')
    }

    return (
        <div className="register">
            <div className="register__container">
                <div className="register__card">
                    <h1 className="register__main-title">Register</h1>
                    <form className="register__form" onSubmit={e => onSubmit(e)}>
                        {errors ? (

                            <div className="register-body">
                                <div className="form-field">
                                    <TextField
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        onChange={e => setRegisterName(e.target.value)}
                                        value={registerName}
                                        error={errorsData.registerName}
                                    />

                                </div>
                                <div className="form-field">
                                    <TextField
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        onChange={e => setRegisterEmail(e.target.value)}
                                        value={registerEmail}
                                        error={errorsData.registerEmail}
                                    />
                                </div>
                                <div className="form-field password-container">
                                    <div style={{ position: "relative" }}>
                                        <TextField
                                            name="password"
                                            type={hiddenPassword ? "password" : "text"}
                                            placeholder="Password"
                                            onChange={e => setRegisterPassword(e.target.value)}
                                            value={registerPassword}
                                            error={errorsData.registerPassword}
                                        />
                                        <i onClick={toggleShowPassword} className={classNamePassword} />
                                    </div>
                                </div>
                                <div className="form-field password-container">
                                    <div style={{ position: "relative" }}>
                                        <TextField
                                            name="repeat-password"
                                            type={hiddenRepeatPassword ? "password" : "text"}
                                            placeholder="Repeat Password"
                                            onChange={e => setRegisterRepeatPassword(e.target.value)}
                                            value={registerRepeatPassword}
                                            error={errorsData.registerRepeatPassword}
                                        />
                                        <i onClick={toggleShowRepeatPassword} className={classNameRepeatPassword} />
                                    </div>

                                </div>

                                <div className="register__button-container">
                                    <input
                                        type="submit"
                                        value="Register" />
                                    <p className="account-yet">
                                        An account yet? <Link to="/login">Login</Link>
                                    </p>
                                </div>
                            </div>
                        ) : null}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, {useState} from "react";
import useInput from "../../utils/useInput";
import api from "../../api/api";
import ErrorMessages from "./ErrorMessages";
import {useHistory} from "react-router-dom"

const Auth = () => {
    const nameInput = useInput("");
    const emailInput = useInput("");
    const passwordInput = useInput("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const registerUser = async (email, password, username) => {
        try {
            await api.users.register({email, password, username});
        } catch (e) {
            const errors = e.response.data.errors;
            if (errors) {
                setErrors(errors);
            }
        }
        history.push('/');
    };

    const onRegister = (e) => {
        e.preventDefault();
        registerUser(emailInput.value, passwordInput.value, nameInput.value);
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="">Have an account?</a>
                        </p>
                        <ErrorMessages errors={errors}/>
                        <form>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text"
                                       placeholder="Your Name" {...nameInput}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text"
                                       placeholder="Email" {...emailInput}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password"
                                       placeholder="Password" {...passwordInput}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={onRegister}>
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

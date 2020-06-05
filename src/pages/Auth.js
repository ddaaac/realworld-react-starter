import React, {useEffect} from "react";
import useInput from "../utils/useInput";
import ErrorMessages from "../components/ErrorMessages";
import Input from "../components/auth/Input";
// eslint-disable-next-line no-unused-vars
import {Link} from "react-router-dom";

const Auth = ({type, onClick, errors, pushToLogin, onUnmounted}) => {
  const nameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");

  useEffect(() => {
    return () => {
      onUnmounted();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await onClick({
      email: emailInput.value,
      password: passwordInput.value,
      username: nameInput.value,
    });
  };

  const onPushToLogin = (e) => {
    e.preventDefault();
    pushToLogin();
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{type.subject}</h1>
            {type.isRegister() &&
            <p className="text-xs-center">
              <Link to={"/login"} onClick={onPushToLogin}>Have an account?</Link>
            </p>}
            <ErrorMessages errors={errors}/>
            <form>
              {type.isRegister() &&
              <Input input={nameInput} type={"text"} placeholder={"Your Name"}/>
              }
              <Input input={emailInput} type={"text"} placeholder={"Email"}/>
              <Input input={passwordInput} type={"password"} placeholder={"Password"}/>
              <button className="btn btn-lg btn-primary pull-xs-right" onClick={onSubmit}>
                {type.subject}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

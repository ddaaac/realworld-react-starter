import React, {useEffect, useReducer} from "react";
import ErrorMessages from "../components/ErrorMessages";
import {Link} from "react-router-dom";
import FieldInput from "../components/FieldInput";
import inputReducer from "../utils/inputReducer";
import SubmitButton from "../components/SubmitButton";

const Auth = ({type, onClick, errors, pushToLogin, onUnmounted}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    username: "",
    email: "",
    password: "",
  });

  const {username, email, password} = state;

  useEffect(() => {
    return () => {
      onUnmounted();
    }
  }, []);

  const onSubmit = () => {
    onClick(state);
  };

  const onChange = (e) => {
    dispatch(e.target);
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
              <FieldInput type="text" placeholder="Your Name" name="username" value={username} onChange={onChange}/>
              }
              <FieldInput type="text" placeholder="Email" name="email" value={email} onChange={onChange}/>
              <FieldInput type="password" placeholder="Password" name="password" value={password} onChange={onChange}/>
              <SubmitButton onSubmit={onSubmit}>{type.subject}</SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

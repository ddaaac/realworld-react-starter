import React, {useState} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import {Route, useHistory, useLocation} from "react-router-dom";
import api from "./api/api";
import AuthType from "./components/auth/AuthType";

const App = () => {
  const [errors, setErrors] = useState({});
  const [currentAuthType, setCurrentAuthType] = useState(AuthType.NEED_REGISTER);
  const history = useHistory();
  const location = useLocation();

  const onAuth = async (apiMethod, nextPath, nextAuthState, props) => {
    try {
      await apiMethod(props);
      setErrors(null);
      setCurrentAuthType(nextAuthState);
      history.push(nextPath);
    } catch (e) {
      const errors = e.response.data.errors;
      setErrors(errors);
    }
  };

  const pushToLogin = () => {
    setCurrentAuthType(AuthType.NEED_LOGIN);
    history.push(AuthType.NEED_LOGIN.path)
  };

  const registerUser = ({email, password, username}) => {
    onAuth(api.users.register, '/login', AuthType.NEED_LOGIN, {email, password, username});
  };

  const loginUser = ({email, password}) => {
    onAuth(api.users.login, '/', AuthType.ALREADY_LOGIN, {email, password});
  };

  const logout = () => {
    // TODO: 토큰 초기화
    setCurrentAuthType(AuthType.NEED_LOGIN);
  };

  return (
    <>
      <Header currentAuthType={currentAuthType} logout={logout}/>
      <Route path={"/"} exact>
        <Home/>
      </Route>
      <Route path={AuthType.NEED_REGISTER.path} exact>
        <Auth type={AuthType.NEED_REGISTER} onClick={registerUser} errors={errors} pushToLogin={pushToLogin}/>
      </Route>
      <Route path={AuthType.NEED_LOGIN.path} exact>
        <Auth type={AuthType.NEED_LOGIN} onClick={loginUser} errors={errors}/>
      </Route>
      <Footer/>
    </>
  );
};

export default App;

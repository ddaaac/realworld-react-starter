import React, {useEffect, useState} from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import {Route, useHistory} from "react-router-dom";
import api from "./api/api";
import AuthType from "./components/auth/AuthType";
import Settings from "./pages/Settings";
import tokenAdmin from "./utils/token";
import Editor from "./pages/Editor";
import AuthRoute from "./components/AuthRoute";

const App = () => {
  const [errors, setErrors] = useState({});
  const [myInfo, setMyInfo] = useState({});
  const [currentAuthType, setCurrentAuthType] = useState(AuthType.NEED_REGISTER);
  const history = useHistory();

  useEffect(() => {
    if (isLogin() && currentAuthType !== AuthType.ALREADY_LOGIN) {
      setCurrentAuthType(AuthType.ALREADY_LOGIN);
    }
  }, []);

  const onUnmounted = (nextPath) => {
    setErrors(null);
    history.push(nextPath);
  };

  const onAuth = async (apiMethod, nextPath, nextAuthState, props) => {
    try {
      const response = await apiMethod(props);
      setCurrentAuthType(nextAuthState);
      history.push(nextPath);
      return response;
    } catch (e) {
      const errors = e.response.data.errors;
      setErrors(errors);
    }
  };

  const registerUser = ({email, password, username}) => {
    onAuth(api.users.register, '/login', AuthType.NEED_LOGIN, {email, password, username});
  };

  const loginUser = async ({email, password}) => {
    const response = await onAuth(api.users.login, '/', AuthType.ALREADY_LOGIN, {email, password});
    if (response) {
      const token = response.data.user.token;
      tokenAdmin.setToken(token);
    }
  };

  const logout = () => {
    tokenAdmin.clearToken();
    setCurrentAuthType(AuthType.NEED_LOGIN);
    setMyInfo({});
    history.push("/");
  };

  const pushToLogin = () => {
    setCurrentAuthType(AuthType.NEED_LOGIN);
    history.push(AuthType.NEED_LOGIN.path);
  };

  const isLogin = () => {
    return tokenAdmin.getToken() !== null;
  };

  const getMyInfo = async () => {
    try {
      const response = await api.users.getMyInfo(tokenAdmin.getToken());
      setMyInfo(response.data.user);
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const updateMyInfo = async ({email, username, password, image, bio}) => {
    try {
      await api.users.updateMyInfo(tokenAdmin.getToken(), {email, username, password, image, bio});
      alert("유저 정보가 변경되었습니다.");
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const createArticle = async ({title, description, body, tagList}) => {
    try {
      await api.articles.create(tokenAdmin.getToken(), {title, description, body, tagList});
      alert("기사가 등록되었습니다.");
      history.push("/");
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };


  return (
    <>
      <Header currentAuthType={currentAuthType} logout={logout}/>
      <Route path={"/"} exact>
        <Home/>
      </Route>
      <Route path={AuthType.NEED_REGISTER.path} exact>
        <Auth type={AuthType.NEED_REGISTER} onClick={registerUser} errors={errors} pushToLogin={pushToLogin}
              onUnmounted={onUnmounted}/>
      </Route>
      <Route path={AuthType.NEED_LOGIN.path} exact>
        <Auth type={AuthType.NEED_LOGIN} onClick={loginUser} errors={errors} onUnmounted={onUnmounted}/>
      </Route>
      <AuthRoute path="/settings" exact isLogin={isLogin} currentAuthType={currentAuthType}>
        <Settings
          updateMyInfo={updateMyInfo}
          onLoad={getMyInfo}
          myInfo={myInfo}
          errors={errors}
          onUnmounted={onUnmounted}
        />
      </AuthRoute>
      <AuthRoute path="/editor" exact isLogin={isLogin} currentAuthType={currentAuthType}>
        <Editor createArticle={createArticle}/>
      </AuthRoute>
      <Footer/>
    </>
  );
};

export default App;

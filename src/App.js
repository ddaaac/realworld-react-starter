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
import Article from "./pages/Article";
import FEED_TYPE from "./components/article/FeedType";
import Profile from "./pages/Profile";

const App = () => {
  const [errors, setErrors] = useState({});
  const [myInfo, setMyInfo] = useState({});
  const [articles, setArticles] = useState({});
  const [profile, setProfile] = useState({});
  const [feedType, setFeedType] = useState(FEED_TYPE.GLOBAL);
  const [currentAuthType, setCurrentAuthType] = useState(AuthType.NEED_REGISTER);
  const history = useHistory();

  useEffect(() => {
    if (isLogin() && currentAuthType !== AuthType.ALREADY_LOGIN) {
      setCurrentAuthType(AuthType.ALREADY_LOGIN);
    }
  }, []);

  useEffect(() => {
    if (currentAuthType === AuthType.ALREADY_LOGIN) {
      getMyInfo();
    }
  }, [currentAuthType]);

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
      const {data} = await api.users.getMyInfo(tokenAdmin.getToken());
      setMyInfo(data.user);
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
      const errors = e.response.data ? e.response.data.errors : {status: e.response.status};
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

  const getArticles = async ({tag, author, favorited, limit, offset, my}) => {
    try {
      const config = {tag, author, favorited, limit, offset, token: tokenAdmin.getToken()};
      if (my) {
        config.author = myInfo.username;
      }
      const {data} = await api.articles.get(config);
      setArticles(data.articles);
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const toggleFavorite = async (slug) => {
    const target = articles.filter(article => article.slug === slug)[0];
    if (!target) {
      throw Error("slug가 일치하는 article이 없습니다.");
    }
    const action = target.favorited ? api.articles.unfavorite : api.articles.favorite;
    target.favoritesCount += target.favorited ? -1 : 1;
    target.favorited = !target.favorited;

    try {
      await action(tokenAdmin.getToken(), slug);
      setArticles(articles.map(article => {
        return article.slug === target.slug ? target : article;
      }));
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const addComment = async (slug, body) => {
    try {
      const {data} = await api.articles.addComment(tokenAdmin.getToken(), slug, body);
      return data.comment;
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const getComments = async (slug) => {
    try {
      const {data} = await api.articles.getComments(slug);
      return data.comments;
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const deleteComment = async (slug, id) => {
    try {
      return await api.articles.deleteComment(tokenAdmin.getToken(), slug, id);
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const getProfileAndArticle = async (username, articleType) => {
    try {
      const {data} = await api.profiles.get(username, tokenAdmin.getToken());
      setProfile(data.profile);
      await getArticles({[articleType]: username});
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  const toggleFollow = async () => {
    try {
      const action = profile.following ? api.profiles.unFollow : api.profiles.follow;
      await action(profile.username, tokenAdmin.getToken());
      setProfile({...profile, following: !profile.following});
    } catch (e) {
      const errors = e.response.data ? e.response.data : {status: e.response.status};
      setErrors(errors);
    }
  };

  return (
    <>
      <Header currentAuthType={currentAuthType} logout={logout}/>
      <Route path={"/"} exact>
        <Home
          articles={articles}
          getArticles={getArticles}
          feedType={feedType}
          setFeedType={setFeedType}
          toggleFavorite={toggleFavorite}
        />
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
      <Route path="/articles/:slug" exact>
        <Article
          articles={articles}
          toggleFavorite={toggleFavorite}
          addComment={addComment}
          getComments={getComments}
          deleteComment={deleteComment}
          myInfo={myInfo}
          profile={profile}
          setProfile={setProfile}
          toggleFollow={toggleFollow}
        />
      </Route>
      <Route path="/profiles/:username" exact>
        <Profile
          profile={profile}
          articles={articles}
          onLoading={getProfileAndArticle}
          toggleFavorite={toggleFavorite}
          toggleFollow={toggleFollow}
        />
      </Route>
      <Footer/>
    </>
  );
};

export default App;

import React from "react";
import AUTH_TYPE from "../auth/AuthType";
import Nav from "./nav";

const Header = ({currentAuthType, logout}) => {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <Nav to={"/"}>Home</Nav>
          <Nav to="/editor">
            <i className="ion-compose"/>&nbsp;New Post
          </Nav>
          <Nav to="/settings">
            <i className="ion-gear-a"/>&nbsp;Settings
          </Nav>
          {(currentAuthType === AUTH_TYPE.NEED_REGISTER || currentAuthType === AUTH_TYPE.NEED_LOGIN) &&
          <Nav to={currentAuthType.path}>
            {currentAuthType.subject}
          </Nav>}
          {currentAuthType === AUTH_TYPE.ALREADY_LOGIN &&
          <Nav to="/logout" onClick={onLogout}>Logout</Nav>}
        </ul>
      </div>
    </nav>
  )
};

export default Header;

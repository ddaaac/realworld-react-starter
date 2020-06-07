import React from "react";
import AUTH_TYPE from "../auth/AuthType";
import Nav from "../nav";
import {Link} from "react-router-dom";

const Header = ({currentAuthType, logout}) => {

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">conduit</Link>
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
          <Nav to="/logout" onClick={logout}>Logout</Nav>}
        </ul>
      </div>
    </nav>
  )
};

export default Header;

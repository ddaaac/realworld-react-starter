import React from "react";
import {NavLink} from "react-router-dom";
import AUTH_TYPE from "./auth/AuthType";

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
          <li className="nav-item">
            <a className="nav-link active" href="">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li className="nav-item">
            <NavLink
              className={"nav-link"}
              activeClassName={"active"}
              exact
              to="/settings"
            >
              <i className="ion-gear-a"/>&nbsp;Settings
            </NavLink>
          </li>
          {(currentAuthType === AUTH_TYPE.NEED_REGISTER || currentAuthType === AUTH_TYPE.NEED_LOGIN) &&
          <li className="nav-item">
            <NavLink
              className={"nav-link"}
              activeClassName={"active"}
              exact
              to={currentAuthType.path}
            >
              {currentAuthType.subject}
            </NavLink>
          </li>}
          {currentAuthType === AUTH_TYPE.ALREADY_LOGIN &&
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link" onClick={onLogout}>Logout</NavLink>
          </li>}
        </ul>
      </div>
    </nav>
  )
};

export default Header;

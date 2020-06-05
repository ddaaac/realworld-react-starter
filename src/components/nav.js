import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = ({children, to, onClick, isActive}) => {
  const onNav = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <li className="nav-item">
      <NavLink
        className={"nav-link"}
        activeClassName={"active"}
        exact
        to={to}
        onClick={onNav}
        isActive={isActive}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default Nav;
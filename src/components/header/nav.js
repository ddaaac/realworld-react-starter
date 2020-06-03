import React from 'react';
import {NavLink} from "react-router-dom";

function Nav({children, to, onClick}) {
  return (
    <li className="nav-item">
      <NavLink
        className={"nav-link"}
        activeClassName={"active"}
        exact
        to={to}
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default Nav;
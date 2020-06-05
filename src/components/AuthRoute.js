import React from 'react';
import {Redirect, Route} from "react-router-dom";

function AuthRoute({path, isLogin, currentAuthType, children, ...rest}) {
  return (
    <Route path={path} {...rest}
           render={() => isLogin() ? children : <Redirect to={{pathname: currentAuthType.path}}/>}
    />
  );
}

export default AuthRoute;
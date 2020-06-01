import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import {Route} from "react-router-dom";
import Auth from "./pages/auth/Auth";

const App = () => {

    return (
        <>
            <Header/>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/sign-up" exact>
                <Auth/>
            </Route>
            <Footer/>
        </>
    );
};

export default App;

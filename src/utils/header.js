import React from 'react';
import { Switch, Route } from "react-router-dom"
import Profile from "../components/profile"
import Me from "../components/me";
// import Home from "../components/home"
const Header = () => {
    return (
        <Switch>
        {/* <Route path="/me/:id" exact component={Home} ></Route> */}
        <Route path="/me/:id" exact component={Me} ></Route>
        <Route path="/profile/:id" exact component={Profile} ></Route>
    </Switch> 
    )
   
}
export default Header
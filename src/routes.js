import { BrowserRouter, Switch, Route } from 'react-router-dom';  
import React, { Component } from 'react';
import HomePage from "./pages/Home";
import Organization from "./pages/Organization";

export default class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/organization/:organizationName" component={Organization}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

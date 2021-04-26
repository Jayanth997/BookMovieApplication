import React from 'react';
import Home from '../screens/home/Home.js';
import Details from '../screens/details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from '../screens/bookshow/BookShow';
import Confirmation from '../screens/confirmation/Confirmation';    

const Controller = () => {

    const baseUrl = "/api/v1/";


    return(

        <Router>
            <div className="main-container">
                <Route
                 exact
                 path="/"
                 render = {(props) => <Home {...props} baseUrl = {baseUrl} />}
                 />
                 <Route
                 exact
                 path="/movie/:id"
                 render = {(props) => <Details {...props} baseUrl = {baseUrl} />}
                 /><Route
                 exact
                 path="/bookshow/:id"
                 render = {(props) => <BookShow {...props} baseUrl = {baseUrl} />}
                 /><Route
                 exact
                 path="/confirm/:id"
                 render = {(props) => <Confirmation {...props} baseUrl = {baseUrl} />}
                 />
            </div>
        </Router>


    );
}

export default Controller;
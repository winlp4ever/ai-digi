import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import RegisterForm from '../forms/register-form';
import CandidateForm from '../forms/candidate-form';



const App = (props) => {
    return <Router>
        <div className='app'>
            <Switch>
                <Route path="/candidate-form">
                    <CandidateForm />
                </Route>
                <Route exact path="/">
                    <RegisterForm />
                </Route>
            </Switch>
        </div>
    </Router>
    
}

export default App;
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import RegisterForm from '../forms/register-form';
import CandidateForm from '../forms/candidate-form';
import HubspotForm from 'react-hubspot-form'


const App = (props) => {
    return <Router>
        <div className='app'>
            <Switch>
                <Route path="/candidate-form">
                    <CandidateForm />
                </Route>
                <Route exact path="/">
                <HubspotForm
                    className='hs-form-register'
                    portalId='7708794'
                    formId='8ff4813b-865a-4138-8f73-848338d26bf4'
                    onSubmit={() => console.log('Submit!')}
                    onReady={(form) => console.log('Form ready!')}
                    loading={<div>Loading...</div>}
                    />
                </Route>
            </Switch>
        </div>
    </Router>
    
}

export default App;
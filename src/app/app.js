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
                    <div cl='hs-form' 
                        dangerouslySetInnerHTML={{__html: `
                        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
                        <script>
                        hbspt.forms.create({
                            portalId: "7708794",
                            formId: "8ff4813b-865a-4138-8f73-848338d26bf4"
                        });
                        </script>
                        `}}
                    />
                </Route>
            </Switch>
        </div>
    </Router>
    
}

export default App;
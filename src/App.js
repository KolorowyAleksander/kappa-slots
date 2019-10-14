import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';

import History from './history/History';
import Leaderboard from './leaderboard/Leaderboard';
import SlotMachine from './slotmachine/Slotmachine';
import './App.css';

Amplify.configure(awsconfig);


function App() {
    return (
        <Router>
            <div className="application-main">
                <nav className="nav-router">
                    <ul>
                        <li><Link to="/">MAIN</Link></li>
                        <li><Link to="/leaderboard">LEADERBOARD</Link></li>
                        <li><Link to="/history">HISTORY</Link></li>
                        <li><Link onClick={() => Auth.signOut()}>SIGNOUT</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/leaderboard">
                        <Leaderboard />
                    </Route>
                    <Route path="/history">
                        <History />
                    </Route>
                    <Route path="/">
                        <SlotMachine />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const usernameAttributes = 'USERNAME';
const signUpConfig = {
    header: 'Sign Up For The Game',
    hideAllDefaults: true,
    defaultCountryCode: '48',
    signUpFields: [
        {
            label: 'USERNAME',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'PASSWRD',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
        },
        {
            label: 'EMAIL',
            key: 'email',
            required: true,
            displayOrder: 3,
            type: 'string'
        }
    ]
};


export default withAuthenticator(App, { 
    signUpConfig,
    usernameAttributes,
});

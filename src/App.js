import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Amplify, { Analytics, Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import { runSlotmachine } from './graphql/mutations';

Amplify.configure(awsconfig);


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">MAIN</Link></li>
                        <li><Link to="/leaderboard">LEADERBOARD</Link></li>
                        <li><Link to="/history">HISTORY</Link></li>
                        <li><p onClick={logout}>SIGNOUT</p></li>
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
                        <Homo />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


async function logout() {
    Auth.signOut();
}

async function addElement () {
    try {
        const result = await API.graphql(graphqlOperation(runSlotmachine));
        alert(JSON.stringify(result));
    } catch (e) {
        console.log('Exception caught when retrieving user data', e);
    }
};
  

function Homo() {
    return (
        <>
            <h1>VERY UGLY HEADING 1</h1>
            <button onClick={addElement}>DO SOMETHING</button>
        </>
    );
}


function History() {
    return <h2>HISTORY</h2>;
}


function Leaderboard() {
    return (
        <ol>
            <li>SAMWON </li>
            <li>SOMEWON ELS</li>
            <li>uganda numba 3</li>
        </ol>
    );
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

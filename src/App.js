import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import { createMyType } from './graphql/mutations';

Amplify.configure(awsconfig);


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">MAIN</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/leaderboard">SLOT</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/user">LEADERBOARD</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/leaderboard">
                        <Leaderboard />
                    </Route>
                    <Route path="/slot">
                        <Slot />
                    </Route>
                    <Route path="/">
                        <Homo />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


async function addElement () {
    const elementDetails = {
        input: {
            title: 'Party tonight!',
            content: 'Amplify CLI rocks!'
        }
    };

    const result = await API.graphql(graphqlOperation(createMyType, elementDetails));
    alert(JSON.stringify(result));
};
  

function Homo() {
    return (
        <>
            <h1>VERY UGLY HEADING 1</h1>
            <button onClick={addElement}>DO SOMETHING</button>
        </>
    );
}


function Slot() {
    return <h2>SLOT</h2>;
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

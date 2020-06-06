import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import { Login, Register, NotFound } from './containers';

document.addEventListener('DOMContentLoaded', () => 
{

    ReactDOM.render(
        <Router>
            <Switch>
                <Route exact path="*/login" component={Login} />
                <Route exact path="*/register" component={Register} />
                <Route component={NotFound} />
            </Switch>
        </Router>,
        document.querySelector('#app')
    );
});

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import { Home, Login, Register } from './containers';

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/auth/" component={Home} />
				<Route exact path="/auth/login" component={Login} />
				<Route exact path="/auth/register" component={Register} />
				<Route
					render={() => {
						window.location.replace('http://localhost:8080/notfound/');
						return null;
					}}
				/>
			</Switch>
		</App>
	</Router>,
	document.querySelector('#root')
);

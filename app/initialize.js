import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './App';

import { Login, Register, NotFound } from './containers';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Router>
			<App>
				<Switch>
					<Route exact path="*/login" component={Login} />
					<Route exact path="*/register" component={Register} />
					<Route component={NotFound} />
					{/* <Route
						render={() => {
							window.location.replace('http://localhost:8080/notfound/');
							return null;
						}}
					/> */}
				</Switch>
			</App>
		</Router>,
		document.querySelector('#app')
	);
});

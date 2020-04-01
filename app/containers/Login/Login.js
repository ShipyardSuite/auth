import React from 'react';

/**
 * @class Login
 */
export default class Login extends React.Component {
	componentDidMount() {
		document.title = 'Login';
	}

	/**
	 * Renders the current react component.
	 * @method render
	 */
	render() {
		return <div>Login page</div>;
	}
}

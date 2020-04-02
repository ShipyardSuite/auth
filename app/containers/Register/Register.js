'use strict';

import React from 'react';

import { Button, Form } from 'semantic-ui-react';

import { Layout } from './../../components';

/**
 * @class Register
 */
export default class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			signUpError: '',
			registrationSuccess: false,
			email: '',
			password: '',
			passwordValidation: ''
		};
	}

	componentDidMount() {
		document.title = 'Register';
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSignUp() {
		const { email, password, passwordValidation } = this.state;

		if (password === passwordValidation) {
			fetch('/auth/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						this.setState({
							signUpError: json.message,
							registrationSuccess: true,
							email: '',
							password: '',
							passwordValidation: ''
						});
					} else {
						this.setState({
							signUpError: json.message
						});
					}
				});
		} else {
			this.setState({
				signUpError: 'Passwords did not match!'
			});
		}
	}

	/**
	 * Renders the current react component.
	 * @method render
	 */
	render() {
		const { email, password, passwordValidation, registrationSuccess, signUpError } = this.state;

		return (
			<Layout
				title="Register a new Account"
				optionalLink="/auth/login"
				optionalLinkTitle="Login"
				optionalLinkText="to your Account."
				error={signUpError}
				success={registrationSuccess}
			>
				<Form size="large">
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						type="email"
						name="email"
						value={email}
						onChange={this.handleInputChange.bind(this)}
						placeholder="E-mail address"
					/>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleInputChange.bind(this)}
					/>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="Repeat Password"
						type="password"
						name="passwordValidation"
						value={passwordValidation}
						onChange={this.handleInputChange.bind(this)}
					/>
					<Button primary fluid size="large" onClick={this.onSignUp.bind(this)}>
						Register
					</Button>
				</Form>
			</Layout>
		);
	}
}

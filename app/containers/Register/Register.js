import { withRouter, NavLink, Link } from 'react-router-dom';
import React, { Component } from 'react';

import { setInStorage } from './../../utils/storage';

import { Grid, Segment, Image, Header, Form, Button, Divider, Responsive, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';

class Register extends Component {
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

export default withRouter(Register);

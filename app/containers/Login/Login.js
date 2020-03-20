import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { setInStorage } from './../../utils/storage';

import { Grid, Segment, Image, Header, Form, Button, Divider, Responsive, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: '',
			loginError: '',
			email: '',
			password: ''
		};
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onLogin() {
		const { email, password } = this.state;

		this.setState(
			{
				loginError: ''
			},
			() => {
				fetch('/auth/api/login', {
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
							setInStorage('botany-bay', { token: json.token });

							window.location.replace('http://localhost:8080/dashboard/');

							this.setState({
								loginError: '',
								email: '',
								password: '',
								token: json.token
							});
						} else {
							this.setState({
								loginError: json.message
							});
						}
					});
			}
		);
	}

	render() {
		const { email, password, loginError } = this.state;

		return (
			<Layout
				title="Sign in"
				optionalLink="/auth/register"
				optionalLinkTitle="Register"
				optionalLinkText="a new Account."
				error={loginError}
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
						placeholder="E-Mail Address"
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleInputChange.bind(this)}
					/>
					<Button primary fluid size="large" onClick={this.onLogin.bind(this)}>
						Login
					</Button>
				</Form>
			</Layout>
		);
	}
}

export default withRouter(Login);

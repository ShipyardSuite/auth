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
							password: ''
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
			<Layout>
				<Grid.Column style={{ maxWidth: 350 }}>
					<Segment>
						<Responsive {...Responsive.onlyMobile}>
							<Segment basic padded>
								<Image src="shipyard_logo_icon_inverted.png" />
							</Segment>
						</Responsive>
						<Responsive {...Responsive.onlyTablet}>
							<Segment basic padded>
								<Image src="shipyard_logo_icon_inverted.png" />
							</Segment>
						</Responsive>
						<Header as="h4">Register a new Account</Header>
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
							<Divider horizontal>Or</Divider>
							<NavLink to="/auth/login">Login</NavLink> to your Account.
						</Form>
					</Segment>
					{registrationSuccess ? (
						<Message info>
							Registration Successful, check your emails.&nbsp;
							<p>
								Back to <a href="http://localhost:8080/homepage/">Homepage</a>
							</p>
						</Message>
					) : null}
					{signUpError ? <Message negative>{signUpError}</Message> : null}
				</Grid.Column>
			</Layout>
		);
	}
}

export default withRouter(Register);

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
								loginError: json.message,
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
			<Layout>
				<Grid.Column style={{ maxWidth: 350 }}>
					<Responsive {...Responsive.onlyMobile}>
						<Image src="shipyard_logo_icon_inverted.png" style={{ maxWidth: 350 }} />
					</Responsive>
					<Responsive {...Responsive.onlyTablet}>
						<Image src="shipyard_logo_icon_inverted.png" style={{ maxWidth: 350 }} />
					</Responsive>
					<Segment>
						<Header as="h4">Sign in</Header>
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
							<Divider horizontal>Or</Divider>
							<NavLink to="/auth/register">Register</NavLink> a new Account.
						</Form>
					</Segment>
					{loginError && <Message negative>{loginError}</Message>}
				</Grid.Column>
			</Layout>
		);
	}
}

export default withRouter(Login);

/*
<Grid columns={2}>
				<Grid.Row style={{ height: '100vh', paddingBottom: 0 }}>
					<Grid.Column width={8} color="black" only="computer">
						<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 350 }}>
								<Image src="shipyard_logo_full.png" />
							</Grid.Column>
						</Grid>
					</Grid.Column>
					<Grid.Column mobile={16} computer={8}>
						<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 350 }}>
								<Responsive {...Responsive.onlyMobile}>
									<Image src="shipyard_logo_icon_inverted.png" style={{ maxWidth: 350 }} />
								</Responsive>
								<Responsive {...Responsive.onlyTablet}>
									<Image src="shipyard_logo_icon_inverted.png" style={{ maxWidth: 350 }} />
								</Responsive>
								<Segment>
									<Header as="h4">Sign in</Header>
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
										<Divider horizontal>Or</Divider>
										<NavLink to="/auth/register">Register</NavLink> a new Account.
									</Form>
								</Segment>
								{loginError && <Message negative>{loginError}</Message>}
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
*/

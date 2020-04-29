import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Grid, Segment, Image, Header, Divider, Responsive, Message } from 'semantic-ui-react';

class Layout extends Component {
	registrationSuccess() {
		return (
			<Message info>
				Registration Successful, check your emails.&nbsp;
				<p>
					Back to <a href="http://localhost:8080/">Homepage</a>
				</p>
			</Message>
		);
	}

	render() {
		const { title, optionalLink, optionalLinkTitle, optionalLinkText, error, success } = this.props;

		return (
			<Grid columns={2}>
				<Grid.Row style={{ height: '100vh', paddingBottom: 0 }}>
					<Grid.Column width={8} color="black" only="computer">
						<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 350 }}>
								<Image src="./public/images/shipyard_logo_full.png" />
							</Grid.Column>
						</Grid>
					</Grid.Column>
					<Grid.Column mobile={16} computer={8}>
						<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 350 }}>
								<Segment raised>
									<Responsive {...Responsive.onlyMobile}>
										<Segment basic padded>
											<Image src="./public/images/shipyard_logo_icon_inverted.png" />
										</Segment>
									</Responsive>
									<Responsive {...Responsive.onlyTablet}>
										<Segment basic padded>
											<Image src="./public/images/shipyard_logo_icon_inverted.png" />
										</Segment>
									</Responsive>
									<Header as="h4">{title}</Header>
									{this.props.children}
									<Divider horizontal>Or</Divider>
									<NavLink to={optionalLink}>{optionalLinkTitle}</NavLink> {optionalLinkText}
								</Segment>
								{success && this.registrationSuccess()}
								{error && <Message negative>{error}</Message>}
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default withRouter(Layout);

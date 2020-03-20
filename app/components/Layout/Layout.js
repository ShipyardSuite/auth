import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Grid, Image } from 'semantic-ui-react';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: false
		};
	}

	render() {
		return (
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
							{this.props.children}
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default withRouter(Layout);

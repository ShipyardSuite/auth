import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { i18nManager } from '@shipyardsuite/i18n-manager';

import { Grid, Segment, Image, Header, Divider, Responsive, Message } from 'semantic-ui-react';

//import './Layout.sass';

class Layout extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = {
            language: navigator.language.slice(0,2) || 'en'
        };

        this.i18nManager = new i18nManager(this.state.language);
    }

    registrationSuccess()
    {

        /**
         * @todo Add translations
         * @body Registration success message, login error messages and Divider link messages need to use the i18nManager.
         */

        return (
            <Message info>
				Registration Successful, check your emails.&nbsp;
                <p>
                    Back to <a href="http://localhost/">Homepage</a>
                </p>
            </Message>
        );
    }

    render() 
    {
        const { title, optionalLink, optionalLinkTitle, optionalLinkText, error, success } = this.props;

        return (
            <Grid columns={2}>
                <Grid.Column width={8} only="computer" style={{ background: '#293264' }}>
                    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
                        <Grid.Column style={{ maxWidth: 350 }}>
                            <Image src="./auth/public/images/shipyard_logo_full.png" />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
                        <Grid.Column style={{ maxWidth: 350 }}>
                            <Segment raised>
                                <Responsive {...Responsive.onlyMobile}>
                                    <Segment basic padded>
                                        <Image src="./auth/public/images/shipyard_logo_icon_inverted.png" />
                                    </Segment>
                                </Responsive>
                                <Responsive {...Responsive.onlyTablet}>
                                    <Segment basic padded>
                                        <Image src="./auth/public/images/shipyard_logo_icon_inverted.png" />
                                    </Segment>
                                </Responsive>
                                <Header as="h4">{title}</Header>
                                {this.props.children}
                                <Divider horizontal>{this.i18nManager.message('layout.dividerText')}</Divider>
                                <NavLink to={optionalLink}>{optionalLinkTitle}</NavLink> {optionalLinkText}
                            </Segment>
                            {success && this.registrationSuccess()}
                            {error && <Message negative>{error}</Message>}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    optionalLink: PropTypes.string,
    optionalLinkTitle: PropTypes.string,
    optionalLinkText: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.bool
};

export default withRouter(Layout);

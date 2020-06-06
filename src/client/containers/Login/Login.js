import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { i18nManager } from '@shipyardsuite/i18n-manager';

import { setInStorage } from './../../utils/storage';

import { Layout } from './../../components';

export default class Login extends React.Component 
{
    constructor(props) 
    {
        super(props);
        
        this.state = {
            token: '',
            loginError: '',
            email: '',
            password: '',
            language: navigator.language.slice(0,2) || 'en'
        };

        this.i18nManager = new i18nManager(this.state.language);
    }
    
    componentDidMount() 
    {
        document.title = `ShipyardSuite | ${ this.i18nManager.message('login.title') }`;
    }

    /**
     * @method onLogin()
     * @description Checks if login-data is correct. Throws an error on false.
     */
    onLogin()
    {
        const { email, password } = this.state;

        this.setState({
            loginError: ''
        }, 
        () => 
        {
            fetch('/auth/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => res.json()
            ).then((json) =>
            {
                if (json.success) 
                {
                    setInStorage('botany-bay', { token: json.token });
                    
                    window.location.replace(`http://${window.location.host}/dashboard/overview/`);

                    this.setState({
                        loginError: '',
                        email: '',
                        password: '',
                        token: json.token
                    });
                }
                else
                {
                    this.setState({
                        loginError: json.message
                    });
                }
            });
        });
    }

    handleInputChange(e) 
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render()
    {   
        const { email, password, loginError } = this.state;

        return (
            <Layout
                title={this.i18nManager.message('login.title')}
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
                        placeholder={this.i18nManager.message('login.form.email')}
                    />
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder={this.i18nManager.message('login.form.password')}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <Button primary fluid size="large" onClick={this.onLogin.bind(this)}>
                        {this.i18nManager.message('login.form.button')}
                    </Button>
                </Form>
            </Layout>
        );
    }
}

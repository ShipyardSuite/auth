import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { i18nManager } from '@shipyardsuite/i18n-manager';

import { Layout } from './../../components';

export default class Register extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            signUpError: '',
            registrationSuccess: false,
            email: '',
            password: '',
            passwordValidation: '',
            language: navigator.language.slice(0,2) || 'en'
        };

        this.i18nManager = new i18nManager(this.state.language);
    }

    componentDidMount() 
    {
        document.title = `ShipyardSuite | ${ this.i18nManager.message('register.title') }`;
    }

    onSignUp() 
    {
        const { email, password, passwordValidation } = this.state;

        if (password === passwordValidation) 
        {
            fetch('/auth/api/register', {
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
                    this.setState({
                        signUpError: json.message,
                        registrationSuccess: true,
                        email: '', 
                        password: '',
                        passwordValidation: ''
                    });
                } 
                else 
                {
                    this.setState({
                        signUpError: json.message
                    });
                }
            });
        } 
        else 
        {
            this.setState({
                signUpError: 'Passwords did not match!'
            });
        }
    }

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render()
    {   
        const { email, password, passwordValidation, registrationSuccess, signUpError } = this.state;

        return (
            <Layout
                title={this.i18nManager.message('register.title')}
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
                        placeholder={this.i18nManager.message('register.form.email')}
                    />
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder={this.i18nManager.message('register.form.password')}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder={this.i18nManager.message('register.form.passwordValidation')}
                        type="password"
                        name="passwordValidation"
                        value={passwordValidation}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <Button primary fluid size="large" onClick={this.onSignUp.bind(this)}>
                        {this.i18nManager.message('register.form.button')}
                    </Button>
                </Form>
            </Layout>
        );
    }
}

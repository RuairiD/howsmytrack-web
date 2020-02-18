import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Col, Icon, Input, Form, Result, Row, Spin } from 'antd';

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const TOKEN_AUTH_MUTATION = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}`;

class UnwrappedLoginForm extends React.Component<Props, State> {
    /*
     * Component for displaying login form.
     */
    state = {
        requestSent: false,
        errorMessage: null,
        submitted: false,
    }
    
    submitForm = (username, password) => {
        this.setState({
            requestSent: true,
        })
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: TOKEN_AUTH_MUTATION,
                variables: { username, password },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (data['errors']) {
                this.setState({
                    requestSent: false,
                    submitted: false,
                    errorMessage: data['errors'][0]['message'],
                });
            } else {
                this.setState({
                    requestSent: false,
                    submitted: true,
                    errorMessage: null,
                });
                window.location.reload();
            }
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.username,
                    values.password
                )
            }
        });
    };

    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Alert message="A change to hows's my track?'s server and authentication system was made on February 16th to improve compatibility across browsers. If you are unable to sign in as a result, you may need to clear all cookies for all howsmytrack.com domains before trying again, or try signing in via an incognito/private window. We're sorry for any inconvenience this may cause." type="warning" />
                        {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        {!this.state.submitted && <Spin spinning={this.state.requestSent}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item>
                                    {this.props.form.getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please enter your username.' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                            autoFocus
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {this.props.form.getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please enter your password.' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={this.state.submitted}
                                    >
                                        Sign In
                                    </Button>
                                    <a href={apiRoot + '/accounts/password_reset'} style={{ float: 'right'}}>
                                        Forgot password?
                                    </a>
                                </Form.Item>
                            </Form>
                        </Spin>}
                        {this.state.submitted && <Result
                            status="success"
                            title="You have been signed in."
                            subTitle="Please wait to be redirected."
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({ name: 'login' })(UnwrappedLoginForm);

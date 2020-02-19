import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Col, Icon, Input, Form, Result, Row, Spin } from 'antd';

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const REGISTER_USER_MUTATION = `mutation RegisterUser($email: String!, $password: String!, $passwordRepeat: String!) {
  registerUser(email: $email, password: $password, passwordRepeat: $passwordRepeat) {
    success
    error
  }
}`;

const TOKEN_AUTH_MUTATION = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}`;

class UnwrappedRegisterForm extends React.Component<Props, State> {
    /*
     * Component for displaying user registration form.
     */
    state = {
        requestSent: false,
        errorMessage: null,
        submitted: false,
    }
    
    submitForm = (email, password, passwordRepeat) => {
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
                query: REGISTER_USER_MUTATION,
                variables: { email, password, passwordRepeat },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                requestSent: false,
                submitted: data['data']['registerUser'].success,
                errorMessage: data['data']['registerUser'].error,
            });

            // If the user successfully registers, log them in as well.
            if (data['data']['registerUser'].success) {
                fetch(apiRoot +'/graphql/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: TOKEN_AUTH_MUTATION,
                        variables: {
                            username: email,
                            password: password,
                        },
                    }),
                    credentials: 'include',
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.email,
                    values.password,
                    values.passwordRepeat
                )
            }
        });
    };

    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col>
                        {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        {!this.state.submitted && <Spin spinning={this.state.requestSent}>
                            <Form onSubmit={this.onSubmit} className="hmt-form">
                                <Form.Item>
                                    {this.props.form.getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please enter your email address.' }],
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
                                    {this.props.form.getFieldDecorator('passwordRepeat', {
                                        rules: [{ required: true, message: 'Please repeat your password.' }],
                                    })(
                                        <Input
                                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                          type="password"
                                          placeholder="Confirm Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        disabled={this.state.submitted}
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>}
                        {this.state.submitted && <Result
                            status="success"
                            title="You have been registered."
                            subTitle="Please wait to be signed in and redirected."
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({ name: 'register' })(UnwrappedRegisterForm);

import React from 'react';

import { Alert, Button, Col, Icon, Input, Form, Result, Row, Spin, Typography } from 'antd';

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const REGISTER_USER_QUERY = `mutation RegisterUser($email: String!, $password: String!, $passwordRepeat: String!) {
  registerUser(email: $email, password: $password, passwordRepeat: $passwordRepeat) {
    success
    error
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
        return fetch('http://localhost:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: REGISTER_USER_QUERY,
                variables: { email, password, passwordRepeat },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            console.log(data);
            this.setState({
                requestSent: false,
                submitted: data['data']['registerUser'].success,
                errorMessage: data['data']['registerUser'].error,
            });
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
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item>
                                    {this.props.form.getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please enter your email address.' }],
                                    })(
                                        <Input
                                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                          placeholder="Email"
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
                            subtitle="Please wait to be redirected."
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({ name: 'register' })(UnwrappedRegisterForm);

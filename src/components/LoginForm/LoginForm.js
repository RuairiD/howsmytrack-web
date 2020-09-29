import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useMutation } from 'react-query';

import apiRoot from '../../apiRoot';

import { Alert, Button, Col, Icon, Input, Form, Result, Row, Spin } from 'antd';

const TOKEN_AUTH_MUTATION = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}`;

const GA_LOGIN_CATEGORY = "login";

const UnwrappedLoginForm = ({ form }) => {
    /*
     * Component for displaying login form.
     */
    useEffect(() => {
        ReactGA.event({
            category: GA_LOGIN_CATEGORY,
            action: "view",
        });
    }, []);
    
    const submitForm = async ({ username, password }) => {
        ReactGA.event({
            category: GA_LOGIN_CATEGORY,
            action: "submit",
        });
        const result = await fetch(apiRoot + '/graphql/', {
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
        });
        return await result.json();
    };

    const [submitFormMutate, { isLoading, data }] = useMutation(submitForm);

    if (data) {
        if (data.errors) {
            ReactGA.event({
                category: GA_LOGIN_CATEGORY,
                action: "error",
            });
        } else {
            ReactGA.event({
                category: GA_LOGIN_CATEGORY,
                action: "success",
            });
            window.location.reload();
        }
    }

    const submitted = (data && !data.errors);

    const onSubmit = (event) => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                submitFormMutate({
                    username: values.username,
                    password: values.password,
                })
            }
        });
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col>
                    {data && data.error && <Alert message={data.error} type="error" showIcon />}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col>
                    {!submitted && <Spin spinning={isLoading}>
                        <Form onSubmit={onSubmit} className="hmt-form">
                            <Form.Item>
                                {form.getFieldDecorator('username', {
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
                                {form.getFieldDecorator('password', {
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
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={submitted}
                                >
                                    Sign In
                                </Button>
                                <a href={apiRoot + '/accounts/password_reset'} style={{ float: 'right'}}>
                                    Forgot password?
                                </a>
                            </Form.Item>
                        </Form>
                    </Spin>}
                    {submitted && <Result
                        status="success"
                        title="You have been signed in."
                        subTitle="Please wait to be redirected."
                    />}
                </Col>
            </Row>
        </div>
    );
}

export default Form.create({ name: 'login' })(UnwrappedLoginForm);

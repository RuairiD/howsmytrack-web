import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useMutation } from "react-query";

import { Alert, Button, Col, Icon, Input, Form, Result, Row, Spin } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";

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

const GA_REGISTER_CATEGORY = "register";

const UnwrappedRegisterForm = ({ form }) => {
    /*
     * Component for displaying user registration form.
     */

    // Remember username and password so we can use it to log the user in
    // after they register.
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        ReactGA.event({
            category: GA_REGISTER_CATEGORY,
            action: "view",
        });
    }, []);

    const submitForm = ({ formEmail, formPassword, passwordRepeat }) => {
        ReactGA.event({
            category: GA_REGISTER_CATEGORY,
            action: "submit",
        });
        setEmail(formEmail);
        setPassword(formPassword);
        return fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: REGISTER_USER_MUTATION,
                variables: { email: formEmail, password: formPassword, passwordRepeat },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.registerUser);
    };

    const [submitFormMutate, { isLoading, data }] = useMutation(submitForm);

    if (data) {
        // If the user successfully registers, log them in as well.
        if (data.success) {
            ReactGA.event({
                category: GA_REGISTER_CATEGORY,
                action: "success",
            });
            fetch(`${apiRoot}/graphql/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query: TOKEN_AUTH_MUTATION,
                    variables: {
                        username: email,
                        password,
                    },
                }),
                credentials: "include",
            }).then(() => {
                window.location.reload();
            });
        } else {
            ReactGA.event({
                category: GA_REGISTER_CATEGORY,
                action: "error",
            });
        }
    }

    const submitted = (data && data.success);

    const onSubmit = (event) => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                submitFormMutate({
                    formEmail: values.email,
                    formPassword: values.password,
                    passwordRepeat: values.passwordRepeat,
                });
            }
        });
    };

    return (
        <Div>
            <Row gutter={[16, 16]}>
                <Col>
                    {data && data.error && <Alert message={data.error} type="error" showIcon />}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col>
                    {!submitted && (
                        <Spin spinning={isLoading}>
                            <Form onSubmit={onSubmit} className="hmt-form">
                                <Form.Item>
                                    {form.getFieldDecorator("email", {
                                        rules: [{ required: true, message: "Please enter your email address." }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            placeholder="Email"
                                            autoFocus
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {form.getFieldDecorator("password", {
                                        rules: [{ required: true, message: "Please enter your password." }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {form.getFieldDecorator("passwordRepeat", {
                                        rules: [{ required: true, message: "Please repeat your password." }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
                                        disabled={isLoading || submitted}
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    )}
                    {submitted && (
                        <Result
                            status="success"
                            title="You have been registered."
                            subTitle="Please wait to be signed in and redirected."
                        />
                    )}
                </Col>
            </Row>
        </Div>
    );
};

export default Form.create({ name: "register" })(UnwrappedRegisterForm);

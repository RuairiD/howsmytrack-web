import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useMutation } from "react-query";
import axios from "axios";

import { Alert, Col, Result, Row, Spin } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";
import UnwrappedRegisterForm from "./UnwrappedRegisterForm";

const REGISTER_USER_MUTATION = `mutation RegisterUser($email: String!, $password: String!, $passwordRepeat: String!) {
  registerUser(email: $email, password: $password, passwordRepeat: $passwordRepeat) {
    success
    error
  }
}`;

const TOKEN_AUTH_MUTATION = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    payload
  }
}`;

const GA_REGISTER_CATEGORY = "register";

const UnwrappedRegisterFormController = ({ form }) => {
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

    const submitForm = async ({ formEmail, formPassword, passwordRepeat }) => {
        ReactGA.event({
            category: GA_REGISTER_CATEGORY,
            action: "submit",
        });
        setEmail(formEmail);
        setPassword(formPassword);
        const response = await axios.post(`${apiRoot()}/graphql/`, {
            query: REGISTER_USER_MUTATION,
            variables: { email: formEmail, password: formPassword, passwordRepeat },
        });
        return response.data.data.registerUser;
    };

    const [submitFormMutate, { isLoading, data }] = useMutation(submitForm);

    if (data) {
        // If the user successfully registers, log them in as well.
        if (data.success) {
            ReactGA.event({
                category: GA_REGISTER_CATEGORY,
                action: "success",
            });
            axios.post(`${apiRoot()}/graphql/`, {
                query: TOKEN_AUTH_MUTATION,
                variables: {
                    username: email,
                    password,
                },
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
                            <UnwrappedRegisterForm
                                onSubmit={onSubmit}
                                form={form}
                                disabled={isLoading || submitted}
                            />
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

export default UnwrappedRegisterFormController;

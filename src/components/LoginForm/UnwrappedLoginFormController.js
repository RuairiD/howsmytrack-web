import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { useMutation } from "react-query";
import axios from "axios";

import { Alert, Col, Result, Row, Spin } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";
import UnwrappedLoginForm from "./UnwrappedLoginForm";

const TOKEN_AUTH_MUTATION = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    payload
  }
}`;

const GA_LOGIN_CATEGORY = "login";

const UnwrappedLoginFormController = ({ form, showRegisterButton, largeButtons }) => {
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
        const response = await axios.post(`${apiRoot()}/graphql/`, {
            query: TOKEN_AUTH_MUTATION,
            variables: { username, password },
        });
        return response.data;
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
                });
            }
        });
    };

    return (
        <Div>
            <Row gutter={[16, 16]}>
                <Col>
                    {data && data.errors && <Alert message={data.errors[0].message} type="error" showIcon />}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col>
                    {!submitted && (
                        <Spin spinning={isLoading}>
                            <UnwrappedLoginForm
                                form={form}
                                onSubmit={onSubmit}
                                submitted={submitted}
                                showRegisterButton={showRegisterButton}
                                largeButtons={largeButtons}
                            />
                        </Spin>
                    )}
                    {submitted && (
                        <Result
                            status="success"
                            title="You have been signed in."
                            subTitle="Please wait to be redirected."
                        />
                    )}
                </Col>
            </Row>
        </Div>
    );
};

export default UnwrappedLoginFormController;

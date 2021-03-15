import React, { useState } from "react";

import { Button, Icon, Input, Form } from "antd";
import { A, Div, Span } from "lemon-reset";
import apiRoot from "../../apiRoot";
import RegisterModal from "../RegisterModal/RegisterModal";

const UnwrappedLoginForm = ({ onSubmit, form, submitted, showRegisterButton, largeButtons }) => {
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const showRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const onRegisterModalCancel = () => {
        setIsRegisterModalVisible(false);
    };
    return (
        <Div>
            <Form onSubmit={onSubmit} className="hmt-form">
                <Form.Item>
                    {form.getFieldDecorator("username", {
                        rules: [{ required: true, message: "Please enter your username." }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Email"
                            aria-label="Email"
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
                            aria-label="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        size={largeButtons ? "large" : "default"}
                        className="black-button"
                        type="primary"
                        htmlType="submit"
                        disabled={submitted}
                    >
                        Sign In
                    </Button>
                    {showRegisterButton && (
                        <Button
                            block
                            size={largeButtons ? "large" : "default"}
                            className="black-button d-flex"
                            onClick={showRegisterModal}
                            disabled={submitted}
                        >
                            <Div className="d-flex m-auto">
                                <Span className="d-none d-sm-inline-block my-auto">
                                    Don't have an account? Sign up free
                                </Span>
                                <Span className="d-inline-block d-sm-none my-auto">
                                    Sign up free
                                </Span>
                                <Icon type="arrow-right" className="my-auto ms-1" />
                            </Div>
                        </Button>
                    )}
                    <A href={`${apiRoot()}/accounts/password_reset`} style={{ float: "right" }}>
                        Forgot password?
                    </A>
                </Form.Item>
            </Form>
            <RegisterModal onCancel={onRegisterModalCancel} isVisible={isRegisterModalVisible} />
        </Div>
    );
};

export default UnwrappedLoginForm;

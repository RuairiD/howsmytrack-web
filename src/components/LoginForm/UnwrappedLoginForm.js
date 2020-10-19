import React from "react";

import { Button, Icon, Input, Form } from "antd";
import { A } from "lemon-reset";
import apiRoot from "../../apiRoot";

const UnwrappedLoginForm = ({ onSubmit, form, submitted }) => (
    <Form onSubmit={onSubmit} className="hmt-form">
        <Form.Item>
            {form.getFieldDecorator("username", {
                rules: [{ required: true, message: "Please enter your username." }],
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
            <Button
                block
                type="primary"
                htmlType="submit"
                disabled={submitted}
            >
                Sign In
            </Button>
            <A href={`${apiRoot}/accounts/password_reset`} style={{ float: "right" }}>
                Forgot password?
            </A>
        </Form.Item>
    </Form>
);

export default UnwrappedLoginForm;

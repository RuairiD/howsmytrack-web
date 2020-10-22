import React from "react";

import { Button, Icon, Input, Form } from "antd";

const UnwrappedRegisterForm = ({
    onSubmit,
    form,
    disabled,
}) => (
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
                disabled={disabled}
            >
                Register
            </Button>
        </Form.Item>
    </Form>
);

export default UnwrappedRegisterForm;

import React from "react";

import { Menu, Icon, Typography } from "antd";
import { A, Span } from "lemon-reset";

const LoggedOutMenu = ({ onMenuClick }) => (
    <Menu
        theme="light"
        onClick={onMenuClick}
        style={{
            borderRight: 0,
        }}
    >
        <Menu.Item disabled>
            <Typography.Text>Welcome!</Typography.Text>
        </Menu.Item>
        <Menu.Item key="login">
            <Icon type="user" />
            <Span>Sign In</Span>
        </Menu.Item>
        <Menu.Item key="register">
            <Icon type="user-add" />
            <Span>Register</Span>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq">
                <Icon type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
    </Menu>
);

export default LoggedOutMenu;

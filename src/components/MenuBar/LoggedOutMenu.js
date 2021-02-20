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
        <Menu.Item className="d-flex" key="login">
            <Icon className="align-middle my-auto" type="user" />
            <Span>Sign In</Span>
        </Menu.Item>
        <Menu.Item className="d-flex" key="register">
            <Icon className="align-middle my-auto" type="user-add" />
            <Span>Register</Span>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq" className="d-flex">
                <Icon className="align-middle my-auto" type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
    </Menu>
);

export default LoggedOutMenu;

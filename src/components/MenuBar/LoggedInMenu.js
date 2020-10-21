import React from "react";

import { Badge, Menu, Icon } from "antd";
import { A, Span } from "lemon-reset";

import UserDetails from "./UserDetails";

const LoggedInMenu = ({ onMenuClick, username, rating, notifications }) => (
    <Menu
        theme="light"
        onClick={onMenuClick}
        style={{
            marginBottom: "auto",
            borderRight: 0,
        }}
    >
        <UserDetails
            username={username}
            rating={rating}
        />
        <Menu.Item key="newRequest">
            <Icon type="plus" />
            <Span>New Request</Span>
        </Menu.Item>
        <Menu.Item key="feedbackGroups">
            <A href="/groups">
                <Icon type="team" />
                <Span>Your Groups</Span>
                <Badge
                    count={notifications}
                    style={{ marginLeft: "0.5em" }}
                />
            </A>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq">
                <Icon type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="settings">
            <A href="/settings">
                <Icon type="setting" />
                <Span>Settings</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="logout">
            <Icon type="user-delete" />
            <Span>Sign Out</Span>
        </Menu.Item>
    </Menu>
);

export default LoggedInMenu;

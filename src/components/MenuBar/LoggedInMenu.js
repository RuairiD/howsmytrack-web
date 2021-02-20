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
        <Menu.Item key="newRequest" className="d-flex">
            <Icon className="align-middle my-auto" type="plus" />
            <Span>New Request</Span>
        </Menu.Item>
        <Menu.Item key="feedbackGroups">
            <A href="/groups" className="d-flex">
                <Icon className="align-middle my-auto" type="team" />
                <Span>Your Groups</Span>
                <Badge
                    count={notifications}
                    style={{ marginLeft: "0.5em" }}
                    className="align-middle my-auto"
                />
            </A>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq" className="d-flex">
                <Icon className="align-middle my-auto" type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="settings">
            <A href="/settings" className="d-flex">
                <Icon className="align-middle my-auto" type="setting" />
                <Span>Settings</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="logout" className="d-flex">
            <Icon className="align-middle my-auto" type="user-delete" />
            <Span>Sign Out</Span>
        </Menu.Item>
    </Menu>
);

export default LoggedInMenu;

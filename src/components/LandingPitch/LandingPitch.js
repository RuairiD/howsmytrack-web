import React from "react";

import { Divider, Icon, List, Typography } from "antd";
import { Div, Img } from "lemon-reset";
import LoginForm from "../LoginForm/LoginForm";

const STEPS = [
    {
        icon: "plus",
        text: "Submit your track.",
    },
    {
        icon: "usergroup-add",
        text: "Join a group.",
    },
    {
        icon: "edit",
        text: "Write feedback for your peers.",
    },
    {
        icon: "check",
        text: "Read your own feedback.",
    },
    {
        icon: "rollback",
        text: "Repeat.",
    },
];

const LandingPitch = () => (
    /*
     * Component for displaying FAQ page explaining what How's My Track? is etc.
     */
    <Div style={{ textAlign: "center" }}>
        <Div>
            <Img alt="how's my track" src="/logo512.png" height="256px" width="256px" style={{ marginBottom: "2em" }} />
        </Div>
        <List
            style={{ display: "inline-block", textAlign: "left", marginBottom: "1em" }}
            itemLayout="vertical"
            dataSource={STEPS}
            renderItem={(step) => (
                <Typography.Title level={4} style={{ display: "flex" }}>
                    <Icon type={step.icon} style={{ marginRight: "2em" }} />
                    <Div>{step.text}</Div>
                </Typography.Title>
            )}
        />
        <Divider />
        <Div style={{ display: "flex" }}>
            <Div style={{ width: "24em", marginLeft: "auto", marginRight: "auto" }}>
                <LoginForm showRegisterButton largeButtons />
            </Div>
        </Div>
    </Div>
);

export default LandingPitch;

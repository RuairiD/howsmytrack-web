import React from "react";

import { Menu, Icon } from "antd";
import { A, Div, Span } from "lemon-reset";

const SocialLinksMenu = ({ isMobile, onMenuClick }) => {
    let style = {};
    if (!isMobile) {
        style = {
            position: "absolute",
            bottom: "0px",
        };
    }
    return (
        <Div style={style}>
            <Menu
                theme="light"
                onClick={onMenuClick}
                style={{
                    borderRight: 0,
                }}
            >
                {isMobile && <Menu.Divider />}
                <Menu.Item className="ant-menu-item">
                    <A href="https://twitter.com/howsmytrackcom" target="_blank" rel="noopener noreferrer" className="d-flex">
                        <Icon className="align-middle my-auto" type="twitter" />
                        <Span>Twitter</Span>
                    </A>
                </Menu.Item>
                <Menu.Item className="ant-menu-item">
                    <A href="https://discord.gg/6jGFP6N" target="_blank" rel="noopener noreferrer" className="d-flex">
                        <Icon className="align-middle my-auto" type="robot" />
                        <Span>Discord</Span>
                    </A>
                </Menu.Item>
            </Menu>
        </Div>
    );
};

export default SocialLinksMenu;

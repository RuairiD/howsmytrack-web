import React from "react";

import { Menu, Icon, Typography } from "antd";
import { Div } from "lemon-reset";

const UserDetails = ({ username, rating }) => {
    if (rating) {
        return (
            <Menu.Item disabled className="ant-menu-item">
                <Div style={{ display: "flex" }}>
                    <Typography.Text
                        ellipsis
                        style={{
                            marginRight: "auto",
                            marginTop: "auto",
                            marginBottom: "auto",
                        }}
                    >
                        {username}
                    </Typography.Text>
                    <Typography.Text
                        strong
                        style={{
                            marginLeft: "auto",
                            marginTop: "auto",
                            marginBottom: "auto",
                        }}
                    >
                        {rating.toFixed(2)}<Icon type="star" />
                    </Typography.Text>
                </Div>
            </Menu.Item>
        );
    }
    return (
        <Menu.Item disabled className="ant-menu-item">
            <Div style={{ display: "flex" }}>
                <Typography.Text
                    ellipsis
                    style={{
                        marginRight: "auto",
                        marginTop: "auto",
                        marginBottom: "auto",
                    }}
                >
                    {username}
                </Typography.Text>
            </Div>
        </Menu.Item>
    );
};

export default UserDetails;

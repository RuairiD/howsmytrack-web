import React from "react";

import { Menu, Icon, Typography } from "antd";
import { Div } from "lemon-reset";

const UserDetails = ({ username, rating }) => {
    if (rating) {
        return (
            <Menu.Item disabled className="ant-menu-item">
                <Div className="d-flex">
                    <Typography.Text
                        ellipsis
                        className="my-auto me-auto"
                    >
                        {username}
                    </Typography.Text>
                    <Typography.Text
                        strong
                        className="my-auto ms-auto"
                    >
                        <Div className="d-flex">
                            {rating.toFixed(2)}
                            <Icon className="my-auto align-middle" type="star" />
                        </Div>
                    </Typography.Text>
                </Div>
            </Menu.Item>
        );
    }
    return (
        <Menu.Item disabled className="ant-menu-item">
            <Div className="d-flex">
                <Typography.Text
                    ellipsis
                    className="my-auto me-auto"
                >
                    {username}
                </Typography.Text>
            </Div>
        </Menu.Item>
    );
};

export default UserDetails;

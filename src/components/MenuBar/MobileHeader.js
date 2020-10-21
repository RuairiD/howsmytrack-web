import React from "react";

import { Badge, Typography } from "antd";
import { Div, Img, Span } from "lemon-reset";

const MobileHeader = ({ mobileMenuCollapsed, notifications }) => (
    <Div style={{ display: "flex" }}>
        <Span style={{
            marginTop: "auto",
            marginBottom: "auto",
        }}
        >
            <Typography.Text>
                how's my track?
            </Typography.Text>
            {mobileMenuCollapsed && (
                <Badge
                    count={notifications}
                    style={{
                        marginLeft: "0.5em",
                    }}
                />
            )}
        </Span>
        <Img
            alt=""
            src="/logo128.png"
            style={{
                marginLeft: "auto",
                width: "32px",
                height: "32px",
            }}
        />
    </Div>
);

export default MobileHeader;

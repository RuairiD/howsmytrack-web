import React from "react";

import { Badge, Typography } from "antd";
import { A, Div } from "lemon-reset";

const CardTitle = ({ feedbackGroupId, name, unreadReplies }) => (
    <A href={`/group/${feedbackGroupId}`}>
        <Div style={{ display: "flex" }}>
            <Typography.Title level={4} style={{ marginRight: "auto", marginBottom: "auto", marginTop: "auto" }}>
                {name}
            </Typography.Title>
            <Badge
                count={unreadReplies}
                style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "auto" }}
            />
        </Div>
    </A>
);

export default CardTitle;

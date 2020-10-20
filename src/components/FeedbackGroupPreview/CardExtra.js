import React from "react";
import dateFormat from "dateformat";

import { Button, Typography } from "antd";
import { Div } from "lemon-reset";

const formatTimeCreated = (timeCreated) => dateFormat(
    new Date(Date.parse(timeCreated)),
    "mmmm dS yyyy",
);

const CardExtra = ({ timeCreated }) => (
    <Div style={{ display: "flex", marginTop: "1em" }}>
        <Typography.Text style={{
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
        }}
        >
            {formatTimeCreated(timeCreated)}
        </Typography.Text>
        <Typography.Text style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
        }}
        >
            <Button type="link">View Group</Button>
        </Typography.Text>
    </Div>
);

export default CardExtra;

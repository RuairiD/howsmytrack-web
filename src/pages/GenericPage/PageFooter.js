import React from "react";

import { Divider, Typography } from "antd";
import { A, Div } from "lemon-reset";

const PageFooter = () => (
    <Div style={{ textAlign: "center" }}>
        <Divider />
        <Typography.Paragraph>
            <Typography.Text strong>
                <A target="_blank" rel="noopener noreferrer" href="http://ruairidorrity.com">ruairi dorrity</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="http://ruairidx.com">ruairi dx</A>
            </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>source</Typography.Text><br />
            <Typography.Text>
                <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-api">api</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-web">web</A>
            </Typography.Text>
        </Typography.Paragraph>
    </Div>
);

export default PageFooter;

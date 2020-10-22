import React from "react";

import { Col, Row, Typography } from "antd";
import { Div } from "lemon-reset";

import MediaEmbed from "../MediaEmbed/MediaEmbed";

const OriginalRequest = ({ mediaUrl, mediaType, feedbackPrompt }) => (
    <Div>
        <Row gutter={[16, 16]}>
            <Col>
                <MediaEmbed mediaUrl={mediaUrl} mediaType={mediaType} />
            </Col>
        </Row>
        {
            feedbackPrompt && (
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>The requester has said: </Typography.Text>
                        <Typography.Text>"{feedbackPrompt}"</Typography.Text>
                    </Col>
                </Row>
            )
        }
    </Div>
);

export default OriginalRequest;

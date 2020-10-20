import React from "react";

import { Row, Col, Typography } from "antd";

import MediaEmbed from "../MediaEmbed/MediaEmbed";

const RequestForGroup = ({ mediaUrl, mediaType }) => {
    if (mediaUrl) {
        return (
            <Row gutter={[16, 16]}>
                <Col>
                    <Typography.Text strong>You submitted:</Typography.Text>
                    <MediaEmbed
                        mediaUrl={mediaUrl}
                        mediaType={mediaType}
                        size="small"
                    />
                </Col>
            </Row>
        );
    }
    return (
        <Row gutter={[16, 16]}>
            <Col>
                <Typography.Text strong>You did not submit a track for this group.</Typography.Text>
            </Col>
        </Row>
    );
};

export default RequestForGroup;

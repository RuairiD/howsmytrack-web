import React from "react";

import { Col, Divider, Row, Typography } from "antd";

import FeedbackRequestSummary from "../FeedbackRequestSummary/FeedbackRequestSummary";
import ReceivedFeedback from "./ReceivedFeedback";

const FeedbackGroupRequest = ({ feedbackRequestSummary, feedbackReceived }) => (
    <React.Fragment>
        <Divider />

        <Row gutter={[16, 16]}>
            <Col>
                <Typography.Title level={3}>Feedback for your submission</Typography.Title>
                <FeedbackRequestSummary
                    feedbackRequestSummary={feedbackRequestSummary}
                />
            </Col>
        </Row>

        <Row gutter={[16, 16]}>
            <Col>
                <ReceivedFeedback feedbackReceived={feedbackReceived} />
            </Col>
        </Row>
    </React.Fragment>
);

export default FeedbackGroupRequest;

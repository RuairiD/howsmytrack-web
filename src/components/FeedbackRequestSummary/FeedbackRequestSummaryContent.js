import React from "react";

import { Row, Col, Typography } from "antd";
import { Div } from "lemon-reset";
import GENRE_OPTIONS from "../../genres";
import type { FeedbackRequestSummaryProps } from "./FeedbackRequestSummary";
import FeedbackRequestSummaryMedia from "./FeedbackRequestSummaryMedia";

type Props = {
    feedbackRequestSummary: FeedbackRequestSummaryProps,
};

/*
 * Component for inline feedback request preview shown on FeedbackGroupsPage and in FeedbackRequestForm
 */
const FeedbackRequestSummaryContent = ({ feedbackRequestSummary }: Props) => (
    <Div>
        <Row gutter={[16, 16]}>
            <Col>
                <FeedbackRequestSummaryMedia
                    mediaUrl={feedbackRequestSummary.mediaUrl}
                    mediaType={feedbackRequestSummary.mediaType}
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col>
                <Typography.Text strong>Genre: </Typography.Text>
                <Typography.Text>{GENRE_OPTIONS[feedbackRequestSummary.genre]}</Typography.Text>
            </Col>
        </Row>
        {feedbackRequestSummary.mediaUrl && (
            <Row>
                {feedbackRequestSummary.feedbackPrompt && (
                    <Col>
                        <Typography.Text strong>You said: </Typography.Text>
                        <Typography.Text>"{feedbackRequestSummary.feedbackPrompt}"</Typography.Text>
                    </Col>
                )}
                {!feedbackRequestSummary.feedbackPrompt && (
                    <Col>
                        <Typography.Text strong>You did not provide any additional information for feedback.</Typography.Text>
                    </Col>
                )}
            </Row>
        )}
    </Div>
);

export default FeedbackRequestSummaryContent;

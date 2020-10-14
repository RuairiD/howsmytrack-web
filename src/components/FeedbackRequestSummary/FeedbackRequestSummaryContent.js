import React from 'react';

import { Row, Alert, Col, Typography } from 'antd';
import { Div } from 'lemon-reset';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import GENRE_OPTIONS from '../../genres';
import type { FeedbackRequestSummaryProps } from './FeedbackRequestSummary';

const Media = ({ mediaUrl, mediaType }) => {
    if (!mediaUrl) {
        return (
            <Alert
                message="No track has been provided for this request. You'll be able to join a group and provide feedback for others, but you won't receive any feedback for yourself."
                type="info"
                showIcon
            />
        )
    }
    if (!mediaType) {
        return (
            <Alert
                message="Unable to play media. Invalid URL."
                type="error"
                showIcon
            />
        )
    }
    return <MediaEmbed mediaUrl={mediaUrl} mediaType={mediaType} />
}

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
                <Media
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
        {feedbackRequestSummary.mediaUrl && <Row>
            {feedbackRequestSummary.feedbackPrompt && <Col>
                <Typography.Text strong>You said: </Typography.Text>
                <Typography.Text>"{feedbackRequestSummary.feedbackPrompt}"</Typography.Text>
            </Col>}
            {!feedbackRequestSummary.feedbackPrompt && <Col>
                <Typography.Text strong>You did not provide any additional information for feedback.</Typography.Text>
            </Col>}
        </Row>}
    </Div>
);

export default FeedbackRequestSummaryContent;

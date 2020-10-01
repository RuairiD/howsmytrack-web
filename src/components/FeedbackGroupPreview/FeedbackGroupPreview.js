import React from 'react';
import dateFormat from 'dateformat';

import { Badge, Button, Card, Row, Col, Icon, Progress, Tooltip, Typography } from 'antd';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

const FEEDBACK_FOR_THEM_TOOLTIP = "How many tracks you've written feedback for in this group."
const FEEDBACK_FOR_YOU_TOOLTIP = "How many members of this group have written feedback for your track (this number is hidden if you have not yet written feedback for everyone in your group)"

export type FeedbackGroupPreviewProps = {
    feedbackGroupId: number,
    name: string,
    timeCreated: string,
    // The user's original request for the group
    feedbackRequestSummary: FeedbackRequestSummaryProps,
    // Number of users in the group with tracks
    userCount: number,
    // Number of users in the group without tracks
    tracklessUserCount: number,
    // Number of submissions in the group for which the logged-in user has submitted feedback
    userFeedbackCount: number,
    // Number of group members who have submitted feedback for the user
    feedbackResponseCount: number,
    // Number of replies sent to the user that haven't been read yet.
    unreadReplies: number,
};

const getUserFeedbackPercent = (userFeedbackCount, userCount) => {
    return 100 * (userFeedbackCount/userCount)
};

const getUserFeedbackText = (userFeedbackCount, userCount) => {
    return userFeedbackCount + '/' + userCount
};

const getFeedbackResponsePercent = (feedbackResponseCount, userCount, tracklessUserCount) => {
    return 100 * (feedbackResponseCount/(userCount + tracklessUserCount))
};

const getFeedbackResponseText = (feedbackResponseCount, userCount, tracklessUserCount) => {
    return feedbackResponseCount + '/' + (userCount + tracklessUserCount)
};

const buildFeedbackGroupUrl = (feedbackGroupId) => {
    return '/group/' + feedbackGroupId;
};

const formatTimeCreated = (timeCreated) => {
    if (!timeCreated) {
        return '';
    }
    return dateFormat(
        new Date(Date.parse(timeCreated)),
        'mmmm dS yyyy',
    );
};

const CardExtra = ({ timeCreated }) => (
    <div style={{ display: 'flex', marginTop: '1em' }}>
        <Typography.Text style={{
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
        }}>
            {formatTimeCreated(timeCreated)}
        </Typography.Text>
        <Typography.Text style={{
            marginLeft: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
        }}>
            <Button type="link">View Group</Button>
        </Typography.Text>
    </div>
);

const RequestForGroup = ({ mediaUrl, mediaType }) =>{
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
}

/*
 * Component for inline group preview shown on FeedbackGroupsPage
 */
const FeedbackGroupPreview = ({
    feedbackGroupId,
    name,
    timeCreated,
    feedbackRequestSummary,
    userCount,
    tracklessUserCount,
    userFeedbackCount,
    feedbackResponseCount,
    unreadReplies,
}: FeedbackGroupPreviewProps) =>  (
    <div>
        <Card
            title={(
                <a href={buildFeedbackGroupUrl(feedbackGroupId)}>
                    <div style={{ display: 'flex' }}>
                        <Typography.Title level={4} style={{ marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto' }}>
                            {name}
                        </Typography.Title>
                        <Badge
                            count={unreadReplies}
                            style={{ marginLeft: 'auto', marginBottom: 'auto', marginTop: 'auto' }}
                        />
                    </div>
                </a>
            )}
        >
            <a href={buildFeedbackGroupUrl(feedbackGroupId)}>
                <RequestForGroup mediaUrl={feedbackRequestSummary.mediaUrl} mediaType={feedbackRequestSummary.mediaType} />
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>Feedback for them</Typography.Text>
                        <Tooltip
                            title={FEEDBACK_FOR_THEM_TOOLTIP}
                        >
                            <Button type="link"><Icon type="question-circle" /></Button>
                        </Tooltip>
                        <Progress
                            percent={getUserFeedbackPercent(userFeedbackCount, userCount)}
                            format={() => getUserFeedbackText(userFeedbackCount, userCount)}
                            width={80}
                        />
                    </Col>
                </Row>
                {feedbackRequestSummary.mediaUrl && <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>Feedback for you</Typography.Text>
                        <Tooltip
                            title={FEEDBACK_FOR_YOU_TOOLTIP}
                        >
                            <Button type="link"><Icon type="question-circle" /></Button>
                        </Tooltip>
                        <Progress
                            percent={getFeedbackResponsePercent(feedbackResponseCount, userCount, tracklessUserCount)}
                            format={() => getFeedbackResponseText(feedbackResponseCount, userCount, tracklessUserCount)}
                            width={80}
                        />
                    </Col>
                </Row>}
                <Card.Meta description={<CardExtra timeCreated={timeCreated} />} />
            </a>
        </Card>
    </div>
);

export default FeedbackGroupPreview;

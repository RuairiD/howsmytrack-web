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

class FeedbackGroupPreview extends React.Component<FeedbackGroupPreviewProps> {
    /*
     * Component for inline group preview shown on FeedbackGroupsPage
     */
    getUserFeedbackPercent = () => {
        return 100 * (this.props.userFeedbackCount/(this.props.userCount))
    };

    getUserFeedbackText = () => {
        return this.props.userFeedbackCount + '/' + (this.props.userCount)
    };

    getFeedbackResponsePercent = () => {
        return 100 * (this.props.feedbackResponseCount/(this.props.userCount + this.props.tracklessUserCount))
    };

    getFeedbackResponseText = () => {
        return this.props.feedbackResponseCount + '/' + (this.props.userCount + this.props.tracklessUserCount)
    };

    buildFeedbackGroupUrl = () => {
        return '/group/' + this.props.feedbackGroupId;
    };

    getTimeCreated = () => {
        if (!this.props.timeCreated) {
            return '';
        }
        return dateFormat(
            new Date(Date.parse(this.props.timeCreated)),
            'mmmm dS yyyy',
        );
    };

    getCardExtra = () => {
        return (
            <div style={{ display: 'flex', marginTop: '1em' }}>
                <Typography.Text style={{
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    {this.getTimeCreated()}
                </Typography.Text>
                <Typography.Text style={{
                    marginLeft: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    <Button type="link">View Group</Button>
                </Typography.Text>
            </div>
        )
    };

    renderMedia = () => {
        if (this.props.feedbackRequestSummary.mediaUrl) {
            return (
                <div>
                    <Typography.Text strong>You submitted:</Typography.Text>
                    <MediaEmbed
                        mediaUrl={this.props.feedbackRequestSummary.mediaUrl}
                        mediaType={this.props.feedbackRequestSummary.mediaType}
                        size="small"
                    />
                </div>
            )
        }
        return (
            <div>
                <Typography.Text strong>You did not submit a track for this group.</Typography.Text>
            </div>
        )
    };

    render() {
        return (
            <div>
                <Card
                    title={(
                        <a href={this.buildFeedbackGroupUrl()}>
                            <div style={{ display: 'flex' }}>
                                <Typography.Title level={4} style={{ marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto' }}>{this.props.name}</Typography.Title>
                                <Badge
                                    count={this.props.unreadReplies}
                                    style={{ marginLeft: 'auto', marginBottom: 'auto', marginTop: 'auto' }}
                                />
                            </div>
                        </a>
                    )}
                >
                    <a href={this.buildFeedbackGroupUrl()}>
                        <Row gutter={[16, 16]}>
                            <Col>
                                {this.renderMedia()}
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Typography.Text strong>Feedback for them</Typography.Text>
                                <Tooltip
                                    title={FEEDBACK_FOR_THEM_TOOLTIP}
                                >
                                    <Button type="link"><Icon type="question-circle" /></Button>
                                </Tooltip>
                                <Progress percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={80} />
                            </Col>
                        </Row>
                        {this.props.feedbackRequestSummary.mediaUrl && <Row gutter={[16, 16]}>
                            <Col>
                                <Typography.Text strong>Feedback for you</Typography.Text>
                                <Tooltip
                                    title={FEEDBACK_FOR_YOU_TOOLTIP}
                                >
                                    <Button type="link"><Icon type="question-circle" /></Button>
                                </Tooltip>
                                <Progress percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={80} />
                            </Col>
                        </Row>}
                        <Card.Meta description={this.getCardExtra()} />
                    </a>
                </Card>
            </div>
        );
    }
}

export default FeedbackGroupPreview;

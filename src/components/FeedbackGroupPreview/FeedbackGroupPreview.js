import React from 'react';
import dateFormat from 'dateformat';

import { Button, Card, Divider, Row, Col, Progress, Typography } from 'antd';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

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
    isMobile: boolean,
};

const CIRCULAR_PROGRESS_COLUMN_WIDTH = 5;

class FeedbackGroupPreview extends React.Component<Props> {
    /*
     * Component for inline group preview shown on FeedbackGroupsPage
     */
    getUserFeedbackPercent = () => {
        return 100 * (this.props.userFeedbackCount/(this.props.userCount - 1))
    };

    getUserFeedbackText = () => {
        return this.props.userFeedbackCount + '/' + (this.props.userCount - 1)
    };

    getFeedbackResponsePercent = () => {
        return 100 * (this.props.feedbackResponseCount/(this.props.userCount + this.props.tracklessUserCount - 1))
    };

    getFeedbackResponseText = () => {
        return this.props.feedbackResponseCount + '/' + (this.props.userCount + this.props.tracklessUserCount - 1)
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

    renderCircularProgress = () => {
        return (
            <React.Fragment>
                <Col span={CIRCULAR_PROGRESS_COLUMN_WIDTH} style={{ textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <Typography.Text strong>For them</Typography.Text>
                    <Divider style={{ margin: '0.25em 0' }} />
                    <Progress type="circle" percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={64} />
                </Col>
                {this.props.feedbackRequestSummary.mediaUrl && <Col span={CIRCULAR_PROGRESS_COLUMN_WIDTH} style={{ textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <Typography.Text strong>For you</Typography.Text>
                    <Divider style={{ margin: '0.25em 0' }} />
                    <Progress type="circle" percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={64} />
                </Col>}
            </React.Fragment>
        )
    };

    renderLinearProgress = () => {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Typography.Text strong>For them</Typography.Text>
                        <Progress percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={80} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography.Text strong>For you</Typography.Text>
                        <Progress percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={80} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    };

    getMediaEmbedColumnWidth = () => {
        if (this.props.isMobile) {
            return 24;
        }
        return 24 - CIRCULAR_PROGRESS_COLUMN_WIDTH * 2;
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
    }

    render() {
        return (
            <Card
                title={this.props.name}
            >
                <a href={this.buildFeedbackGroupUrl()}>
                    <Row gutter={[16, 16]} type="flex" justify="space-around" align="middle">
                        <Col span={this.getMediaEmbedColumnWidth()}>
                            {this.renderMedia()}
                        </Col>
                        {!this.props.isMobile && this.renderCircularProgress()}
                    </Row>
                    {this.props.isMobile && this.renderLinearProgress()}
                    <Card.Meta description={this.getCardExtra()} />
                </a>
            </Card>
        );
    }
}

export default FeedbackGroupPreview;

import React from 'react';
import dateFormat from 'dateformat';

import { Card, Divider, Row, Col, Progress, Typography } from 'antd';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

export type FeedbackGroupPreviewProps = {
    feedbackGroupId: number,
    name: string,
    timeCreated: string,
    // The user's original request for the group
    feedbackRequestSummary: FeedbackRequestSummaryProps,
    // Number of users in the group
    userCount: number,
    // Number of submissions in the group for which the logged-in user has submitted feedback
    userFeedbackCount: number,
    // Number of group members who have submitted feedback for the user
    feedbackResponseCount: number,
    isMobile: boolean,
};

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
        return 100 * (this.props.feedbackResponseCount/(this.props.userCount - 1))
    };

    getFeedbackResponseText = () => {
        return this.props.feedbackResponseCount + '/' + (this.props.userCount - 1)
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
        return <Typography.Text>
            {this.getTimeCreated() + ' - '}
            <a href={this.buildFeedbackGroupUrl()}>View Group</a>
        </Typography.Text>
    };

    renderCircularProgress = () => {
        return (
            <React.Fragment>
                <Col span={4} style={{ textAlign: 'center' }}>
                    <Typography.Text strong>For them</Typography.Text>
                    <Divider style={{ margin: '0.25em 0' }} />
                    <Progress type="circle" percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={64} />
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                    <Typography.Text strong>For you</Typography.Text>
                    <Divider style={{ margin: '0.25em 0' }} />
                    <Progress type="circle" percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={64} />
                </Col>
            </React.Fragment>
        )
    };

    renderLinearProgress = () => {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Typography.Text strong>For them</Typography.Text>
                        <Progress percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={64} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography.Text strong>For you</Typography.Text>
                        <Progress percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={64} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    };

    getMediaEmbedColumnWidth = () => {
        if (this.props.isMobile) {
            return 24;
        }
        return 16;
    };

    render() {
        return (
            <Card
                title={this.props.name}
                extra={this.getCardExtra()}
            >
                <a href={this.buildFeedbackGroupUrl()}>
                    <Row gutter={[16, 16]} type="flex" justify="space-around" align="middle">
                        <Col span={this.getMediaEmbedColumnWidth()}>
                            <Row>
                                <Col>
                                    <Typography.Text strong>You submitted:</Typography.Text>
                                </Col>
                                <Col>
                                    <MediaEmbed mediaUrl={this.props.feedbackRequestSummary.mediaUrl} mediaType={this.props.feedbackRequestSummary.mediaType} size="small" />
                                </Col>
                            </Row>
                        </Col>
                        {!this.props.isMobile && this.renderCircularProgress()}
                    </Row>
                    {this.props.isMobile && this.renderLinearProgress()}
                </a>
            </Card>
        );
    }
}

export default FeedbackGroupPreview;

import React from 'react';

import { Card, Row, Col, Progress, Typography } from 'antd';
import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

export type FeedbackGroupPreviewProps = {
    feedbackGroupId: number,
    mediaUrl: string,
    mediaType: string, // Unused until multiple media types are supported
    // Number of users in the group
    userCount: number,
    // Number of submissions in the group for which the logged-in user has submitted feedback
    userFeedbackCount: number,
    // Number of group members who have submitted feedback for the user
    feedbackResponseCount: number,
};

class FeedbackGroupPreview extends React.Component<Props> {
    /*
     * Component for inline group preview shown on FeedbackGroupsPage
     */
    getUserFeedbackPercent = () => {
        return 100 * (this.props.userFeedbackCount/(this.props.userCount - 1))
    }

    getUserFeedbackText = () => {
        return this.props.userFeedbackCount + '/' + (this.props.userCount - 1)
    }

    getFeedbackResponsePercent = () => {
        return 100 * (this.props.feedbackResponseCount/(this.props.userCount - 1))
    }

    getFeedbackResponseText = () => {
        return this.props.feedbackResponseCount + '/' + (this.props.userCount - 1)
    }

    buildFeedbackGroupUrl = () => {
        return '/group/' + this.props.feedbackGroupId;
    }

    render() {
        return (
            <a href={this.buildFeedbackGroupUrl()}>
                <Card title={"Feedback Group #"+ this.props.feedbackGroupId}>
                    <Row gutter={[16, 16]} type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Row>
                                <Col>
                                    <Typography.Text strong>You submitted:</Typography.Text>
                                </Col>
                                <Col>
                                    <SoundcloudEmbed soundcloudUrl={this.props.mediaUrl} size="small" />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} style={{ textAlign: 'center' }}>
                            <Typography.Text strong>For them</Typography.Text>
                            <Progress type="circle" percent={this.getUserFeedbackPercent()} format={this.getUserFeedbackText} width={64} />
                        </Col>
                        <Col span={4} style={{ textAlign: 'center' }}>
                            <Typography.Text strong>For you</Typography.Text>
                            <Progress type="circle" percent={this.getFeedbackResponsePercent()} format={this.getFeedbackResponseText} width={64} />
                        </Col>
                    </Row>
                </Card>
            </a>
        );
    }
}

export default FeedbackGroupPreview;

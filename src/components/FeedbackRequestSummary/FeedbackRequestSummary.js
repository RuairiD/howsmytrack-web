import React from 'react';

import { Button, Card, Row, Col, Typography } from 'antd';
import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';
import EditFeedbackRequestModal from '../EditFeedbackRequestModal/EditFeedbackRequestModal';

export type FeedbackRequestSummaryProps = {
    feedbackRequestId: number,
    mediaUrl: string,
    mediaType: string, // Unused until multiple media types are supported
    feedbackPrompt: string,
};

type State = {
    isEditFeedbackRequestModalVisible: boolean,
}

class FeedbackRequestSummary extends React.Component<Props, State> {
    /*
     * Component for inline feedback request preview shown on FeedbackGroupsPage
     * which also allows users to edit their requests.
     */
    state = {
        isEditFeedbackRequestModalVisible: false,
    };

    showEditFeedbackRequestModal = () => {
        this.setState({
            isEditFeedbackRequestModalVisible: true,
        })
    };

    hideEditFeedbackRequestModal = () => {
        this.setState({
            isEditFeedbackRequestModalVisible: false,
        })
    };

    render() {
        return (
            <div>
                <Card
                    extra={<Button
                        shape="circle"
                        icon="edit"
                        onClick={this.showEditFeedbackRequestModal}
                    />}
                >
                    <Row>
                        <Col>
                            <Typography.Text strong>You submitted:</Typography.Text>
                        </Col>
                        <Col>
                            <SoundcloudEmbed soundcloudUrl={this.props.mediaUrl} />
                        </Col>
                        {this.props.feedbackPrompt && <Col>
                            <Typography.Text strong>You said: </Typography.Text>
                            <Typography.Text>"{this.props.feedbackPrompt}"</Typography.Text>
                        </Col>}
                        {!this.props.feedbackPrompt && <Col>
                            <Typography.Text strong>You did not provide any additional information for feedback.</Typography.Text>
                        </Col>}
                    </Row>
                </Card>
                <EditFeedbackRequestModal
                    onCancel={this.hideEditFeedbackRequestModal}
                    isVisible={this.state.isEditFeedbackRequestModalVisible}
                    feedbackRequestId={this.props.feedbackRequestId}
                    mediaUrl={this.props.mediaUrl}
                    feedbackPrompt={this.props.feedbackPrompt}
                />
            </div>
        );
    }
}

export default FeedbackRequestSummary;

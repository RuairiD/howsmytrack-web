import React from 'react';

import { Button, Card, Row, Col, Typography } from 'antd';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import EditFeedbackRequestModal from '../EditFeedbackRequestModal/EditFeedbackRequestModal';

export type FeedbackRequestSummaryProps = {
    feedbackRequestId: number,
    mediaUrl: string,
    mediaType: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
};

type Props = {
    feedbackRequestSummary: FeedbackRequestSummaryProps,
    showEditButton: boolean,
};

type State = {
    isEditFeedbackRequestModalVisible: boolean,
};

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
                    title="You submitted:"
                    extra={this.props.showEditButton && <Button
                        shape="circle"
                        icon="edit"
                        onClick={this.showEditFeedbackRequestModal}
                    />}
                >
                    <Row>
                        <Col>
                            <MediaEmbed mediaUrl={this.props.feedbackRequestSummary.mediaUrl} mediaType={this.props.feedbackRequestSummary.mediaType} />
                        </Col>
                        {this.props.feedbackRequestSummary.feedbackPrompt && <Col>
                            <Typography.Text strong>You said: </Typography.Text>
                            <Typography.Text>"{this.props.feedbackRequestSummary.feedbackPrompt}"</Typography.Text>
                        </Col>}
                        {!this.props.feedbackRequestSummary.feedbackPrompt && <Col>
                            <Typography.Text strong>You did not provide any additional information for feedback.</Typography.Text>
                        </Col>}
                    </Row>
                </Card>
                <EditFeedbackRequestModal
                    onCancel={this.hideEditFeedbackRequestModal}
                    isVisible={this.state.isEditFeedbackRequestModalVisible}
                    feedbackRequestId={this.props.feedbackRequestSummary.feedbackRequestId}
                    mediaUrl={this.props.feedbackRequestSummary.mediaUrl}
                    feedbackPrompt={this.props.feedbackRequestSummary.feedbackPrompt}
                    emailWhenGrouped={this.props.feedbackRequestSummary.emailWhenGrouped}
                />
            </div>
        );
    }
}

export default FeedbackRequestSummary;

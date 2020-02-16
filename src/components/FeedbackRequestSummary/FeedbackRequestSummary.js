import React from 'react';

import apiRoot from '../../apiRoot';

import { Button, Card, Row, Col, message, Popconfirm, Result, Spin, Typography } from 'antd';
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
    showButtons: boolean,
};

type State = {
    isEditFeedbackRequestModalVisible: boolean,
    deleteRequestSent: boolean,
    requestDeleted: boolean,
};

const DELETE_FEEDBACK_REQUEST_MUTATION = `mutation DeleteFeedbackRequest($feedbackRequestId: Int!) {
    deleteFeedbackRequest(feedbackRequestId: $feedbackRequestId) {
        success
        error
    }
}`;

class FeedbackRequestSummary extends React.Component<Props, State> {
    /*
     * Component for inline feedback request preview shown on FeedbackGroupsPage
     * which also allows users to edit their requests.
     */
    state = {
        isEditFeedbackRequestModalVisible: false,
        deleteRequestSent: false,
        requestDeleted: false,
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

    deleteRequest = () => {
        this.setState({
            deleteRequestSent: true,
        })
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: DELETE_FEEDBACK_REQUEST_MUTATION,
                variables: {
                    feedbackRequestId: this.props.feedbackRequestSummary.feedbackRequestId,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['deleteFeedbackRequest'].success) {
                message.error(data['data']['deleteFeedbackRequest'].error);
            }
            this.setState({
                requestSent: false,
                requestDeleted: data['data']['deleteFeedbackRequest'].success,
            });
        });
    };

    renderButtons = () => {
        return (
            <React.Fragment>
                <Button
                    shape="circle"
                    icon="edit"
                    onClick={this.showEditFeedbackRequestModal}
                    style={{
                        marginRight: '0.5em',
                    }}
                />
                <Popconfirm
                    title="This request has not been assigned to a group. If you delete it, you will not receive any feedback on it. Are you sure you want to delete this request?"
                    onConfirm={this.deleteRequest}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        shape="circle"
                        icon="delete"
                    />
                </Popconfirm>
            </React.Fragment>
        )
    }

    render() {
        if (this.state.requestDeleted) {
            return (
                <Result
                    status="success"
                    title="This request has been deleted."
                />
            )
        }
        return (
            <Spin spinning={this.state.deleteRequestSent}>
                <Card
                    title="You submitted:"
                    extra={this.props.showButtons && this.renderButtons()}
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
            </Spin>
        );
    }
}

export default FeedbackRequestSummary;

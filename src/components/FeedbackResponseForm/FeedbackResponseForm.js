import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Alert, Button, Card, Col, Input, Row, Typography } from 'antd';

import MediaEmbed from '../MediaEmbed/MediaEmbed';
import FeedbackResponseRepliesModal from '../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal';
import { type FeedbackResponseReplyProps } from '../FeedbackResponseReply/FeedbackResponseReply';

export type FeedbackResponseFormProps = {
    feedbackResponseId: number,
    feedback: string,
    mediaUrl: string,
    mediaType: string,
    feedbackPrompt: string,
    submitted: boolean,
    allowReplies: boolean,
    allowFurtherReplies: boolean,
    replies: Array<FeedbackResponseReplyProps>,
};

type State = {
    feedback: string,
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
    isRepliesModalVisible: boolean,
};

const SUBMIT_FEEDBACK_RESPONSE_MUTATION = `mutation SubmitFeedbackResponse($feedbackResponseId: Int!, $feedback: String!) {
    submitFeedbackResponse(feedbackResponseId: $feedbackResponseId, feedback: $feedback) {
        success
        error
    }
}`;

const GA_FEEDBACK_RESPONSE_CATEGORY = "feedbackResponse";

class FeedbackResponseForm extends React.Component<FeedbackResponseFormProps, State> {
    /*
     * Component for displaying feedback form for a group member to complete.
     */
    state = {
        feedback: this.props.feedback,
        requestSent: false,
        errorMessage: null,
        submitted: this.props.submitted,
        isRepliesModalVisible: false,
    };

    componentDidMount() {
        ReactGA.event({
            category: GA_FEEDBACK_RESPONSE_CATEGORY,
            action: "view",
        });
    }

    onFeedbackTextChange = (event) => {
        this.setState({
            feedback: event.target.value,
        })
    };

    submitForm = (feedback) => {
        this.setState({
            requestSent: true,
        })
        ReactGA.event({
            category: GA_FEEDBACK_RESPONSE_CATEGORY,
            action: "submit",
        });
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: SUBMIT_FEEDBACK_RESPONSE_MUTATION,
                variables: {
                    feedbackResponseId: this.props.feedbackResponseId,
                    feedback: feedback,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                requestSent: false,
                submitted: data['data']['submitFeedbackResponse'].success,
                errorMessage: data['data']['submitFeedbackResponse'].error,
            });

            if (data['data']['submitFeedbackResponse'].success) {
                ReactGA.event({
                    category: GA_FEEDBACK_RESPONSE_CATEGORY,
                    action: "success",
                });
            } else {
                ReactGA.event({
                    category: GA_FEEDBACK_RESPONSE_CATEGORY,
                    action: "error",
                });
            }
        });
    };

    onSubmit = () => {
        this.submitForm(
            this.state.feedback,
        );
    };

    showRepliesModal = () => {
        this.setState({
            isRepliesModalVisible: true,
        })
    };

    onRepliesModalCancel = () => {
        this.setState({
            isRepliesModalVisible: false,
        })
    };

    render() {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <MediaEmbed mediaUrl={this.props.mediaUrl} mediaType={this.props.mediaType} />
                    </Col>
                </Row>
                {
                    this.props.feedbackPrompt &&
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Text strong>The requester has said: </Typography.Text>
                            <Typography.Text>"{this.props.feedbackPrompt}"</Typography.Text>
                        </Col>
                    </Row>
                }
                <div>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Input.TextArea
                                value={this.state.feedback}
                                onChange={this.onFeedbackTextChange}
                                rows={8}
                                disabled={this.state.submitted}
                            />
                            {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" showIcon />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Button
                                block
                                type="primary"
                                loading={this.state.requestSent}
                                disabled={this.state.submitted || !this.state.feedback}
                                onClick={this.onSubmit}
                            >
                                {!this.state.submitted && 'Submit Feedback'}
                                {this.state.submitted && 'Submitted'}
                            </Button>
                        </Col>
                    </Row>
                    {this.props.allowReplies && <Row gutter={[16, 16]}>
                        <Col style={{ float: 'right' }}>
                            <Button
                                type="link"
                                onClick={this.showRepliesModal}
                            >
                                {this.props.replies.length == 0 && "Leave a Reply"}
                                {this.props.replies.length == 1 && "View 1 Reply"}
                                {this.props.replies.length > 1 && ("View " + this.props.replies.length + " Replies")}
                            </Button>
                        </Col>
                    </Row>}
                </div>
                {this.props.allowReplies && <FeedbackResponseRepliesModal
                    allowFurtherReplies={this.props.allowFurtherReplies}
                    feedbackResponseId={this.props.feedbackResponseId}
                    feedback={this.props.feedback}
                    replies={this.props.replies}
                    onCancel={this.onRepliesModalCancel}
                    isVisible={this.state.isRepliesModalVisible}
                />}
            </Card>
        );
    }
}

export default FeedbackResponseForm;

import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Alert, Button, Card, Checkbox, Col, Input, Row, Typography } from 'antd';

import ViewRepliesButton from '../ViewRepliesButton/ViewRepliesButton';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import FeedbackResponseRepliesModal from '../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal';

export type FeedbackResponseFormProps = {
    feedbackResponseId: number,
    feedback: string,
    mediaUrl: string,
    mediaType: string,
    feedbackPrompt: string,
    submitted: boolean,
    allowReplies: boolean,
    replies: number,
    unreadReplies: number,
};

type State = {
    feedback: string,
    allowReplies: boolean,
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
    isRepliesModalVisible: boolean,
};

const SUBMIT_FEEDBACK_RESPONSE_MUTATION = `mutation SubmitFeedbackResponse($feedbackResponseId: Int!, $feedback: String!, $allowReplies: Boolean!) {
    submitFeedbackResponse(feedbackResponseId: $feedbackResponseId, feedback: $feedback, allowReplies: $allowReplies) {
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
        allowReplies: this.props.allowReplies,
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

    onAllowRepliesChange = (event) => {
        this.setState({
            allowReplies: event.target.checked,
        })
    };

    submitForm = (feedback, allowReplies) => {
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
                    allowReplies: allowReplies,
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
            this.state.allowReplies,
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
                            <Checkbox
                                checked={this.state.allowReplies}
                                onChange={this.onAllowRepliesChange}
                                disabled={this.state.submitted}
                            >
                                Allow the recipient to anonymously reply to your feedback.
                            </Checkbox>
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
                            <ViewRepliesButton
                                replies={this.props.replies}
                                unreadReplies={this.props.unreadReplies}
                                onClick={this.showRepliesModal}
                            />
                        </Col>
                    </Row>}
                </div>
                {this.props.allowReplies && <FeedbackResponseRepliesModal
                    feedbackResponseId={this.props.feedbackResponseId}
                    feedback={this.props.feedback}
                    onCancel={this.onRepliesModalCancel}
                    isVisible={this.state.isRepliesModalVisible}
                />}
            </Card>
        );
    }
}

export default FeedbackResponseForm;

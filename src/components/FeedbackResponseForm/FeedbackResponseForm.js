import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Card, Col, Input, Result, Row, Typography } from 'antd';

import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

export type FeedbackResponseFormProps = {
    feedbackResponseId: number,
    feedback: string,
    mediaUrl: string,
    mediaType: string, // Unused until multiple media types are supported.
    feedbackPrompt: string,
    submitted: boolean,
};

type State = {
    feedback: string,
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const SUBMIT_FEEDBACK_RESPONSE_MUTATION = `mutation SubmitFeedbackResponse($feedbackResponseId: Int!, $feedback: String!) {
    submitFeedbackResponse(feedbackResponseId: $feedbackResponseId, feedback: $feedback) {
        success
        error
    }
}`;

class FeedbackResponseForm extends React.Component<Props, State> {
    /*
     * Component for displaying feedback form for a group member to complete.
     */
    state = {
        feedback: this.props.feedback,
        requestSent: false,
        errorMessage: null,
        submitted: this.props.submitted,
    };

    onFeedbackTextChange = (event) => {
        this.setState({
            feedback: event.target.value,
        })
    };

    submitForm = (feedback) => {
        this.setState({
            requestSent: true,
        })
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
        });
    };

    onSubmit = () => {
        this.submitForm(
            this.state.feedback,
        )
    };

    render() {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <SoundcloudEmbed soundcloudUrl={this.props.mediaUrl} />
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
                {!this.state.submitted && <div>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Input.TextArea
                                value={this.state.feedback}
                                onChange={this.onFeedbackTextChange}
                                rows={4}
                            />
                            {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Button
                                type="primary"
                                loading={this.state.requestSent}
                                disabled={!this.state.feedback}
                                onClick={this.onSubmit}
                            >
                                Submit Feedback
                            </Button>
                        </Col>
                    </Row>
                </div>}
                {this.state.submitted && <Result
                    status="success"
                    title="Your feedback for this track has been submitted!"
                />}
            </Card>
        );
    }
}

export default FeedbackResponseForm;

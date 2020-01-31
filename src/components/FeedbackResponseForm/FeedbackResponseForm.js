import React from 'react';

import { Alert, Button, Card, Col, Input, Result, Row, Typography } from 'antd';

import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

export type FeedbackResponseFormProps = {
    initialFeedbackText: string,
    soundcloudUrl: string,
    feedbackPrompt: string,
    submitted: boolean,
};

type State = {
    feedbackText: string,
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

class FeedbackResponseForm extends React.Component<Props, State> {
    /*
     * Component for displayed feedback form for a group member to complete.
     */
    state = {
        feedbackText: this.props.initialFeedbackText,
        requestSent: false,
        errorMessage: null,
        submitted: this.props.submitted,
    };

    onFeedbackTextChange = (event) => {
        this.setState({
            feedbackText: event.target.value,
        })
    };

    submitForm = (feedbackText) => {
        this.setState({
            requestSent: true,
        })
        return new Promise(function(resolve, reject) {
            // TODO: AJAX request
            const error = false;
            if (!error) {
                setTimeout(resolve, 1000);
            } else {
                reject('You have already submitted feedback for this track.');
            }
        })
    };

    onSubmit = () => {
        this.submitForm(
            this.state.feedbackText,
        ).then(() => {
            this.setState({
                requestSent: false,
                submitted: true,
                errorMessage: null,
            });
        }).catch(errorMessage => {
            this.setState({
                requestSent: false,
                submitted: false,
                errorMessage: errorMessage,
            });
        })
    };

    render() {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <SoundcloudEmbed soundcloudUrl={this.props.soundcloudUrl} />
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
                                value={this.state.feedbackText}
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
                                disabled={!this.state.feedbackText}
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

import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Col, Input, Form, Result, Row, Spin } from 'antd';

type Props = {
    feedbackRequestId: number,
    soundcloudUrl: string,
    feedbackPrompt: string,
};

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const EDIT_FEEDBACK_REQUEST_MUTATION = `mutation EditFeedbackRequest($feedbackRequestId: Int!, $soundcloudUrl: String!, $feedbackPrompt: String) {
    editFeedbackRequest(feedbackRequestId: $feedbackRequestId, soundcloudUrl: $soundcloudUrl, feedbackPrompt: $feedbackPrompt) {
        success
        error
    }
}`;

class UnwrappedEditFeedbackRequestForm extends React.Component<Props, State> {
    /*
     * Component for displaying feedback request form. Enforces URL existence check locally
     * but relies on backend to check user is eligible to make a request.
     */
    state = {
        requestSent: false,
        errorMessage: null,
        submitted: false,
    }
    
    submitForm = (soundcloudUrl, feedbackPrompt) => {
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
                query: EDIT_FEEDBACK_REQUEST_MUTATION,
                variables: {
                    feedbackRequestId: this.props.feedbackRequestId,
                    soundcloudUrl,
                    feedbackPrompt
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            console.log(data);
            this.setState({
                requestSent: false,
                submitted: data['data']['editFeedbackRequest'].success,
                errorMessage: data['data']['editFeedbackRequest'].error,
            });
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.soundcloudUrl,
                    values.feedbackPrompt
                )
            }
        });
    };

    render() {
        return (
            <div>
                {this.state.errorMessage && <Row gutter={[16, 16]}>
                    <Col>
                        <Alert message={this.state.errorMessage} type="error" />
                    </Col>
                </Row>}
                <Row gutter={[16, 16]}>
                    <Col>
                        {!this.state.submitted && <Spin spinning={this.state.requestSent}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item label="Soundcloud URL">
                                    {
                                        this.props.form.getFieldDecorator('soundcloudUrl',
                                            {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please provide a Soundcloud track URL',
                                                    },
                                                ],
                                                initialValue: this.props.soundcloudUrl,
                                            }
                                        )(<Input />)
                                    }
                                </Form.Item>
                                <Form.Item label="Is there anything you would like specific feedback on? (optional)">
                                    {
                                        this.props.form.getFieldDecorator('feedbackPrompt',
                                            {
                                                rules: [
                                                    {},
                                                ],
                                                initialValue: this.props.feedbackPrompt,
                                            }
                                        )(<Input.TextArea rows={4} />)
                                    }
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={this.state.submitted}
                                    >
                                        Update Feedback Request
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>}
                        {this.state.submitted && <Result
                            status="success"
                            title="Your feedback request has been updated!"
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({ name: 'editFeedbackRequest' })(UnwrappedEditFeedbackRequestForm);;

import React from 'react';

import { Alert, Button, Col, Input, Form, Result, Row, Spin, Typography } from 'antd';

type Props = {
    onSubmit: (soundcloudUrl: string, feedbackPrompt: string) => void,
};

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
};

const CREATE_FEEDBACK_REQUEST_MUTATION = `mutation CreateFeedbackRequest($soundcloudUrl: String!, $feedbackPrompt: String) {
    createFeedbackRequest(soundcloudUrl: $soundcloudUrl, feedbackPrompt: $feedbackPrompt) {
        success
        error
    }
}`;

class UnwrappedFeedbackRequestForm extends React.Component<Props, State> {
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
        return fetch('http://localhost:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: CREATE_FEEDBACK_REQUEST_MUTATION,
                variables: { soundcloudUrl, feedbackPrompt },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            console.log(data);
            this.setState({
                requestSent: false,
                submitted: data['data']['createFeedbackRequest'].success,
                errorMessage: data['data']['createFeedbackRequest'].error,
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
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text>
                            Users are allowed to submit feedback requests once per 24 hours.
                        </Typography.Text>
                        {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
                    </Col>
                </Row>
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
                                        Submit Feedback Request
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>}
                        {this.state.submitted && <Result
                            status="success"
                            title="Your feedback request has been submitted!"
                            subTitle="You will receive an email within the next 24 hours with your group assignment."
                        />}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({ name: 'feedbackRequest' })(UnwrappedFeedbackRequestForm);;

import React from 'react';

import { Alert, Button, Input, Form, Typography } from 'antd';

type Props = {
    onSubmit: (soundcloudUrl: string, feedbackPrompt: string) => void,
};

type State = {
    errorMessage: string,
    submitted: boolean,
};

class UnwrappedFeedbackRequestForm extends React.Component<Props, State> {
    /*
     * Component for displaying feedback request form. Enforces URL existence check locally
     * but relies on backend to check user is eligible to make a request.
     */
    state = {
        errorMessage: null,
        submitted: false,
    };

    submitForm = (soundcloudUrl, feedbackPrompt) => {
        return new Promise(function(resolve, reject) {
            // TODO: AJAX request
            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('You have already submitted a feedback request. Please wait before submitting another.');
            }
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.soundcloudUrl,
                    values.feedbackPrompt
                ).then(() => {
                    this.setState({
                        submitted: true,
                        errorMessage: null,
                    });
                }).catch(errorMessage => {
                    this.setState({
                        submitted: false,
                        errorMessage: errorMessage,
                    });
                })
            }
        });
    };

    render() {
        return (
            <div>
                <Typography.Title level={2}>New Feedback Request</Typography.Title>
                <Typography.Text>
                    Users are allowed to submit feedback requests once per 24 hours.
                </Typography.Text>
                {this.state.submitted && <Alert message="Feedback request submitted!" type="success" />}
                {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" />}
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
            </div>
        );
    }
}

export default Form.create({ name: 'feedbackRequest' })(UnwrappedFeedbackRequestForm);;

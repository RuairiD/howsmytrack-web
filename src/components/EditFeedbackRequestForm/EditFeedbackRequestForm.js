import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Input, Form, Result, Row, Spin, Typography } from 'antd';

type Props = {
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
};

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
    invalidMediaUrl: boolean,
};

const EDIT_FEEDBACK_REQUEST_MUTATION = `mutation EditFeedbackRequest($feedbackRequestId: Int!, $mediaUrl: String!, $emailWhenGrouped: Boolean!, $feedbackPrompt: String) {
    editFeedbackRequest(feedbackRequestId: $feedbackRequestId, mediaUrl: $mediaUrl, emailWhenGrouped: $emailWhenGrouped, feedbackPrompt: $feedbackPrompt) {
        success
        error
        invalidMediaUrl
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
        invalidMediaUrl: false,
    }
    
    submitForm = (mediaUrl, feedbackPrompt, emailWhenGrouped) => {
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
                    mediaUrl,
                    feedbackPrompt,
                    emailWhenGrouped,
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
                invalidMediaUrl: data['data']['editFeedbackRequest'].invalidMediaUrl,
            });
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.mediaUrl,
                    values.feedbackPrompt,
                    values.emailWhenGrouped,
                )
            }
        });
    };

    getErrorMessage = () => {
        if (this.state.invalidMediaUrl) {
            return (
                <Typography.Text>Please submit a valid Soundcloud, Google Drive, Dropbox or OneDrive URL. If you are unsure how to get the correct URL, <a href="/trackurlhelp" target="_blank" rel="noopener noreferrer">please consult our guide.</a></Typography.Text>
            )
        }
        return this.state.errorMessage
    };

    render() {
        return (
            <div>
                {this.state.errorMessage && <Row gutter={[16, 16]}>
                    <Col>
                        <Alert message={this.getErrorMessage()} type="error" />
                    </Col>
                </Row>}
                <Row gutter={[16, 16]}>
                    <Col>
                        {!this.state.submitted && <Spin spinning={this.state.requestSent}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item label="Soundcloud/Google Drive/Dropbox/OneDrive URL">
                                    {
                                        this.props.form.getFieldDecorator('mediaUrl',
                                            {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please provide a track URL',
                                                    },
                                                ],
                                                initialValue: this.props.mediaUrl,
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
                                    {
                                        this.props.form.getFieldDecorator('emailWhenGrouped', {
                                            valuePropName: 'checked',
                                            initialValue: this.props.emailWhenGrouped,
                                        })(<Checkbox>Email me when this request is added to a group.</Checkbox>)
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

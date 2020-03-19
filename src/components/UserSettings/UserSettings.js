import React from 'react';

import apiRoot from '../../apiRoot';

import { Col, Form, Modal, Row, Switch, Typography } from 'antd';

const UPDATE_EMAIL_MUTATION = `mutation UpdateEmail($email: String!) {
    updateEmail(email: $email) {
        success
        error
    }
}`;

type EmailSettingsProps = {
    email: string,
};

type EmailSettingsState = {
    email: string,
    success: boolean,
    error: string,
    // This shouldn't really be necessary; for some reason `onSubmit` is
    // running twice after editing the Typography.Text component, so this
    // is used to prevent the Modal being shown twice.
    isConfirmModalVisible: boolean,
};

class EmailSettings extends React.Component<EmailSettingsProps, EmailSettingsState> {
    state = {
        email: this.props.email,
        success: false,
        error: null,
        isConfirmModalVisible: false,
    };

    onEditStart = () => {
        this.setState({
            success: false,
            error: null,
        });
    };

    sendUpdateEmailRequest = (email) => {
        this.setState({
            email: email,
        });
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: UPDATE_EMAIL_MUTATION,
                variables: {
                    email: email,
                }
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                success: data['data']['updateEmail'].success,
                error: data['data']['updateEmail'].error,
            });

            // Log the user out and ask them to log back in with
            // their new email address.
            if (data['data']['updateEmail'].success) {
                fetch(apiRoot + '/logout/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                }).then(() => window.location.assign('/'));
            }
        });
    };

    onSubmit = (email) => {
        if (email === this.state.email) {
            return;
        }
        this.setState({
            isConfirmModalVisible: true,
        })
        Modal.confirm({
            title: 'Are you sure you want to update your email address to "' + email + '"?',
            content: 'You will be logged out and required to log back in with your new email address.',
            onOk: () => {
                this.sendUpdateEmailRequest(email);
            },
            onCancel: () => {
                this.setState({
                    isConfirmModalVisible: false
                });
            },
            okText: 'Yes, change it.',
            cancelText: 'No, take me back.',
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Typography.Text strong>
                            Your email address:
                        </Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography.Text
                            style={{
                                marginRight: '1em',
                            }}
                            editable={{
                                onStart: this.onEditStart,
                                onChange: this.onSubmit
                            }}
                        >
                            {this.state.email}
                        </Typography.Text>
                        {this.state.success && <Typography.Text type="secondary">
                            Saved
                        </Typography.Text>}
                        {this.state.error && <Typography.Text type="danger">
                            Error: {this.state.error}
                        </Typography.Text>}
                    </Col>
                </Row>
            </div>
        )
    }
}


export type UserSettingsProps = {
    email: string,
    sendReminderEmails: boolean,
};

type State = {
    sendReminderEmails: boolean,
    updateSendReminderEmailsSuccess: boolean,
};

const UPDATE_SEND_REMINDER_EMAILS_MUTATION = `mutation UpdateSendReminderEmails($sendReminderEmails: Boolean!) {
    updateSendReminderEmails(sendReminderEmails: $sendReminderEmails) {
        success
    }
}`;

class UserSettings extends React.Component<UserSettingsProps, State> {
    /*
     * Component without docs
     */
    state = {
        sendReminderEmails: this.props.sendReminderEmails,
        updateSendReminderEmailsRequestSent: false,
        updateSendReminderEmailsSuccess: false,
    };

    onSendReminderEmailsChange = (checked) => {
        this.setState({
            sendReminderEmails: checked,
            updateSendReminderEmailsRequestSent: true,
            updateSendReminderEmailsSuccess: false,
        });
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: UPDATE_SEND_REMINDER_EMAILS_MUTATION,
                variables: {
                    sendReminderEmails: checked,
                }
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                updateSendReminderEmailsRequestSent: false,
                updateSendReminderEmailsSuccess: data['data']['updateSendReminderEmails'].success,
            })
        });
    };

    render() {
        return (
            <Form>
                <Typography.Title level={4}>Account Details</Typography.Title>
                <Form.Item>
                    <EmailSettings
                        email={this.props.email}
                    />
                    <a href={apiRoot + '/accounts/password_reset'}>
                        Request password reset email
                    </a>
                </Form.Item>
                <Typography.Title level={4}>Preferences</Typography.Title>
                <Form.Item>
                    <div>
                        <Typography.Text strong style={{ marginRight: '0.5em' }}>
                            Email Reminders:
                        </Typography.Text>
                        <Switch
                            defaultChecked={this.props.sendReminderEmails}
                            onChange={this.onSendReminderEmailsChange}
                            style={{ marginRight: '1em' }}
                            loading={this.state.updateSendReminderEmailsRequestSent}
                        />
                        {this.state.updateSendReminderEmailsSuccess && <Typography.Text type="secondary">
                            Saved
                        </Typography.Text>}
                    </div>
                    <Typography.Paragraph type="secondary" style={{ lineHeight: 1.5 }}>
                        Send me an email reminder after 24 hours if I haven't completed feedback for a group.
                    </Typography.Paragraph>
                </Form.Item>
            </Form>
        )
    }
}

export default UserSettings;

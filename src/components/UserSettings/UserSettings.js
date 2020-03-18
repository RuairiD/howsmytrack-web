import React from 'react';

import apiRoot from '../../apiRoot';

import { Button, Card, Col, Divider, Empty, Form, List, Result, Row, Switch, Typography } from 'antd';

type EmailSettingsProps = {
    email: string,
    onSubmit: (email: string) => void,
};

type EmailSettingsState = {
    initialEmail: string,
    currentEmail: string,
};

class EmailSettings extends React.Component<EmailSettingsProps, EmailSettingsState> {
    state = {
        email: this.props.email,
    };

    onSubmit = (email) => {
        this.props.onSubmit(email);
        this.setState({
            email: email,
        });
    };

    render() {
        return (
            <Form.Item>
                <Row>
                    <Col>
                        <Typography.Text strong>
                            Your email address:
                        </Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Typography.Text editable={{ onChange: this.onSubmit }}>
                            {this.state.email}
                        </Typography.Text>
                    </Col>
                </Row>
            </Form.Item>
        )
    }
}


type Props = {
    email: string,
    sendReminderEmails: boolean,
};

type State = {
    sendReminderEmails: boolean,
};

class UserSettings extends React.Component<Props, State> {
    /*
     * Component without docs
     */
    state = {
        sendReminderEmails: this.props.sendReminderEmails,
    };

    onEmailSubmit = (email) => {
        // TODO request
        console.log(email);
    };

    onSendReminderEmailsChange = (checked) => {
        this.setState({
            sendReminderEmails: checked
        });
        console.log(checked);
        // TODO request
    };

    render() {
        return (
            <Form>
                <Typography.Title level={4}>Account Details</Typography.Title>
                <EmailSettings
                    email={this.props.email}
                    onSubmit={this.onEmailSubmit}
                />
                <Form.Item>
                    <a href={apiRoot + '/accounts/password_reset'}>
                        Change my Password
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
                        />
                        <Typography.Paragraph>
                            Send me an email reminder after 24 hours if I haven't completed feedback for a group.
                        </Typography.Paragraph>
                    </div>
                </Form.Item>
            </Form>
        )
    }
}

export default UserSettings;

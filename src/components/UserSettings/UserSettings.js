import React, { useState } from "react";
import { useMutation } from "react-query";

import { Col, Form, Modal, Row, Switch, Typography } from "antd";
import { A, Div } from "lemon-reset";
import apiRoot from "../../apiRoot";

const UPDATE_EMAIL_MUTATION = `mutation UpdateEmail($email: String!) {
    updateEmail(email: $email) {
        success
        error
    }
}`;

type EmailSettingsProps = {
    currentEmail: string,
};

const EmailSettings = ({ currentEmail }: EmailSettingsProps) => {
    const [email, setEmail] = useState(currentEmail);
    // Used to stop Modal being double shown if onChange is invoked twice for some reason.
    const [isModalVisible, setIsModalVisible] = useState(false);

    const sendUpdateEmailRequest = (newEmail) => (
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: UPDATE_EMAIL_MUTATION,
                variables: {
                    email: newEmail,
                },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.updateEmail)
    );

    const [updateEmailRequestMutate, { data, reset }] = useMutation(sendUpdateEmailRequest);

    const onEditStart = () => {
        reset();
    };

    const onSubmit = (newEmail) => {
        if (newEmail === email && !isModalVisible) {
            return;
        }
        setIsModalVisible(true);
        Modal.confirm({
            title: `Are you sure you want to update your email address to "${newEmail}"?`,
            content: "You will be logged out and required to log back in with your new email address.",
            onOk: () => {
                setEmail(newEmail);
                updateEmailRequestMutate(newEmail);
                setIsModalVisible(false);
            },
            onCancel: () => {
                setIsModalVisible(false);
            },
            okText: "Yes, change it.",
            cancelText: "No, take me back.",
        });
    };

    // Log the user out and ask them to log back in with
    // their new email address.
    if (data && data.success) {
        fetch(`${apiRoot}/logout/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        }).then(() => window.location.assign("/"));
    }

    return (
        <Div>
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
                            marginRight: "1em",
                        }}
                        editable={{
                            onStart: onEditStart,
                            onChange: onSubmit,
                        }}
                    >
                        {email}
                    </Typography.Text>
                    {data && data.success && (
                        <Typography.Text type="secondary">
                            Saved
                        </Typography.Text>
                    )}
                    {data && data.error && (
                        <Typography.Text type="danger">
                            Error: {data.error}
                        </Typography.Text>
                    )}
                </Col>
            </Row>
        </Div>
    );
};

export type UserSettingsProps = {
    currentEmail: string,
    currentSendReminderEmails: boolean,
};

const UPDATE_SEND_REMINDER_EMAILS_MUTATION = `mutation UpdateSendReminderEmails($sendReminderEmails: Boolean!) {
    updateSendReminderEmails(sendReminderEmails: $sendReminderEmails) {
        success
    }
}`;

const UserSettings = ({ currentEmail, currentSendReminderEmails }: UserSettingsProps) => {
    const sendReminderEmailsRequest = (checked) => (
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: UPDATE_SEND_REMINDER_EMAILS_MUTATION,
                variables: {
                    sendReminderEmails: checked,
                },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.updateSendReminderEmails)
    );

    const [onSendReminderEmailsChange, { isLoading, data }] = useMutation(sendReminderEmailsRequest);

    return (
        <Form>
            <Typography.Title level={4}>Account Details</Typography.Title>
            <Form.Item>
                <EmailSettings
                    currentEmail={currentEmail}
                />
                <A href={`${apiRoot}/accounts/password_reset`}>
                    Request password reset email
                </A>
            </Form.Item>
            <Typography.Title level={4}>Preferences</Typography.Title>
            <Form.Item>
                <Div>
                    <Typography.Text strong style={{ marginRight: "0.5em" }}>
                        Email Reminders:
                    </Typography.Text>
                    <Switch
                        defaultChecked={currentSendReminderEmails}
                        onChange={onSendReminderEmailsChange}
                        style={{ marginRight: "1em" }}
                        loading={isLoading}
                    />
                    {data && data.success && (
                        <Typography.Text type="secondary">
                            Saved
                        </Typography.Text>
                    )}
                </Div>
                <Typography.Paragraph type="secondary" style={{ lineHeight: 1.5 }}>
                    Send me an email reminder after 24 hours if I haven't completed feedback for a group.
                </Typography.Paragraph>
            </Form.Item>
        </Form>
    );
};

export default UserSettings;

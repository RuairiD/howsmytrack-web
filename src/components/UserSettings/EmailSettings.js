import React, { useState } from "react";
import { useMutation } from "react-query";

import { Col, Modal, Row, Typography } from "antd";
import { Div } from "lemon-reset";
import axios from "axios";
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
        axios.post(`${apiRoot}/graphql/`, {
            query: UPDATE_EMAIL_MUTATION,
            variables: {
                email: newEmail,
            },
        })
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
        axios.get(`${apiRoot}/logout/`).then(() => window.location.assign("/"));
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
                        className="email"
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

export default EmailSettings;

import React from "react";
import { useMutation } from "react-query";

import { Switch, Typography } from "antd";
import { Div } from "lemon-reset";
import axios from "axios";
import apiRoot from "../../apiRoot";

export type EmailRemindersPreferenceProps = {
    currentSendReminderEmails: boolean,
};

const UPDATE_SEND_REMINDER_EMAILS_MUTATION = `mutation UpdateSendReminderEmails($sendReminderEmails: Boolean!) {
    updateSendReminderEmails(sendReminderEmails: $sendReminderEmails) {
        success
    }
}`;

const EmailRemindersPreference = ({ currentSendReminderEmails }: EmailRemindersPreferenceProps) => {
    const sendReminderEmailsRequest = (checked) => (
        axios.post(`${apiRoot}/graphql/`, {
            query: UPDATE_SEND_REMINDER_EMAILS_MUTATION,
            variables: {
                sendReminderEmails: checked,
            },
        })
    );

    const [onSendReminderEmailsChange, { isLoading, data }] = useMutation(sendReminderEmailsRequest);

    return (
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
    );
};

export default EmailRemindersPreference;

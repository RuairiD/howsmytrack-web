import React from "react";

import { Form, Typography } from "antd";
import { A } from "lemon-reset";
import apiRoot from "../../apiRoot";

import EmailSettings from "./EmailSettings";
import EmailRemindersPreference from "./EmailRemindersPreference";

export type UserSettingsProps = {
    currentEmail: string,
    currentSendReminderEmails: boolean,
};

const UserSettings = ({ currentEmail, currentSendReminderEmails }: UserSettingsProps) => (
    <Form>
        <Typography.Title level={4}>Account Details</Typography.Title>
        <Form.Item>
            <EmailSettings
                currentEmail={currentEmail}
            />
            <A href={`${apiRoot()}/accounts/password_reset`}>
                Request password reset email
            </A>
        </Form.Item>
        <Typography.Title level={4}>Preferences</Typography.Title>
        <Form.Item>
            <EmailRemindersPreference currentSendReminderEmails={currentSendReminderEmails} />
        </Form.Item>
    </Form>
);

export default UserSettings;

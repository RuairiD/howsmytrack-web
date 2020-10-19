import React from "react";
import { useQuery } from "react-query";

import axios from "axios";
import apiRoot from "../../apiRoot";

import GenericPage from "../GenericPage/GenericPage";
import UserSettings from "../UserSettings/UserSettings";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {
    isMobile: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    sendReminderEmails
  }
}`;

const UserSettingsPage = ({ isMobile }: Props) => {
    const { data } = useQuery(
        [USER_DETAILS_QUERY],
        () => axios.post(`${apiRoot}/graphql/`, {
            query: USER_DETAILS_QUERY,
        }),
    );

    if (data) {
        const { userDetails } = data.data.data;
        if (userDetails) {
            return (
                <GenericPage title="Settings" isMobile={isMobile}>
                    <UserSettings
                        currentEmail={userDetails.username}
                        currentSendReminderEmails={userDetails.sendReminderEmails}
                    />
                </GenericPage>
            );
        }
        return null;
    }

    return <LoadingSpinner />;
};

export default UserSettingsPage;

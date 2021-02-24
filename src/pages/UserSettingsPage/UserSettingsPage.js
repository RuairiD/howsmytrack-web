import React from "react";
import { useSelector } from "react-redux";

import GenericPage from "../GenericPage/GenericPage";
import UserSettings from "../../components/UserSettings/UserSettings";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { selectUserDetailsData, selectUserDetailsIsLoading } from "../../reducers/userDetailsSlice";

type Props = {
    isMobile: boolean,
};

const UserSettingsPage = ({ isMobile }: Props) => {
    const data = useSelector(selectUserDetailsData);
    const isLoading = useSelector(selectUserDetailsIsLoading);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if (!data) {
        // No data means user isn't logged in.
        window.location.assign("/");
        return null;
    }

    return (
        <GenericPage title="Settings" isMobile={isMobile}>
            <UserSettings
                currentEmail={data.username}
                currentSendReminderEmails={data.sendReminderEmails}
            />
        </GenericPage>
    );
};

export default UserSettingsPage;

import React from "react";
import { useSelector } from "react-redux";

import GenericPage from "../GenericPage/GenericPage";
import UserSettings from "../../components/UserSettings/UserSettings";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { selectUserDetailsData } from "../../reducers/userDetailsSlice";

type Props = {
    isMobile: boolean,
};

const UserSettingsPage = ({ isMobile }: Props) => {
    const data = useSelector(selectUserDetailsData);

    if (data) {
        return (
            <GenericPage title="Settings" isMobile={isMobile}>
                <UserSettings
                    currentEmail={data.username}
                    currentSendReminderEmails={data.sendReminderEmails}
                />
            </GenericPage>
        );
    }

    return <LoadingSpinner />;
};

export default UserSettingsPage;

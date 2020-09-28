import React from 'react';
import { useQuery } from "react-query";

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import UserSettings from '../UserSettings/UserSettings';

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
    const { data } = useQuery([USER_DETAILS_QUERY], () =>
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: USER_DETAILS_QUERY,
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => data.data.userDetails)
    );

    if (data) {
        return (
            <GenericPage title="Settings" isMobile={isMobile}>
                <UserSettings
                    email={data.username}
                    sendReminderEmails={data.sendReminderEmails}
                />
            </GenericPage>
        );
    }

    return null;
}

export default UserSettingsPage;

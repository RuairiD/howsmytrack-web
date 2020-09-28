import React, { useState, useEffect } from 'react';

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
    const [hasProps, setHasProps] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
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
        ).then((data) => {
            if (data['data']['userDetails']) {
                setUserDetails(data['data']['userDetails']);
                setHasProps(true);
            } else {
                // Logged out, redirect.
                window.location.assign('/');
            }
        });
    }, []);

    if (hasProps) {
        return (
            <GenericPage title="Settings" isMobile={isMobile}>
                <UserSettings
                    email={userDetails.username}
                    sendReminderEmails={userDetails.sendReminderEmails}
                />
            </GenericPage>
        );
    }

    return null;
}

export default UserSettingsPage;

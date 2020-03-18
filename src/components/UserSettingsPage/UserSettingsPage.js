import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import UserSettings from '../UserSettings/UserSettings';

type Props = {
    isMobile: boolean,
};

class UserSettingsPage extends React.Component<Props> {
    render() {
        return (
            <GenericPage title="Settings" isMobile={this.props.isMobile}>
                <UserSettings
                    email="ruairidx@gmail.com"
                    sendReminderEmails={true}
                />
            </GenericPage>
        )
    }
}

export default UserSettingsPage;

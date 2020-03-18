import React from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import UserSettings from '../UserSettings/UserSettings';

type Props = {
    isMobile: boolean,
};

type State = {
    hasProps: boolean,
    userDetails: UserSettingsProps,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    sendReminderEmails
  }
}`;

class UserSettingsPage extends React.Component<Props, State> {
    state = {
        hasProps: false,
        userDetails: null,
    }

    componentDidMount() {
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
                this.setState({
                    hasProps: true,
                    userDetails: data['data']['userDetails'],
                });
            };
        });
    }

    render() {
        return this.state.hasProps && (
            <GenericPage title="Settings" isMobile={this.props.isMobile}>
                <UserSettings
                    email={this.state.userDetails.username}
                    sendReminderEmails={this.state.userDetails.sendReminderEmails}
                />
            </GenericPage>
        )
    }
}

export default UserSettingsPage;

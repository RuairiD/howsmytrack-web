import React from 'react';

import apiRoot from '../../apiRoot';

import { Divider } from 'antd';
import FeedbackGroupsPage from '../FeedbackGroupsPage/FeedbackGroupsPage';
import Faq from '../Faq/Faq';
import GenericPage from '../GenericPage/GenericPage';
import LandingPitch from '../LandingPitch/LandingPitch';

type Props = {
    isMobile: boolean,
};

type State = {
    isLoggedIn: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
  }
}`;

class HomePage extends React.Component<Props, State> {
    state = {
        isLoggedIn: false,
    };

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
            if (!data['data']['userDetails']) {
                // User isn't logged in or has an unreadable token, skip.
                return
            }
            this.setState({
                isLoggedIn: !!data['data']['userDetails']['username'],
            });
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<FeedbackGroupsPage isMobile={this.props.isMobile} />);
        }
        return (
            <GenericPage isMobile={this.props.isMobile}>
                <LandingPitch isMobile={this.props.isMobile} />
                <Divider />
                <Faq />
            </GenericPage>
        );
    }
}

export default HomePage;

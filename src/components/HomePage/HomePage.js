import React from 'react';

import apiRoot from '../../apiRoot';

import { Divider, Spin } from 'antd';
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
        isLoggedIn: null,
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
                this.setState({
                    isLoggedIn: false,
                });
            } else {
                this.setState({
                    isLoggedIn: !!data['data']['userDetails']['username'],
                });
            }
        });
    }

    render() {
        if (this.state.isLoggedIn === null) {
            return (
                <div className="home-loading-container">
                    <Spin 
                        className="home-loading-spin"
                        size="large"
                        indicator={(
                            <img
                                alt=""
                                src="/logo128.png"
                            />
                        )}
                    />
                </div>
            );
        }
        if (this.state.isLoggedIn) {
            return (<FeedbackGroupsPage isMobile={this.props.isMobile} />);
        }
        return (
            <div className="home">
                <GenericPage hideMenu isMobile={this.props.isMobile}>
                    <div style={{ textAlign: 'center' }}>
                        <div className="home-container">
                            <LandingPitch isMobile={this.props.isMobile} />
                            <Divider />
                            <Faq />
                        </div>
                    </div>
                </GenericPage>
            </div>
        );
    }
}

export default HomePage;

import React, { useState, useEffect } from 'react';

import apiRoot from '../../apiRoot';

import { Divider, Spin } from 'antd';
import FeedbackGroupsPage from '../FeedbackGroupsPage/FeedbackGroupsPage';
import Faq from '../Faq/Faq';
import GenericPage from '../GenericPage/GenericPage';
import LandingPitch from '../LandingPitch/LandingPitch';

type Props = {
    isMobile: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
  }
}`;

const HomePage = ({ isMobile }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

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
            if (!data['data']['userDetails']) {
                // User isn't logged in or has an unreadable token, skip.
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(!!data['data']['userDetails']['username']);
            }
        });
    }, [])

    if (isLoggedIn === null) {
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
    if (isLoggedIn) {
        return (<FeedbackGroupsPage isMobile={isMobile} />);
    }
    return (
        <div className="home">
            <GenericPage hideMenu isMobile={isMobile}>
                <div style={{ textAlign: 'center' }}>
                    <div className="home-container">
                        <LandingPitch isMobile={isMobile} />
                        <Divider />
                        <Faq />
                    </div>
                </div>
            </GenericPage>
        </div>
    );
};

export default HomePage;

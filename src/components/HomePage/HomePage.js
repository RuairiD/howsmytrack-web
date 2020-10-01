import React from 'react';
import { useQuery } from "react-query";

import apiRoot from '../../apiRoot';

import { Divider } from 'antd';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
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
    const { isLoading, data } = useQuery([USER_DETAILS_QUERY], () => 
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
        ).then(data => data.data.userDetails)
    );

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }
    if (data && !!data.username) {
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

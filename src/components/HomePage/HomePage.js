import React from "react";
import { useQuery } from "react-query";

import axios from "axios";
import { Divider } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FeedbackGroupsPage from "../FeedbackGroupsPage/FeedbackGroupsPage";
import Faq from "../Faq/Faq";
import GenericPage from "../GenericPage/GenericPage";
import LandingPitch from "../LandingPitch/LandingPitch";

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
    const { isLoading, data } = useQuery(
        [USER_DETAILS_QUERY],
        () => axios.post(`${apiRoot}/graphql/`, {
            query: USER_DETAILS_QUERY,
        }).then((response) => response.data.data.userDetails),
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
        <Div className="home">
            <GenericPage hideMenu isMobile={isMobile}>
                <Div style={{ textAlign: "center" }}>
                    <Div className="home-container">
                        <LandingPitch isMobile={isMobile} />
                        <Divider />
                        <Faq />
                    </Div>
                </Div>
            </GenericPage>
        </Div>
    );
};

export default HomePage;

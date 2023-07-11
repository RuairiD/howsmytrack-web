import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { Divider } from "antd";
import { Div } from "lemon-reset";
import GenericPage from "../GenericPage/GenericPage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Faq from "../../components/Faq/Faq";
import LandingPitch from "../../components/LandingPitch/LandingPitch";
import { selectUserDetailsData, selectUserDetailsIsLoading } from "../../reducers/userDetailsSlice";

const FeedbackGroupsPage = lazy(() => import("../FeedbackGroupsPage/FeedbackGroupsPage"));

type Props = {
    isMobile: boolean,
};

const HomePage = ({ isMobile }: Props) => {
    const data = useSelector(selectUserDetailsData);
    const isLoading = useSelector(selectUserDetailsIsLoading);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }
    if (data && !!data.username) {
        return (
            <Suspense fallback={<LoadingSpinner />}>
                <FeedbackGroupsPage isMobile={isMobile} />
            </Suspense>
        );
    }
    return (
        <Div className="home">
            <GenericPage hideMenu isMobile={isMobile}>
                <Div style={{ textAlign: "center" }}>
                    <Div className="home-container">
                        <LandingPitch isMobile={isMobile} />
                        <Divider className="my-2" />
                        <Faq />
                    </Div>
                </Div>
            </GenericPage>
        </Div>
    );
};

export default HomePage;

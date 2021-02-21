import { Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const FeedbackGroupsPage = lazy(() => import("../../pages/FeedbackGroupsPage/FeedbackGroupsPage"));
const FeedbackGroupPage = lazy(() => import("../../pages/FeedbackGroupPage/FeedbackGroupPage"));
const FaqPage = lazy(() => import("../../pages/FaqPage/FaqPage"));
const TrackUrlHelpPage = lazy(() => import("../../pages/TrackUrlHelpPage/TrackUrlHelpPage"));
const UserSettingsPage = lazy(() => import("../../pages/UserSettingsPage/UserSettingsPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

const renderFeedbackGroup = (match, isMobile) => {
    const { feedbackGroupId } = match.params;
    return (
        <FeedbackGroupPage feedbackGroupId={feedbackGroupId} isMobile={isMobile} />
    );
};

const RoutesContainer = ({ isMobile }) => (
    <Suspense fallback={<LoadingSpinner />}>
        <Switch>
            <Route
                exact
                path="/"
                render={() => <HomePage isMobile={isMobile} />}
            />
            <Route
                exact
                path="/faq"
                render={() => <FaqPage isMobile={isMobile} />}
            />
            <Route
                exact
                path="/trackurlhelp"
                render={() => <TrackUrlHelpPage isMobile={isMobile} />}
            />
            <Route
                exact
                path="/groups"
                render={() => <FeedbackGroupsPage isMobile={isMobile} />}
            />
            <Route
                path="/group/:feedbackGroupId"
                render={({ match }) => renderFeedbackGroup(match, isMobile)}
            />
            <Route
                exact
                path="/settings"
                render={() => <UserSettingsPage isMobile={isMobile} />}
            />
        </Switch>
    </Suspense>
);

export default RoutesContainer;

import { Route, Switch } from "react-router-dom";
import React from "react";

import FeedbackGroupPage from "../../pages/FeedbackGroupPage/FeedbackGroupPage";
import FeedbackGroupsPage from "../../pages/FeedbackGroupsPage/FeedbackGroupsPage";
import FaqPage from "../../pages/FaqPage/FaqPage";
import TrackUrlHelpPage from "../../pages/TrackUrlHelpPage/TrackUrlHelpPage";
import UserSettingsPage from "../../pages/UserSettingsPage/UserSettingsPage";
import HomePage from "../../pages/HomePage/HomePage";

const renderFeedbackGroup = (match, isMobile) => {
    const { feedbackGroupId } = match.params;
    return (
        <FeedbackGroupPage feedbackGroupId={feedbackGroupId} isMobile={isMobile} />
    );
};

const RoutesContainer = ({ isMobile }) => (
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
);

export default RoutesContainer;

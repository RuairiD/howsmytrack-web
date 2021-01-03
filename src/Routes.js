import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";

import store from "./store";
import { setData, setIsLoading } from "./reducers/userDetailsSlice";
import apiRoot from "./apiRoot";
import FeedbackGroupPage from "./pages/FeedbackGroupPage/FeedbackGroupPage";
import FeedbackGroupsPage from "./pages/FeedbackGroupsPage/FeedbackGroupsPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import TrackUrlHelpPage from "./pages/TrackUrlHelpPage/TrackUrlHelpPage";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";
import HomePage from "./pages/HomePage/HomePage";

function isMobile() {
    // TODO: this is the root of some mobile friendly fixes added in about
    // half an hour. the isMobile prop is passed down to anything that needs
    // it and leads to some weird conditional rendering (FeedbackGroup is
    // a highlight). This should ideally be refactored into something that
    // makes more sense, both from a design and implementation standpoint.
    return window.screen.width < 600;
}

function renderFeedbackGroup({ match }) {
    const { feedbackGroupId } = match.params;
    return (
        <FeedbackGroupPage feedbackGroupId={feedbackGroupId} isMobile={isMobile()} />
    );
}

const USER_DETAILS_QUERY = `query UserDetails {
    userDetails {
      username
      sendReminderEmails
      rating
      notifications
    }
}`;

const fetchUserDetails = async (dispatch) => {
    /*
    * The userDetails query is used on multiple pages and components. Rather
    * than doing a separate request every time, the result is stored in a Redux
    * store, which is better for pageload time and conserving user data.
    */
    dispatch(setIsLoading(true));
    const data = await axios.post(`${apiRoot}/graphql/`, {
        query: USER_DETAILS_QUERY,
    }).then((response) => response.data.data.userDetails);
    dispatch(setData(data));
    dispatch(setIsLoading(false));
};

const Routes = () => {
    useEffect(() => {
        store.dispatch(fetchUserDetails);
    });

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => <HomePage isMobile={isMobile()} />}
            />
            <Route
                exact
                path="/faq"
                render={() => <FaqPage isMobile={isMobile()} />}
            />
            <Route
                exact
                path="/trackurlhelp"
                render={() => <TrackUrlHelpPage isMobile={isMobile()} />}
            />
            <Route
                exact
                path="/groups"
                render={() => <FeedbackGroupsPage isMobile={isMobile()} />}
            />
            <Route
                path="/group/:feedbackGroupId"
                render={renderFeedbackGroup}
            />
            <Route
                exact
                path="/settings"
                render={() => <UserSettingsPage isMobile={isMobile()} />}
            />
        </Switch>
    );
};

export default Routes;

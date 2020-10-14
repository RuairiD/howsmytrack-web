import HttpsRedirect from 'react-https-redirect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactGA from 'react-ga';
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { createBrowserHistory } from 'history';
import { Div } from 'lemon-reset';
import './App.css';

import FeedbackGroupPage from './components/FeedbackGroupPage/FeedbackGroupPage';
import FeedbackGroupsPage from './components/FeedbackGroupsPage/FeedbackGroupsPage';
import FaqPage from './components/FaqPage/FaqPage';
import TrackUrlHelpPage from './components/TrackUrlHelpPage/TrackUrlHelpPage';
import UserSettingsPage from './components/UserSettingsPage/UserSettingsPage';
import HomePage from './components/HomePage/HomePage';


// Initialize google analytics page view tracking (lifted from https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b)
const gaTrackingId = "UA-158779731-1";
ReactGA.initialize(gaTrackingId);
const history = createBrowserHistory();
history.listen(location => {
    // Not sure this actually does anything since all navigation in the site
    // is done using traditional URLs to the page reloads every time.
    ReactGA.set({
        page: location.pathname
    });
    ReactGA.pageview(location.pathname);
});

const queryCache = new QueryCache();

function isMobile() {
    // TODO: this is the root of some mobile friendly fixes added in about
    // half an hour. the isMobile prop is passed down to anything that needs 
    // it and leads to some weird conditional rendering (FeedbackGroup is
    // a highlight). This should ideally be refactored into something that
    // makes more sense, both from a design and implementation standpoint.
    return window.screen.width < 600;
}


function renderFeedbackGroup({ match} ) {
    let { feedbackGroupId } = match.params;
    return (
        <FeedbackGroupPage feedbackGroupId={feedbackGroupId} isMobile={isMobile()} />
    )
}


function App() {
    ReactGA.pageview(window.location.pathname);
    return (
        <HttpsRedirect>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <BrowserRouter>
                    <Suspense fallback={<Div>Loading...</Div>}>
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
                    </Suspense>
                </BrowserRouter>
            </ReactQueryCacheProvider>
        </HttpsRedirect>
    )
}

export default App;

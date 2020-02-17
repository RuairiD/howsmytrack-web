import HttpsRedirect from 'react-https-redirect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

import FeedbackGroupPage from './components/FeedbackGroupPage/FeedbackGroupPage';
import FeedbackGroupsPage from './components/FeedbackGroupsPage/FeedbackGroupsPage';
import FaqPage from './components/FaqPage/FaqPage';
import TrackUrlHelpPage from './components/TrackUrlHelpPage/TrackUrlHelpPage';


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
    return (
        <HttpsRedirect>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <FaqPage isMobile={isMobile()} />}
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
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </HttpsRedirect>
    )
}

export default App;

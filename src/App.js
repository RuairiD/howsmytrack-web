import HttpsRedirect from "react-https-redirect";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { createBrowserHistory } from "history";
import "./App.css";
import axios from "axios";

import Routes from "./Routes";

// Initialize google analytics page view tracking (lifted from https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b)
const gaTrackingId = "UA-158779731-1";
ReactGA.initialize(gaTrackingId);
const history = createBrowserHistory();
history.listen((location) => {
    // Not sure this actually does anything since all navigation in the site
    // is done using traditional URLs to the page reloads every time.
    ReactGA.set({
        page: location.pathname,
    });
    ReactGA.pageview(location.pathname);
});

const queryCache = new QueryCache();

axios.defaults.withCredentials = true;

const App = () => {
    ReactGA.pageview(window.location.pathname);
    return (
        <HttpsRedirect>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ReactQueryCacheProvider>
        </HttpsRedirect>
    );
};

export default App;

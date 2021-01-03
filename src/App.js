import HttpsRedirect from "react-https-redirect";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "./App.css";
import axios from "axios";

import Routes from "./Routes";
import store from "./store";

// Initialize google analytics page view tracking (lifted from https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b)
const gaTrackingId = "UA-158779731-1";
ReactGA.initialize(gaTrackingId);

const queryCache = new QueryCache();

axios.defaults.withCredentials = true;

const App = () => {
    ReactGA.pageview(window.location.pathname);
    return (
        <HttpsRedirect>
            <Provider store={store}>
                <ReactQueryCacheProvider queryCache={queryCache}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </ReactQueryCacheProvider>
            </Provider>
        </HttpsRedirect>
    );
};

export default App;

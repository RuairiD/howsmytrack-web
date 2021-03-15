import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import store from "../../store";
import { setData, setIsLoading } from "../../reducers/userDetailsSlice";
import apiRoot from "../../apiRoot";
import RoutesContainer from "../RoutesContainer/RoutesContainer";

// TODO: this is the root of some mobile friendly fixes added in about
// half an hour. the isMobile prop is passed down to anything that needs
// it and leads to some weird conditional rendering (FeedbackGroup is
// a highlight). This should ideally be refactored into something that
// makes more sense, both from a design and implementation standpoint.
const isMobile = () => window.screen.width < 600;

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

const MainContainer = () => {
    /*
     * Top-level container which sends request for userDetails  in order to populate
     * Redux store and renders Router and RoutesContainer for page routing.
     */
    useEffect(() => {
        store.dispatch(fetchUserDetails);
    });

    return (
        <BrowserRouter>
            <RoutesContainer isMobile={isMobile()} />
        </BrowserRouter>
    );
};

export default MainContainer;

import React, { useState } from "react";
import ReactGA from "react-ga";
import { useQuery } from "react-query";
import axios from "axios";

import { Spin } from "antd";
import { A, Div, Img } from "lemon-reset";
import apiRoot from "../../apiRoot";
import MobileMenu from "./MobileMenu";
import MainMenu from "./MainMenu";
import FeedbackRequestModal from "../FeedbackRequestModal/FeedbackRequestModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
    notifications
  }
}`;

const GA_MENU_BAR_CATEGORY = "menubar";

const MenuBarContent = ({ isMobile }) => {
    const [isFeedbackRequestModalVisible, setIsFeedbackRequestModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true);

    const logout = () => axios.get(`${apiRoot}/logout/`);

    const menuActions = {
        newRequest: () => {
            setIsFeedbackRequestModalVisible(true);
        },
        login: () => {
            setIsLoginModalVisible(true);
        },
        register: () => {
            setIsRegisterModalVisible(true);
        },
        logout: () => {
            logout().then(() => window.location.assign("/"));
        },
    };

    const { isLoading, data } = useQuery([USER_DETAILS_QUERY], () => (
        axios.post(`${apiRoot}/graphql/`, {
            query: USER_DETAILS_QUERY,
        }).then((response) => response.data.data.userDetails)
    ));

    let username = null;
    let rating = null;
    let notifications = null;
    if (!isLoading) {
        if (!data) {
            // Clear the JWT cookie in case it was mangled somehow.
            logout();
        } else {
            username = data.username;
            rating = data.rating;
            notifications = data.notifications;
            ReactGA.set({
                username: data.username,
            });
        }
    }

    const onMenuClick = (event) => {
        ReactGA.event({
            category: GA_MENU_BAR_CATEGORY,
            action: event.key,
        });
        const menuAction = menuActions[event.key];
        if (menuAction) {
            menuAction();
        }
    };

    const onFeedbackRequestModalCancel = () => {
        setIsFeedbackRequestModalVisible(false);
    };

    const onLoginModalCancel = () => {
        setIsLoginModalVisible(false);
    };

    const onRegisterModalCancel = () => {
        setIsRegisterModalVisible(false);
    };

    const onCollapseChange = (key) => {
        setMobileMenuCollapsed(key.length === 0);
    };

    return (
        <Spin spinning={isLoading}>
            <Div className="menu-bar">
                {!isMobile && (
                    <A href="/" className="full-logo">
                        <Img alt="how's my track" src="/logo512.png" width="200px" style={{ padding: "0.5em", marginLeft: "auto", marginRight: "auto" }} />
                    </A>
                )}
                {isMobile && (
                    <MobileMenu
                        onMenuClick={onMenuClick}
                        username={username}
                        rating={rating}
                        notifications={notifications}
                        onCollapseChange={onCollapseChange}
                        mobileMenuCollapsed={mobileMenuCollapsed}
                    />
                )}
                {!isMobile && (
                    <MainMenu
                        onMenuClick={onMenuClick}
                        username={username}
                        rating={rating}
                        notifications={notifications}
                    />
                )}

                <FeedbackRequestModal onCancel={onFeedbackRequestModalCancel} isVisible={isFeedbackRequestModalVisible} />
                <LoginModal onCancel={onLoginModalCancel} isVisible={isLoginModalVisible} />
                <RegisterModal onCancel={onRegisterModalCancel} isVisible={isRegisterModalVisible} />
            </Div>
        </Spin>
    );
};

export default MenuBarContent;

import React, { useState } from "react";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
import axios from "axios";

import { Spin } from "antd";
import apiRoot from "../../apiRoot";
import MenuBarContent from "./MenuBarContent";
import FeedbackRequestModal from "../FeedbackRequestModal/FeedbackRequestModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { selectUserDetailsData, selectUserDetailsIsLoading } from "../../reducers/userDetailsSlice";

const GA_MENU_BAR_CATEGORY = "menubar";

const MenuBar = ({ isMobile }) => {
    const [isFeedbackRequestModalVisible, setIsFeedbackRequestModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

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

    const data = useSelector(selectUserDetailsData);
    const isLoading = useSelector(selectUserDetailsIsLoading);

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

    return (
        <Spin spinning={isLoading} wrapperClassName={isMobile ? "w-100" : null}>
            <MenuBarContent
                isMobile={isMobile}
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />

            <FeedbackRequestModal onCancel={onFeedbackRequestModalCancel} isVisible={isFeedbackRequestModalVisible} />
            <LoginModal onCancel={onLoginModalCancel} isVisible={isLoginModalVisible} />
            <RegisterModal onCancel={onRegisterModalCancel} isVisible={isRegisterModalVisible} />
        </Spin>
    );
};

export default MenuBar;

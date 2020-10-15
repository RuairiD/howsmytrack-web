import React, { useState } from "react";
import ReactGA from "react-ga";
import { useQuery } from "react-query";

import { Affix, Badge, Collapse, Menu, Icon, Spin, Typography } from "antd";
import { A, Div, Img, Span } from "lemon-reset";
import apiRoot from "../../apiRoot";
import FeedbackRequestModal from "../FeedbackRequestModal/FeedbackRequestModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

type Props = {
    isMobile: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
    notifications
  }
}`;

const GA_MENU_BAR_CATEGORY = "menubar";

const UserDetails = ({ username, rating }) => {
    if (rating) {
        return (
            <Menu.Item disabled className="ant-menu-item">
                <Div style={{ display: "flex" }}>
                    <Typography.Text
                        ellipsis
                        style={{
                            marginRight: "auto",
                            marginTop: "auto",
                            marginBottom: "auto",
                        }}
                    >
                        {username}
                    </Typography.Text>
                    <Typography.Text
                        strong
                        style={{
                            marginLeft: "auto",
                            marginTop: "auto",
                            marginBottom: "auto",
                        }}
                    >
                        {rating.toFixed(2)}<Icon type="star" />
                    </Typography.Text>
                </Div>
            </Menu.Item>
        );
    }
    return (
        <Menu.Item disabled className="ant-menu-item">
            <Div style={{ display: "flex" }}>
                <Typography.Text
                    ellipsis
                    style={{
                        marginRight: "auto",
                        marginTop: "auto",
                        marginBottom: "auto",
                    }}
                >
                    {username}
                </Typography.Text>
            </Div>
        </Menu.Item>
    );
};

const SocialLinksMenu = ({ isMobile, onMenuClick }) => {
    let style = {};
    if (!isMobile) {
        style = {
            position: "absolute",
            bottom: "0px",
        };
    }
    return (
        <Div style={style}>
            <Menu
                theme="light"
                onClick={onMenuClick}
                style={{
                    borderRight: 0,
                }}
            >
                {isMobile && <Menu.Divider />}
                <Menu.Item className="ant-menu-item">
                    <A href="https://twitter.com/howsmytrackcom" target="_blank" rel="noopener noreferrer">
                        <Icon type="twitter" />
                        <Span>Twitter</Span>
                    </A>
                </Menu.Item>
                <Menu.Item className="ant-menu-item">
                    <A href="https://discord.gg/6jGFP6N" target="_blank" rel="noopener noreferrer">
                        <Icon type="robot" />
                        <Span>Discord</Span>
                    </A>
                </Menu.Item>
            </Menu>
        </Div>
    );
};

const MobileHeader = ({ mobileMenuCollapsed, notifications }) => (
    <Div style={{ display: "flex" }}>
        <Span style={{
            marginTop: "auto",
            marginBottom: "auto",
        }}
        >
            <Typography.Text>
                how's my track?
            </Typography.Text>
            {mobileMenuCollapsed && (
                <Badge
                    count={notifications}
                    style={{
                        marginLeft: "0.5em",
                    }}
                />
            )}
        </Span>
        <Img
            alt=""
            src="/logo128.png"
            style={{
                marginLeft: "auto",
                width: "32px",
                height: "32px",
            }}
        />
    </Div>
);

const LoggedOutMenu = ({ onMenuClick }) => (
    <Menu
        theme="light"
        onClick={onMenuClick}
        style={{
            borderRight: 0,
        }}
    >
        <Menu.Item disabled>
            <Typography.Text>Welcome!</Typography.Text>
        </Menu.Item>
        <Menu.Item key="login">
            <Icon type="user" />
            <Span>Sign In</Span>
        </Menu.Item>
        <Menu.Item key="register">
            <Icon type="user-add" />
            <Span>Register</Span>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq">
                <Icon type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
    </Menu>
);

const LoggedInMenu = ({ onMenuClick, username, rating, notifications }) => (
    <Menu
        theme="light"
        onClick={onMenuClick}
        style={{
            marginBottom: "auto",
            borderRight: 0,
        }}
    >
        <UserDetails
            username={username}
            rating={rating}
        />
        <Menu.Item key="newRequest">
            <Icon type="plus" />
            <Span>New Request</Span>
        </Menu.Item>
        <Menu.Item key="feedbackGroups">
            <A href="/groups">
                <Icon type="team" />
                <Span>Your Groups</Span>
                <Badge
                    count={notifications}
                    style={{ marginLeft: "0.5em" }}
                />
            </A>
        </Menu.Item>
        <Menu.Item key="faq">
            <A href="/faq">
                <Icon type="question-circle" />
                <Span>FAQ</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="settings">
            <A href="/settings">
                <Icon type="setting" />
                <Span>Settings</Span>
            </A>
        </Menu.Item>
        <Menu.Item key="logout">
            <Icon type="user-delete" />
            <Span>Sign Out</Span>
        </Menu.Item>
    </Menu>
);

const MainMenu = ({
    isMobile,
    onMenuClick,
    username,
    rating,
    notifications,
}) => (
    <Div>
        {username && (
            <LoggedInMenu
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />
        )}
        {!username && (
            <LoggedOutMenu
                onMenuClick={onMenuClick}
            />
        )}
        <SocialLinksMenu
            isMobile={isMobile}
            onMenuClick={onMenuClick}
        />
    </Div>
);

const MobileMenu = ({
    isMobile,
    onMenuClick,
    username,
    rating,
    notifications,
    onCollapseChange,
    mobileMenuCollapsed,
}) => (
    <Collapse
        className="mobile-menu-collapse"
        bordered={false}
        expandIcon={
            ({ isActive }) => (
                <Icon type="menu" rotate={isActive ? 90 : 0} />
            )
        }
        onChange={onCollapseChange}
    >
        <Collapse.Panel
            header={(
                <MobileHeader
                    mobileMenuCollapsed={mobileMenuCollapsed}
                    notifications={notifications}
                />
            )}
            key="1"
        >
            <MainMenu
                isMobile={isMobile}
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />
        </Collapse.Panel>
    </Collapse>
);

const MenuBarContent = ({
    isLoading,
    isMobile,
    onMenuClick,
    username,
    rating,
    notifications,
    isFeedbackRequestModalVisible,
    onFeedbackRequestModalCancel,
    isLoginModalVisible,
    onLoginModalCancel,
    isRegisterModalVisible,
    onRegisterModalCancel,
    mobileMenuCollapsed,
    onCollapseChange,
}) => (
    <Spin spinning={isLoading}>
        <Div className="menu-bar">
            {!isMobile && (
                <A href="/" className="full-logo">
                    <Img alt="how's my track" src="/logo512.png" width="200px" style={{ padding: "0.5em", marginLeft: "auto", marginRight: "auto" }} />
                </A>
            )}
            {isMobile && (
                <MobileMenu
                    isMobile={isMobile}
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
                    isMobile={isMobile}
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

const MenuBar = ({ isMobile }: Props) => {
    /*
     * Component for displaying page sidebar with menu links, or for mobile,
     * displaying a menu at the top of the screen.
     */
    const [isFeedbackRequestModalVisible, setIsFeedbackRequestModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true);

    const logout = () => fetch(`${apiRoot}/logout/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
    });

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
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                query: USER_DETAILS_QUERY,
            }),
            credentials: "include",
        }).then((result) => result.json()).then((data) => data.data.userDetails)
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
        const menuAction = menuActions[event.key];
        ReactGA.event({
            category: GA_MENU_BAR_CATEGORY,
            action: event.key,
        });
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

    const menuBarContent = (
        <MenuBarContent
            isMobile={isMobile}
            isLoading={isLoading}
            onMenuClick={onMenuClick}
            username={username}
            rating={rating}
            notifications={notifications}
            isFeedbackRequestModalVisible={isFeedbackRequestModalVisible}
            onFeedbackRequestModalCancel={onFeedbackRequestModalCancel}
            isLoginModalVisible={isLoginModalVisible}
            onLoginModalCancel={onLoginModalCancel}
            isRegisterModalVisible={isRegisterModalVisible}
            onRegisterModalCancel={onRegisterModalCancel}
            mobileMenuCollapsed={mobileMenuCollapsed}
            onCollapseChange={onCollapseChange}
        />
    );

    if (isMobile) {
        return menuBarContent;
    }
    return (
        <Affix>
            {menuBarContent}
        </Affix>
    );
};

export default MenuBar;

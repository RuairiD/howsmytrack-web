import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useQuery } from "react-query";

import apiRoot from '../../apiRoot';

import { Affix, Badge, Collapse, Menu, Icon, Spin, Typography } from 'antd';
import FeedbackRequestModal from '../FeedbackRequestModal/FeedbackRequestModal';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

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
                <div style={{ display: 'flex' }}>
                    <Typography.Text ellipsis style={{
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}>
                        {username}
                    </Typography.Text>
                    <Typography.Text strong style={{
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}>
                        {rating.toFixed(2)}<Icon type="star" />
                    </Typography.Text>
                </div>
            </Menu.Item>
        )
    }
    return (
        <Menu.Item disabled className="ant-menu-item">
            <div style={{ display: 'flex' }}>
                <Typography.Text ellipsis style={{
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    {username}
                </Typography.Text>
            </div>
        </Menu.Item>
    );
};

const SocialLinksMenu = ({ isMobile, onMenuClick }) => {
    let style = {};
    if (!isMobile) {
        style = {
            position: 'absolute',
            bottom: '0px',
        };
    }
    return (
        <div style={style}>
            <Menu
                theme="light"
                onClick={onMenuClick}
                style={{
                    borderRight: 0,
                }}
            >
                {isMobile && <Menu.Divider />}
                <Menu.Item className="ant-menu-item">
                    <a href="https://twitter.com/howsmytrackcom" target="_blank" rel="noopener noreferrer">
                        <Icon type="twitter" />
                        <span>Twitter</span>
                    </a>
                </Menu.Item>
                <Menu.Item className="ant-menu-item">
                    <a href="https://discord.gg/6jGFP6N" target="_blank" rel="noopener noreferrer">
                        <Icon type="robot" />
                        <span>Discord</span>
                    </a>
                </Menu.Item>
            </Menu>
        </div>
    );
};

const MobileHeader = ({ mobileMenuCollapsed, notifications }) => (
    <div style={{ display: 'flex' }}>
        <span style={{
            marginTop: 'auto',
            marginBottom: 'auto',
        }}>
            <Typography.Text>
                how's my track?
            </Typography.Text>
            {mobileMenuCollapsed && <Badge
                count={notifications}
                style={{
                    marginLeft: '0.5em',
                }}
            />}
        </span>
        <img
            alt=""
            src="/logo128.png"
            style={{
                marginLeft: 'auto',
                width: '32px',
                height: '32px',
            }}
        />
    </div>
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
            <span>Sign In</span>
        </Menu.Item>
        <Menu.Item key="register">
            <Icon type="user-add" />
            <span>Register</span>
        </Menu.Item>
        <Menu.Item key="faq">
            <a href="/faq">
                <Icon type="question-circle" />
                <span>FAQ</span>
            </a>
        </Menu.Item>
    </Menu>
);

const LoggedInMenu = ({ onMenuClick, username, rating, notifications }) => (
    <Menu
        theme="light"
        onClick={onMenuClick}
        style={{
            marginBottom: 'auto',
            borderRight: 0,
        }}
    >
        <UserDetails
            username={username}
            rating={rating}
        />
        <Menu.Item key="newRequest">
            <Icon type="plus" />
            <span>New Request</span>
        </Menu.Item>
        <Menu.Item key="feedbackGroups">
            <a href="/groups">
                <Icon type="team" />
                <span>Your Groups</span>
                <Badge
                    count={notifications}
                    style={{ marginLeft: '0.5em' }}
                />
            </a>
        </Menu.Item>
        <Menu.Item key="faq">
            <a href="/faq">
                <Icon type="question-circle" />
                <span>FAQ</span>
            </a>
        </Menu.Item>
        <Menu.Item key="settings">
            <a href="/settings">
                <Icon type="setting" />
                <span>Settings</span>
            </a>
        </Menu.Item>
        <Menu.Item key="logout">
            <Icon type="user-delete" />
            <span>Sign Out</span>
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
    <div>
        {username && <LoggedInMenu
            onMenuClick={onMenuClick}
            username={username}
            rating={rating}
            notifications={notifications}
        />}
        {!username && <LoggedOutMenu
            onMenuClick={onMenuClick}
        />}
        <SocialLinksMenu
            isMobile={isMobile}
            onMenuClick={onMenuClick}
        />
    </div>
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
        <div className="menu-bar">
            {!isMobile && <a href="/" className="full-logo">
                <img alt="how's my track" src="/logo512.png" width="200px" style={{ padding: '0.5em', marginLeft: 'auto', marginRight: 'auto' }} />
            </a>}
            {isMobile && <MobileMenu
                isMobile={isMobile}
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
                onCollapseChange={onCollapseChange}
                mobileMenuCollapsed={mobileMenuCollapsed}
            />}
            {!isMobile && <MainMenu
                isMobile={isMobile}
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />}

            <FeedbackRequestModal onCancel={onFeedbackRequestModalCancel} isVisible={isFeedbackRequestModalVisible} />
            <LoginModal onCancel={onLoginModalCancel} isVisible={isLoginModalVisible} />
            <RegisterModal onCancel={onRegisterModalCancel} isVisible={isRegisterModalVisible} />
        </div>
    </Spin>
);

const MenuBar = ({ isMobile }: Props) => {
    /*
     * Component for displaying page sidebar with menu links, or for mobile,
     * displaying a menu at the top of the screen.
     */
    const [username, setUsername] = useState(null);
    const [rating, setRating] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [isFeedbackRequestModalVisible, setIsFeedbackRequestModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true);

    const logout = () => {
        return fetch(apiRoot + '/logout/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
    };

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
            logout().then(() =>
                window.location.assign('/')
            );
        },
    };

    const { isLoading } = useQuery([USER_DETAILS_QUERY], () =>
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: USER_DETAILS_QUERY,
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['userDetails']) {
                // Clear the JWT cookie in case it was mangled somehow.
                logout();
                return
            }
            setUsername(data['data']['userDetails']['username']);
            setRating(data['data']['userDetails']['rating']);
            setNotifications(data['data']['userDetails']['notifications']);
            ReactGA.set({
                username: data['data']['userDetails']['username'],
            });
        })
    );


    const onMenuClick = (event) => {
        let menuAction = menuActions[event.key];
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
}

export default MenuBar;

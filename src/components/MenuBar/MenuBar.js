import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Affix, Badge, Collapse, Drawer, Menu, Icon, Spin, Typography } from 'antd';
import FeedbackRequestModal from '../FeedbackRequestModal/FeedbackRequestModal';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

type Props = {
    isMobile: boolean,
};

type State = {
    hasProps: boolean,
    username: string,
    rating: number,
    notifications: number,
    isFeedbackRequestModalVisible: boolean,
    isLoginModalVisible: boolean,
    isRegisterModalVisible: boolean,
    isMenuVisible: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
    notifications
  }
}`;

const GA_MENU_BAR_CATEGORY = "menubar";

class MenuBar extends React.Component<Props, State> {
    /*
     * Component for displaying page sidebar with menu links, or for mobile,
     * displaying a menu at the top of the screen. See TODO above.
     */
    state = {
        hasProps: false,
        isFeedbackRequestModalVisible: false,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
        isMenuVisible: false,
    };

    componentDidMount() {
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
                // No user found; user isn't logged in.
                this.setState({
                    hasProps: true,
                })
                // Clear the JWT cookie in case it was mangled somehow.
                this.logout();
                return
            }
            this.setState({
                hasProps: true,
                username: data['data']['userDetails']['username'],
                rating: data['data']['userDetails']['rating'],
                notifications: data['data']['userDetails']['notifications'],
            });
            ReactGA.set({
                username: data['data']['userDetails']['username'],
            });
        });
    }

    logout = () => {
        return fetch(apiRoot + '/logout/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
    };

    menuActions = {
        newRequest: () => {
            this.setState({
                isFeedbackRequestModalVisible: true,
            })
        },
        login: () => {
            this.setState({
                isLoginModalVisible: true,
            })
        },
        register: () => {
            this.setState({
                isRegisterModalVisible: true,
            })
        },
        logout: () => {
            this.logout().then(result =>
                window.location.assign('/')
            );
        },
    };

    onMenuClick = (event) => {
        let menuAction = this.menuActions[event.key];
        ReactGA.event({
            category: GA_MENU_BAR_CATEGORY,
            action: event.key,
        });
        if (menuAction) {
            menuAction();
        }
    };
    
    onFeedbackRequestModalCancel = () => {
        this.setState({
            isFeedbackRequestModalVisible: false,
        })
    };

    onLoginModalCancel = () => {
        this.setState({
            isLoginModalVisible: false,
        })
    };

    onRegisterModalCancel = () => {
        this.setState({
            isRegisterModalVisible: false,
        })
    };

    renderMobileHeader = () => {
        return (
            <div style={{ display: 'flex' }}>
                <span style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    <Typography.Text>
                        how's my track?
                    </Typography.Text>
                    {!this.state.isMenuVisible && <Badge
                        count={this.state.notifications}
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
        )
    };

    renderSocialLinks = () => {
        return (
            <React.Fragment>
                <Menu.Divider className="ant-menu-item-divider" />
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
            </React.Fragment>
        );
    };

    renderLoggedOutMenu = () => {
        return (
            <Spin spinning={!this.state.hasProps}>
                <Menu
                    theme="light"
                    onClick={this.onMenuClick}
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
                    {this.renderSocialLinks()}
                </Menu>
            </Spin>
        )
    };

    renderUserDetails = () => {
        if (this.state.rating) {
            return (
                <Menu.Item disabled>
                    <div style={{ display: 'flex' }}>
                        <Typography.Text ellipsis style={{
                            marginRight: 'auto',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}>
                            {this.state.username}
                        </Typography.Text>
                        <Typography.Text strong style={{
                            marginLeft: 'auto',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}>
                            {this.state.rating.toFixed(2)}<Icon type="star" />
                        </Typography.Text>
                    </div>
                </Menu.Item>
            )
        }
        return (
            <Menu.Item disabled>
                <div style={{ display: 'flex' }}>
                    <Typography.Text ellipsis style={{
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}>
                        {this.state.username}
                    </Typography.Text>
                </div>
            </Menu.Item>
        )
    };

    renderLoggedInMenu = () => {
        return (
            <Menu
                theme="light"
                onClick={this.onMenuClick}
                style={{
                    borderRight: 0,
                }}
            >
                {this.renderUserDetails()}
                <Menu.Item key="newRequest">
                    <Icon type="plus" />
                    <span>New Request</span>
                </Menu.Item>
                <Menu.Item key="feedbackGroups">
                    <a href="/groups">
                        <Icon type="team" />
                        <span>Your Groups</span>
                        <Badge
                            count={this.state.notifications}
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
                <Menu.Item key="logout">
                    <Icon type="user-delete" />
                    <span>Sign Out</span>
                </Menu.Item>
                {this.renderSocialLinks()}
            </Menu>
        )
    };

    onCollapseChange = (key) => {
        if (key.length > 0) {
            this.setState({
                isMenuVisible: true,
            });
        } else {
            this.setState({
                isMenuVisible: false,
            });
        }
    };

    onDrawerMenuClose = () => {
        this.setState({
            isMenuVisible: false,
        });
    };

    renderMobileMenu = () => {
        return (
            <Collapse
                className="mobile-menu-collapse"
                bordered={false}
                expandIcon={
                    ({ isActive }) => (
                        <Icon type="menu" rotate={isActive ? 90 : 0} />
                    )
                }
                onChange={this.onCollapseChange}
                activeKey={this.state.isMenuVisible ? "1" : null}
            >
                <Collapse.Panel
                    header={this.renderMobileHeader()}
                    key="1"
                >
                    {this.props.isMobile && this.renderDefaultDeviceMenu()}
                </Collapse.Panel>
            </Collapse>
        );
    };

    renderDefaultDeviceMenu = () => {
        if (this.state.username) {
            return this.renderLoggedInMenu();
        }
        return this.renderLoggedOutMenu();
    };

    renderMenuBarContent = () => {
        return (
            <div>
                {this.renderMobileMenu()}

                {!this.props.isMobile && <Drawer
                    className="menu-drawer"
                    title="Menu"
                    placement="left"
                    closable={true}
                    onClose={this.onDrawerMenuClose}
                    visible={this.state.isMenuVisible}
                >
                    {this.renderDefaultDeviceMenu()}
                </Drawer>}

                <FeedbackRequestModal onCancel={this.onFeedbackRequestModalCancel} isVisible={this.state.isFeedbackRequestModalVisible} />
                <LoginModal onCancel={this.onLoginModalCancel} isVisible={this.state.isLoginModalVisible} />
                <RegisterModal onCancel={this.onRegisterModalCancel} isVisible={this.state.isRegisterModalVisible} />
            </div>
        );
    };

    render() {
        return this.renderMenuBarContent();
    }
}

export default MenuBar;

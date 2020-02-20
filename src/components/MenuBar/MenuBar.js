import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Badge, Collapse, Menu, Icon, Spin, Typography } from 'antd';
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
    incompleteResponses: number,
    isFeedbackRequestModalVisible: boolean,
    isLoginModalVisible: boolean,
    isRegisterModalVisible: boolean,
    mobileMenuCollapsed: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
    incompleteResponses
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
        mobileMenuCollapsed: true,
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
                incompleteResponses: data['data']['userDetails']['incompleteResponses'],
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
                window.location.reload()
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
                <Typography.Text
                    style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                >
                    how's my track?
                </Typography.Text>
                {this.state.mobileMenuCollapsed && <Badge
                    count={this.state.incompleteResponses}
                    style={{
                        marginLeft: '0.5em',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                />}
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

    renderLoggedOutMenu = () => {
        return (
            <Spin spinning={!this.state.hasProps}>
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={this.onMenuClick}
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
    }

    renderLoggedInMenu = () => {
        return (
            <Menu
                theme="light"
                mode="inline"
                onClick={this.onMenuClick}
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
                            count={this.state.incompleteResponses}
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
            </Menu>
        )
    };

    onCollapseChange = (key) => {
        if (key.length > 0) {
            this.setState({
                mobileMenuCollapsed: false,
            });
        } else {
            this.setState({
                mobileMenuCollapsed: true,
            });
        }
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
            >
                <Collapse.Panel
                    header={this.renderMobileHeader()}
                    key="1"
                >
                    {this.renderDefaultDeviceMenu()}
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

    render() {
        return (
            <div>
                {!this.props.isMobile && <a href="/">
                    <img alt="how's my track" src="/logo512.png" width="200px" style={{ padding: '0.5em'}} />
                </a>}
                {this.props.isMobile && this.renderMobileMenu()}
                {!this.props.isMobile && this.renderDefaultDeviceMenu()}

                <FeedbackRequestModal onCancel={this.onFeedbackRequestModalCancel} isVisible={this.state.isFeedbackRequestModalVisible} />
                <LoginModal onCancel={this.onLoginModalCancel} isVisible={this.state.isLoginModalVisible} />
                <RegisterModal onCancel={this.onRegisterModalCancel} isVisible={this.state.isRegisterModalVisible} />
            </div>
        );
    }
}

export default MenuBar;

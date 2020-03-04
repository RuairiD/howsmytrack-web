import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Affix, Badge, Collapse, Menu, Icon, Spin, Typography } from 'antd';
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

const DiscordSvg = () => (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240"><path class="st0" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path class="st0" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/></svg>
);
const DiscordIcon = (props) => <Icon component={DiscordSvg} {...props} />;

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
                    {this.state.mobileMenuCollapsed && <Badge
                        count={this.state.incompleteResponses}
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
                        <DiscordIcon />
                        <span>Discord</span>
                    </a>
                </Menu.Item>
            </React.Fragment>
        );
    }

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
                {this.renderSocialLinks()}
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

    renderMenuBarContent = () => {
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
    };

    render() {
        if (this.props.isMobile) {
            return this.renderMenuBarContent();
        }
        return (
            <Affix>
                {this.renderMenuBarContent()}
            </Affix>
        );
    }
}

export default MenuBar;

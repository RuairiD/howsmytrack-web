import React from 'react';

import apiRoot from '../../apiRoot';

import { Menu, Icon, Spin, Typography } from 'antd';
import FeedbackRequestModal from '../FeedbackRequestModal/FeedbackRequestModal';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

type State = {
    hasProps: boolean,
    username: string,
    rating: number,
    isFeedbackRequestModalVisible: boolean,
    isLoginModalVisible: boolean,
    isRegisterModalVisible: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
  }
}`;

class Sidebar extends React.Component<Props, State> {
    /*
     * Component for displaying page sidebar with menu links.
     */
    state = {
        hasProps: false,
        isFeedbackRequestModalVisible: false,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
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
        let menuAction = this.menuActions[event.key]
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

    renderLoggedOutMenu = () => {
        return (
            <Spin spinning={!this.state.hasProps}>
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={this.onMenuClick}
                >
                    <Menu.Divider />
                    <Menu.Item disabled>
                        <Typography.Text>Welcome!</Typography.Text>
                    </Menu.Item>
                    <Menu.Divider />
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
    }

    renderLoggedInMenu = () => {
        return (
            <Menu
                theme="light"
                mode="inline"
                onClick={this.onMenuClick}
            >
                <Menu.Divider />
                {this.state.rating && <Menu.Item disabled>
                    <Typography.Text>{this.state.username} - </Typography.Text>
                    <Typography.Text strong>{this.state.rating.toFixed(2)}<Icon type="star" /></Typography.Text>
                </Menu.Item>}
                {!this.state.rating && <Menu.Item disabled>
                    <Typography.Text>{this.state.username}</Typography.Text>
                </Menu.Item>}
                <Menu.Divider />
                <Menu.Item key="newRequest">
                    <Icon type="plus" />
                    <span>New Request</span>
                </Menu.Item>
                <Menu.Item key="feedbackGroups">
                    <a href="/groups">
                        <Icon type="team" />
                        <span>Your Groups</span>
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
    }

    render() {
        return (
            <div>
                <a href="/">
                    <img alt="how's my track" src="/logo400.png" width="200px" style={{ padding: '1em'}} />
                </a>
                {this.state.username && this.renderLoggedInMenu()}
                {!this.state.username && this.renderLoggedOutMenu()}
                <FeedbackRequestModal onCancel={this.onFeedbackRequestModalCancel} isVisible={this.state.isFeedbackRequestModalVisible} />
                <LoginModal onCancel={this.onLoginModalCancel} isVisible={this.state.isLoginModalVisible} />
                <RegisterModal onCancel={this.onRegisterModalCancel} isVisible={this.state.isRegisterModalVisible} />
            </div>
        );
    }
}

export default Sidebar;

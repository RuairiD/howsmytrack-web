import React from 'react';

import { Menu, Icon, Typography } from 'antd';
import FeedbackRequestModal from '../FeedbackRequestModal/FeedbackRequestModal';

type Props = {
    username: string,
    rating: number,
};

type State = {
    isFeedbackRequestModalVisible: boolean,
};

class Sidebar extends React.Component<Props, State> {
    /*
     * Component for displaying page sidebar with menu links.
     */
    state = {
        isFeedbackRequestModalVisible: false,
    };

    menuActions = {
        newRequest: () => {
            this.setState({
                isFeedbackRequestModalVisible: true,
            })
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
    }

    renderLoggedOutMenu = () => {
        return (
            <Menu
                theme="dark"
                mode="inline"
                onClick={this.onMenuClick}
            >
                <Typography.Text style={{ color: '#FFFFFF' }}>Welcome!</Typography.Text>
                <Menu.Item key="login">
                    <Icon type="user" />
                    <span>Sign In</span>
                </Menu.Item>
                <Menu.Item key="register">
                    <Icon type="user-add" />
                    <span>Register</span>
                </Menu.Item>
                <Menu.Item key="faq">
                    <Icon type="question-circle" />
                    <span>FAQ</span>
                </Menu.Item>
            </Menu>
        )
    }

    renderLoggedInMenu = () => {
        return (
            <Menu
                theme="dark"
                mode="inline"
                onClick={this.onMenuClick}
            >
                <Menu.Item>
                    <Typography.Text style={{ color: '#FFFFFF' }}>{this.props.username} - </Typography.Text>
                    <Typography.Text style={{ color: '#FFFFFF' }} strong>{this.props.rating.toFixed(2)}<Icon type="star" /></Typography.Text>
                </Menu.Item>
                <Menu.Item key="newRequest">
                    <Icon type="plus" />
                    <span>New Request</span>
                </Menu.Item>
                <Menu.Item key="feedbackGroups">
                    <Icon type="team" />
                    <span>Your Groups</span>
                </Menu.Item>
                <Menu.Item key="faq">
                    <Icon type="question-circle" />
                    <span>FAQ</span>
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
                {this.props.username && this.renderLoggedInMenu()}
                {!this.props.username && this.renderLoggedOutMenu()}
                <FeedbackRequestModal onCancel={this.onFeedbackRequestModalCancel} isVisible={this.state.isFeedbackRequestModalVisible} />
            </div>
        );
    }
}

export default Sidebar;

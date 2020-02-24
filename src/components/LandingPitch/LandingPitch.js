import React from 'react';

import { Button, Icon, List, Typography } from 'antd';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

type Props = {
    isMobile: boolean,
};

type State = {
    isLoginModalVisible: boolean,
    isRegisterModalVisible: boolean,
};

class LandingPitch extends React.Component<Props, State> {
    /*
     * Component for displaying FAQ page explaining what How's My Track? is etc.
     */
    state = {
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
    };

    steps = [
        {
            icon: "plus",
            text: "Submit your track.",
        },
        {
            icon: "usergroup-add",
            text: "Join a group.",
        },
        {
            icon: "edit",
            text: "Write feedback for your peers.",
        },
        {
            icon: "check",
            text: "Read your own feedback.",
        },
        {
            icon: "rollback",
            text: "Repeat.",
        },
    ];

    showLoginModal = () => {
        this.setState({
            isLoginModalVisible: true,
        })
    };

    showRegisterModal = () => {
        this.setState({
            isRegisterModalVisible: true,
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

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div>
                    <img alt="how's my track" src="/logo512.png" width="256px" style={{ marginBottom: '2em'}} />
                </div>
                <div style={{
                    display: 'flex',
                    margin: '1em',
                    textAlign: 'center',
                }}>
                    <Button
                        size="large"
                        onClick={this.showRegisterModal}
                        className="home-action-button"
                        style={{ marginLeft: 'auto' }}
                    >
                        Register
                    </Button>
                    <Button
                        size="large"
                        onClick={this.showLoginModal}
                        className="home-action-button"
                        style={{ marginRight: 'auto' }}
                    >
                        Sign In
                    </Button>
                </div>
                <List
                    style={{ display: "inline-block", textAlign: 'left' }}
                    itemLayout="vertical"
                    dataSource={this.steps}
                    renderItem={step => (
                        <Typography.Title level={4} style={{ display: 'flex' }}>
                            <Icon type={step.icon} style={{ marginRight: '2em' }} />
                            <div>{step.text}</div>
                        </Typography.Title>
                    )}
                />
                <LoginModal onCancel={this.onLoginModalCancel} isVisible={this.state.isLoginModalVisible} />
                <RegisterModal onCancel={this.onRegisterModalCancel} isVisible={this.state.isRegisterModalVisible} />
            </div>
        );
    }
}

export default LandingPitch;
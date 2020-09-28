import React, { useState } from 'react';

import { Button, Icon, List, Typography } from 'antd';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

const STEPS = [
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

const LandingPitch = () => {
    /*
     * Component for displaying FAQ page explaining what How's My Track? is etc.
     */
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const showRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const onLoginModalCancel = () => {
        setIsLoginModalVisible(false);
    };

    const onRegisterModalCancel = () => {
        setIsRegisterModalVisible(false);
    };

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
                    onClick={showRegisterModal}
                    className="home-action-button"
                    style={{ marginLeft: 'auto' }}
                >
                    Register
                </Button>
                <Button
                    size="large"
                    onClick={showLoginModal}
                    className="home-action-button"
                    style={{ marginRight: 'auto' }}
                >
                    Sign In
                </Button>
            </div>
            <List
                style={{ display: "inline-block", textAlign: 'left' }}
                itemLayout="vertical"
                dataSource={STEPS}
                renderItem={step => (
                    <Typography.Title level={4} style={{ display: 'flex' }}>
                        <Icon type={step.icon} style={{ marginRight: '2em' }} />
                        <div>{step.text}</div>
                    </Typography.Title>
                )}
            />
            <LoginModal onCancel={onLoginModalCancel} isVisible={isLoginModalVisible} />
            <RegisterModal onCancel={onRegisterModalCancel} isVisible={isRegisterModalVisible} />
        </div>
    );
}

export default LandingPitch;
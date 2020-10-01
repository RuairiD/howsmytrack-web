import React from 'react';

import { Modal } from 'antd';
import LoginForm from '../LoginForm/LoginForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

/*
 * Component for displaying modal containing LoginForm for users to sign in.
 */
const LoginModal = ({
    onCancel,
    isVisible,
}: Props)  => (
    <Modal
        title="Sign In"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        destroyOnClose
        className="responsive-modal"
    >
        <LoginForm />
    </Modal>
);

export default LoginModal;

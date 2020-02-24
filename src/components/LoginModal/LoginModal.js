import React from 'react';

import { Modal } from 'antd';
import LoginForm from '../LoginForm/LoginForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

class LoginModal extends React.Component<Props> {
    /*
     * Component for displaying modal containing LoginForm for users to sign in.
     */

    render() {
        return (
            <Modal
                title="Sign In"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
                className="responsive-modal"
            >
                <LoginForm />
            </Modal>
        );
    }
}

export default LoginModal;

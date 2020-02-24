import React from 'react';

import { Modal } from 'antd';
import RegisterForm from '../RegisterForm/RegisterForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

class RegisterModal extends React.Component<Props> {
    /*
     * Component for displaying modal containing RegisterForm for
     * signing up new users.
     */
    render() {
        return (
            <Modal
                title="Register"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
                className="responsive-modal"
            >
                <RegisterForm />
            </Modal>
        );
    }
}

export default RegisterModal;

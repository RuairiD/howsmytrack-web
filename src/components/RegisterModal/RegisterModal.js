import React from 'react';

import { Modal } from 'antd';
import RegisterForm from '../RegisterForm/RegisterForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

class RegisterModal extends React.Component<Props> {
    /*
     * Component without docs
     */
    render() {
        return (
            <Modal
                title="Register"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
            >
                <RegisterForm />
            </Modal>
        );
    }
}

export default RegisterModal;

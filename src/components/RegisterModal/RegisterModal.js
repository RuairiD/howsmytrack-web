import React from "react";

import { Modal } from "antd";
import RegisterForm from "../RegisterForm/RegisterForm";

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

/*
 * Component for displaying modal containing RegisterForm for
 * signing up new users.
 */
const RegisterModal = ({
    onCancel,
    isVisible,
}: Props) => (
    <Modal
        title="Register"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        destroyOnClose
        className="responsive-modal"
    >
        <RegisterForm />
    </Modal>
);

export default RegisterModal;

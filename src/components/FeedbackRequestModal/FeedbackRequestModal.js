import React from "react";

import { Modal } from "antd";
import CreateFeedbackRequestForm from "../CreateFeedbackRequestForm/CreateFeedbackRequestForm";

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

/*
    * Component for displaying modal for submitting a feedback request.
    */
const FeedbackRequestModal = ({
    onCancel,
    isVisible,
}: Props) => (
    <Modal
        title="New Feedback Request"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        destroyOnClose
        className="responsive-modal"
    >
        <CreateFeedbackRequestForm />
    </Modal>
);

export default FeedbackRequestModal;

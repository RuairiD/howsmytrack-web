import React from "react";

import { Modal } from "antd";
import EditFeedbackRequestForm from "../EditFeedbackRequestForm/EditFeedbackRequestForm";

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    genre: string,
};

/*
 * Component for displaying modal for editing a feedback request.
 */
const EditFeedbackRequestModal = ({
    onCancel,
    isVisible,
    feedbackRequestId,
    mediaUrl,
    feedbackPrompt,
    emailWhenGrouped,
    genre,
}: Props) => (
    <Modal
        title="Edit Feedback Request"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        destroyOnClose
        className="responsive-modal"
    >
        <EditFeedbackRequestForm
            feedbackRequestId={feedbackRequestId}
            mediaUrl={mediaUrl}
            feedbackPrompt={feedbackPrompt}
            emailWhenGrouped={emailWhenGrouped}
            genre={genre}
        />
    </Modal>
);

export default EditFeedbackRequestModal;

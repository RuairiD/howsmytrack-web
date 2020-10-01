import React from 'react';

import { Modal } from 'antd';

import FeedbackResponseReplies from '../FeedbackResponseReplies/FeedbackResponseReplies';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    feedbackResponseId: number,
    feedback: string,
};

const FeedbackResponseRepliesModal = ({
    onCancel,
    isVisible,
    feedbackResponseId,
    feedback,
}: Props) => (
    <Modal
        title="View Conversation"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        className="responsive-modal"
        destroyOnClose
    >
        <FeedbackResponseReplies
            feedbackResponseId={feedbackResponseId}
            feedback={feedback}
        />
    </Modal>
);

export default FeedbackResponseRepliesModal;

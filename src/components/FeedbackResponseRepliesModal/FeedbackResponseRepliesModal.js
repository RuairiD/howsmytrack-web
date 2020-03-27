import React from 'react';

import { Modal } from 'antd';

import FeedbackResponseReplies from '../FeedbackResponseReplies/FeedbackResponseReplies';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    feedbackResponseId: number,
    feedback: string,
};

class FeedbackResponseRepliesModal extends React.Component<Props, State> {
    render() {
        return (
            <Modal
                title="View Conversation"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                className="responsive-modal"
                destroyOnClose
            >
                <FeedbackResponseReplies
                    feedbackResponseId={this.props.feedbackResponseId}
                    feedback={this.props.feedback}
                />
            </Modal>
        );
    }
}

export default FeedbackResponseRepliesModal;

import React from 'react';

import { Modal } from 'antd';
import EditFeedbackRequestForm from '../EditFeedbackRequestForm/EditFeedbackRequestForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    genre: string,
};

class EditFeedbackRequestModal extends React.Component<Props> {
    /*
     * Component for displaying modal for editing a feedback request.
     */
    render() {
        return (
            <Modal
                title="Edit Feedback Request"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
            >
                <EditFeedbackRequestForm
                    feedbackRequestId={this.props.feedbackRequestId}
                    mediaUrl={this.props.mediaUrl}
                    feedbackPrompt={this.props.feedbackPrompt}
                    emailWhenGrouped={this.props.emailWhenGrouped}
                    genre={this.props.genre}
                />
            </Modal>
        );
    }
}

export default EditFeedbackRequestModal;

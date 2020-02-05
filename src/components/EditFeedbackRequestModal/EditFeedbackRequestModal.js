import React from 'react';

import { Modal } from 'antd';
import EditFeedbackRequestForm from '../EditFeedbackRequestForm/EditFeedbackRequestForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    feedbackRequestId: number,
    soundcloudUrl: string,
    feedbackPrompt: string,
};

class FeedbackRequestModal extends React.Component<Props> {
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
                    soundcloudUrl={this.props.soundcloudUrl}
                    feedbackPrompt={this.props.feedbackPrompt}
                />
            </Modal>
        );
    }
}

export default FeedbackRequestModal;

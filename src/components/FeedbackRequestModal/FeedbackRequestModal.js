import React from 'react';

import { Modal } from 'antd';
import FeedbackRequestForm from '../FeedbackRequestForm/FeedbackRequestForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

class FeedbackRequestModal extends React.Component<Props> {
    /*
     * Component without docs
     */
    submitRequest = (soundcloudUrl, feedbackPrompt) => {
        return new Promise(function(resolve, reject) {
            // TODO: AJAX request
            resolve();
        })
    };

    render() {
        return (
            <Modal
                title="New Feedback Request"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
            >
                <FeedbackRequestForm
                    onSubmit={this.submitRequest}
                />
            </Modal>
        );
    }
}

export default FeedbackRequestModal;

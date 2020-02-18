import React from 'react';

import { Modal } from 'antd';
import CreateFeedbackRequestForm from '../CreateFeedbackRequestForm/CreateFeedbackRequestForm';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
};

class FeedbackRequestModal extends React.Component<Props> {
    /*
     * Component for displaying modal for submitting a feedback request.
     */
    render() {
        return (
            <Modal
                title="New Feedback Request"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                destroyOnClose
            >
                <CreateFeedbackRequestForm />
            </Modal>
        );
    }
}

export default FeedbackRequestModal;

import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Input, Modal, Row, Spin, Typography } from 'antd';

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

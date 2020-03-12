import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Input, Modal, Row, Typography } from 'antd';

import FeedbackResponseReply from '../FeedbackResponseReply/FeedbackResponseReply';
import { type FeedbackResponseReplyProps } from '../FeedbackResponseReply/FeedbackResponseReply';

type Props = {
    onCancel: () => void,
    isVisible: boolean,
    allowFurtherReplies: boolean,
    feedbackResponseId: number,
    feedback: string,
    replies: Array<FeedbackResponseReplyProps>,
};

type State = {
    // When the modal first loads, we want to scroll to the
    // most recent reply. Only once though; we don't care after that.
    scrolledToLastReply: boolean,
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
    replyText: string,
    allowReplies: boolean,
};

const ADD_FEEDBACK_RESPONSE_REPLY_MUTATION = `mutation AddFeedbackResponseReply($feedbackResponseId: Int!, $text: String!, $allowReplies: Boolean!) {
    addFeedbackResponseReply(feedbackResponseId: $feedbackResponseId, text: $text, allowReplies: $allowReplies) {
        success
        error
    }
}`;

class FeedbackResponseRepliesModal extends React.Component<Props, State> {
    /*
     * Component for displaying modal for submitting a feedback request.
     */
    state = {
        scrolledToLastReply: false,
        requestSent: false,
        errorMessage: null,
        submitted: false,
        replyText: '',
        allowReplies: true,
    };

    scrollToBottomOfContainer = (container) => {
        if (container && this.props.isVisible && !this.state.scrolledToLastReply) {
            container.scrollTop = container.scrollHeight;
            this.setState({
                scrolledToLastReply: true,
            });
        }
    };

    onReplyTextChange = (event) => {
        this.setState({
            replyText: event.target.value,
        })
    };

    onAllowRepliesChange = (event) => {
        this.setState({
            allowReplies: event.target.checked,
        })
    };

    onSubmit = () => {
        this.setState({
            requestSent: true,
        })
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: ADD_FEEDBACK_RESPONSE_REPLY_MUTATION,
                variables: {
                    feedbackResponseId: this.props.feedbackResponseId,
                    text: this.state.replyText,
                    allowReplies: this.state.allowReplies,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                requestSent: false,
                submitted: data['data']['addFeedbackResponseReply'].success,
                errorMessage: data['data']['addFeedbackResponseReply'].error,
            });
            
            // TODO: would probably be a nicer UX if the new message loaded
            // in the modal rather than refreshing the page.
            if (data['data']['addFeedbackResponseReply'].success) {
                window.location.reload();
            }
        });
    };

    render() {
        return (
            <Modal
                title="View Conversation"
                onCancel={this.props.onCancel}
                visible={this.props.isVisible}
                footer={null}
                className="responsive-modal"
            >
                <div>
                    <div
                        onScroll={this.onContainerScroll}
                        className="replies-container"
                        ref={(container) => { this.scrollToBottomOfContainer(container) }}
                    >
                        <Typography.Paragraph style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}>
                            "{this.props.feedback}"
                        </Typography.Paragraph>
                        {this.props.replies.map((reply, i) => (
                            <FeedbackResponseReply
                                key={i}
                                username={reply.username}
                                text={reply.text}
                                timeCreated={reply.timeCreated}
                            />
                        ))}
                        {!this.props.allowFurtherReplies && <p>Further replies have been disabled for this conversation.</p>}
                    </div>
                </div>
                {this.props.allowFurtherReplies && <div>
                    <Row gutter={[16, 16]}>
                        <Col>
                            {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" showIcon />}
                            {this.state.submitted && <Alert message="Reply Sent" type="success" showIcon />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Input.TextArea
                                value={this.state.replyText}
                                onChange={this.onReplyTextChange}
                                rows={2}
                                disabled={this.state.submitted || !this.props.allowFurtherReplies}
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col style={{ display: 'flex' }}>
                            <Checkbox
                                checked={this.state.allowReplies}
                                onChange={this.onAllowRepliesChange}
                                style={{ marginRight: 'auto' }}
                            >
                                Allow additional replies.
                            </Checkbox>
                            <Button
                                style={{
                                    float: 'right',
                                }}
                                type="primary"
                                loading={this.state.requestSent}
                                disabled={this.state.submitted || !this.props.allowFurtherReplies || !this.state.replyText}
                                onClick={this.onSubmit}
                                style={{ marginLeft: 'auto' }}
                            >
                                Send Reply
                            </Button>
                        </Col>
                    </Row>
                </div>}
            </Modal>
        );
    }
}

export default FeedbackResponseRepliesModal;

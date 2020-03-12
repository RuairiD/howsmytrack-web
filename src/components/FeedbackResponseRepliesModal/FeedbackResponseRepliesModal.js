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
    shadowOpacity: number,
};

const ADD_FEEDBACK_RESPONSE_REPLY_MUTATION = `mutation AddFeedbackResponseReply($feedbackResponseId: Int!, $text: String!, $allowReplies: Boolean!) {
    addFeedbackResponseReply(feedbackResponseId: $feedbackResponseId, text: $text, allowReplies: $allowReplies) {
        success
        error
    }
}`;

const MARK_REPLIES_AS_READ_MUTATION = `mutation MarkRepliesAsRead($replyIds: [Int!]!) {
    markRepliesAsRead(replyIds: $replyIds) {
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
        shadowOpacity: 1,
    };

    scrollToBottomOfContainer = (container) => {
        if (container && this.props.isVisible && !this.state.scrolledToLastReply) {
            container.scrollTop = container.scrollHeight;
            // Mark all replies as read when the modal is first visible.
            // The backend will ensure that only replies sent *to* the
            // logged-in user will be marked as read as obviously marking
            // all replies as read (including the other user's) would be
            // very confusing.
            this.markRepliesAsRead();
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

    onContainerScroll = (event) => {
        this.setState({
            shadowOpacity: event.target.scrollTop/(event.target.scrollHeight - event.target.offsetHeight),
        });
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
            // in the modal rather than refreshing the page. Honestly this is
            // probably just a good excuse for you to learn Redux, Ruairi.
            if (data['data']['addFeedbackResponseReply'].success) {
                window.location.reload();
            }
        });
    };
    
    markRepliesAsRead = () => {
        let replyIds = [];
        for (let reply of this.props.replies) {
            replyIds.push(reply.id);
        }
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: MARK_REPLIES_AS_READ_MUTATION,
                variables: {
                    replyIds: replyIds,
                },
            }),
            credentials: 'include',
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
                <div className="scrollable-container">
                    <div
                        className="shadow shadow-top"
                        style={{
                            opacity: this.state.shadowOpacity,
                        }}
                    />
                    <div
                        onScroll={this.onContainerScroll}
                        className="replies-container"
                        ref={(container) => { this.scrollToBottomOfContainer(container) }}
                    >
                        <Typography.Paragraph style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}>
                            <Typography.Text strong>Original Feedback: </Typography.Text>"{this.props.feedback}"
                        </Typography.Paragraph>
                        {this.props.replies.map((reply, i) => (
                            <FeedbackResponseReply
                                key={i}
                                username={reply.username}
                                text={reply.text}
                                timeCreated={reply.timeCreated}
                            />
                        ))}
                    </div>
                    <div
                        className="shadow shadow-bottom"
                        style={{
                            opacity: 1 - this.state.shadowOpacity,
                        }}
                    />
                </div>
                <div style={{ padding: '0.5em 0' }}>
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
                                    placeholder="Write your reply..."
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
                    {!this.props.allowFurtherReplies && <Typography.Text strong>
                        Additional replies have been disabled for this conversation.
                    </Typography.Text>}
                </div>
            </Modal>
        );
    }
}

export default FeedbackResponseRepliesModal;

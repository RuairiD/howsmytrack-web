import React from 'react';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Input, Row, Spin, Typography } from 'antd';

import FeedbackResponseReply from '../FeedbackResponseReply/FeedbackResponseReply';
import { type FeedbackResponseReplyProps } from '../FeedbackResponseReply/FeedbackResponseReply';

type Props = {
    feedbackResponseId: number,
    feedback: string,
};

type State = {
    allowFurtherReplies: boolean,
    replies: Array<FeedbackResponseReplyProps>,
    getRepliesRequestSent: boolean,
    addReplyRequestSent: boolean,
    // When the modal first loads, we want to scroll to the
    // most recent reply. Only once though; we don't care after that.
    scrolledToLastReply: boolean,
    errorMessage: string,
    replyText: string,
    allowReplies: boolean,
    // We don't need to show the scroll bar if there's not enough
    // content to warrant scrolling.
    allowingScrolling: boolean,
    topShadowOpacity: number,
    bottomShadowOpacity: number,
};

const REPLIES_QUERY = `query Replies($feedbackResponseId: Int!) {
    replies(feedbackResponseId: $feedbackResponseId) {
        allowFurtherReplies
        replies {
            id
            username
            text
            timeCreated
        }
    }
}`;

const ADD_FEEDBACK_RESPONSE_REPLY_MUTATION = `mutation AddFeedbackResponseReply($feedbackResponseId: Int!, $text: String!, $allowReplies: Boolean!) {
    addFeedbackResponseReply(feedbackResponseId: $feedbackResponseId, text: $text, allowReplies: $allowReplies) {
        reply {
            id
            username
            text
            timeCreated
            allowReplies
        }
        error
    }
}`;

const MARK_REPLIES_AS_READ_MUTATION = `mutation MarkRepliesAsRead($replyIds: [Int!]!) {
    markRepliesAsRead(replyIds: $replyIds) {
        success
        error
    }
}`;

class FeedbackResponseReplies extends React.Component<Props, State> {
    /*
     * Component for displaying modal for submitting a feedback request.
     */
    state = {
        allowFurtherReplies: false,
        replies: [],
        scrolledToLastReply: false,
        getRepliesRequestSent: false,
        addReplyRequestSent: false,
        errorMessage: null,
        replyText: '',
        allowReplies: true,
        allowingScrolling: true,
        topShadowOpacity: 0,
        bottomShadowOpacity: 0,
    };

    repliesContainer = null;

    componentDidMount() {
        this.getReplies();
    }

    setRepliesContainer = (repliesContainer) => {
        this.repliesContainer = repliesContainer;
    };

    scrollToBottomReply = () => {
        if (this.repliesContainer) {
            this.repliesContainer.scrollTop = this.repliesContainer.scrollHeight;
            this.onRepliesContainerScroll({ target: this.repliesContainer });
        }
    };

    getReplies = () => {
        this.setState({
            getRepliesRequestSent: true,
        });
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: REPLIES_QUERY,
                variables: {
                    feedbackResponseId: this.props.feedbackResponseId
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                getRepliesRequestSent: false,
            });
            // No data can be received when user has not rated the feedback they
            // are attempting to read replies to.
            if (!data['data']['replies']) {
                return;
            }
            this.setState({
                allowFurtherReplies: data['data']['replies']['allowFurtherReplies'],
                replies: data['data']['replies']['replies'],
            });
            this.markRepliesAsRead();
            this.scrollToBottomReply();
        });
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

    onRepliesContainerScroll = (event) => {
        // If there is content that isn't visible because it is being rendered above or
        // below the visible portion of the scrollable container, display the shadows to
        // make it clear there's content that's being hidden. Otherwise, hide them.
        const scrollableHeight = event.target.scrollHeight - event.target.offsetHeight;
        if (scrollableHeight > 0) {
            const opacity = event.target.scrollTop/scrollableHeight;
            this.setState({
                allowingScrolling: true,
                topShadowOpacity: opacity,
                bottomShadowOpacity: 1 - opacity,
            });
        } else {
            this.setState({
                allowingScrolling: false,
                topShadowOpacity: 0,
                bottomShadowOpacity: 0,
            });
        }
    };

    onAddReplySubmit = () => {
        this.setState({
            addReplyRequestSent: true,
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
                addReplyRequestSent: false,
                errorMessage: data['data']['addFeedbackResponseReply'].error,
                allowFurtherReplies: data['data']['addFeedbackResponseReply'].reply.allowReplies
            });

            // Add new reply to replies so it appears in the conversation
            if (data['data']['addFeedbackResponseReply'].reply) {
                this.setState({
                    replyText: '',
                    replies: this.state.replies.concat(
                        data['data']['addFeedbackResponseReply'].reply,
                    )
                });
                this.scrollToBottomReply();
            }
        });
    };
    
    markRepliesAsRead = () => {
        // Mark all replies as read when the modal is first visible.
        // The backend will ensure that only replies sent *to* the
        // logged-in user will be marked as read as obviously marking
        // all replies as read (including the other user's) would be
        // very confusing.
        let replyIds = [];
        for (let reply of this.state.replies) {
            replyIds.push(reply.id);
        }
        return fetch(apiRoot + '/graphql/', {
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
            <Spin spinning={this.state.getRepliesRequestSent}>
                <div className="scrollable-container">
                    <div
                        className="shadow shadow-top"
                        style={{
                            opacity: this.state.topShadowOpacity,
                        }}
                    />
                    <div
                        onScroll={this.onRepliesContainerScroll}
                        className={this.state.allowingScrolling ? "replies-container" : null}
                        ref={(container) => { this.setRepliesContainer(container) }}
                    >
                        <Typography.Paragraph style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}>
                            <Typography.Text strong>Original Feedback: </Typography.Text>"{this.props.feedback}"
                        </Typography.Paragraph>
                        {this.state.replies.map((reply, i) => (
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
                            opacity: this.state.bottomShadowOpacity,
                        }}
                    />
                </div>
                <div style={{ padding: '0.5em 0' }}>
                    {this.state.allowFurtherReplies && <div>
                        <Row gutter={[16, 16]}>
                            <Col>
                                {this.state.errorMessage && <Alert message={this.state.errorMessage} type="error" showIcon />}
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Input.TextArea
                                    placeholder="Write your reply..."
                                    value={this.state.replyText}
                                    onChange={this.onReplyTextChange}
                                    rows={2}
                                    disabled={!this.state.allowFurtherReplies}
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
                                    loading={this.state.addReplyRequestSent}
                                    disabled={!this.state.allowFurtherReplies || !this.state.replyText}
                                    onClick={this.onAddReplySubmit}
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Send Reply
                                </Button>
                            </Col>
                        </Row>
                    </div>}
                    {(!this.state.getRepliesRequestSent && !this.state.allowFurtherReplies) && <Typography.Text strong>
                        Additional replies have been disabled for this conversation.
                    </Typography.Text>}
                </div>
            </Spin>
        );
    }
}

export default FeedbackResponseReplies;

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Input, Row, Spin, Typography } from 'antd';
import { Div } from 'lemon-reset';

import FeedbackResponseReply from '../FeedbackResponseReply/FeedbackResponseReply';

type Props = {
    feedbackResponseId: number,
    feedback: string,
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

const FeedbackResponseReplies = ({
    feedbackResponseId,
    feedback,
}: Props) => {
    /*
     * Component for displaying modal for submitting a feedback request.
     */
    const [replyText, setReplyText] = useState('');
    const [allowReplies, setAllowReplies] = useState(true);
    // We don't need to show the scroll bar if there's not enough
    // content to warrant scrolling.
    const [allowingScrolling, setAllowingScrolling] = useState(true);
    const [topShadowOpacity, setTopShadowOpacity] = useState(0);
    const [bottomShadowOpacity, setBottomShadowOpacity] = useState(0);

    const repliesContainer = useRef(null);

    const onRepliesContainerScroll = (event) => {
        // If there is content that isn't visible because it is being rendered above or
        // below the visible portion of the scrollable container, display the shadows to
        // make it clear there's content that's being hidden. Otherwise, hide them.
        const scrollableHeight = event.target.scrollHeight - event.target.clientHeight;
        if (scrollableHeight > 0) {
            const opacity = event.target.scrollTop/scrollableHeight;
            setAllowingScrolling(true);
            setTopShadowOpacity(opacity);
            setBottomShadowOpacity(1 - opacity);
        } else {
            setAllowingScrolling(false);
            setTopShadowOpacity(0);
            setBottomShadowOpacity(0);
        }
    };

    const scrollToBottomReply = useCallback(() => {
        if (repliesContainer.current) {
            repliesContainer.current.scrollTop = repliesContainer.current.scrollHeight;
            onRepliesContainerScroll({ target: repliesContainer.current });
        }
    }, [repliesContainer]);
    
    const markRepliesAsRead = ({ replies }) => {
        // Mark all replies as read when the modal is first visible.
        // The backend will ensure that only replies sent *to* the
        // logged-in user will be marked as read as obviously marking
        // all replies as read (including the other user's) would be
        // very confusing.
        let replyIds = [];
        for (let reply of replies) {
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

    const [markRepliesAsReadMutate] = useMutation(markRepliesAsRead);

    const addReply = ({
        feedbackResponseId,
        replyText,
        allowReplies,
    }) => (
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: ADD_FEEDBACK_RESPONSE_REPLY_MUTATION,
                variables: {
                    feedbackResponseId: feedbackResponseId,
                    text: replyText,
                    allowReplies: allowReplies,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then(data =>
            data.data.addFeedbackResponseReply
        )
    );

    const [addReplyMutate, { isLoading: isLoadingAddReply, data: addReplyData }] = useMutation(addReply);

    const getReplies = () => (
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: REPLIES_QUERY,
                variables: {
                    feedbackResponseId: feedbackResponseId
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then(data =>
            data.data.replies
        )
    );

    const { isLoading: isLoadingReplies, data: repliesData } = useQuery(
        // By refetching when `addReplyData` changes, we can force
        // the replies to update with the newly added reply.
        [REPLIES_QUERY, addReplyData],
        getReplies
    );

    useEffect(() => {
        if (repliesData && repliesData.replies) {
            markRepliesAsReadMutate({ replies: repliesData.replies });
            scrollToBottomReply();
        }
    }, [repliesData, markRepliesAsReadMutate, scrollToBottomReply]);

    let allowFurtherReplies = (repliesData && repliesData.allowFurtherReplies);

    const onAddReplySubmit = () => {
        addReplyMutate({
            feedbackResponseId: feedbackResponseId,
            replyText: replyText,
            allowReplies: allowReplies,
        })
    };

    useEffect(() => {
        if (addReplyData && addReplyData.reply) {
            // Clear textfield
            setReplyText('');
        }
    }, [addReplyData, scrollToBottomReply]);

    if (addReplyData && addReplyData.reply) {
        allowFurtherReplies = addReplyData.reply.allowReplies;
    }

    const onReplyTextChange = (event) => {
        setReplyText(event.target.value);
    };

    const onAllowRepliesChange = (event) => {
        setAllowReplies(event.target.checked);
    };

    return (
        <Spin spinning={isLoadingReplies}>
            <Div className="scrollable-container">
                <Div
                    className="shadow shadow-top"
                    style={{
                        opacity: topShadowOpacity,
                    }}
                />
                <Div
                    onScroll={onRepliesContainerScroll}
                    className={(!isLoadingReplies && allowingScrolling) ? "replies-container" : null}
                    ref={repliesContainer}
                >
                    <Typography.Paragraph style={{
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                    }}>
                        <Typography.Text strong>Original Feedback: </Typography.Text>"{feedback}"
                    </Typography.Paragraph>
                    {repliesData && repliesData.replies.map((reply, i) => (
                        <FeedbackResponseReply
                            key={i}
                            username={reply.username}
                            text={reply.text}
                            timeCreated={reply.timeCreated}
                        />
                    ))}
                </Div>
                <Div
                    className="shadow shadow-bottom"
                    style={{
                        opacity: bottomShadowOpacity,
                    }}
                />
            </Div>
            <Div style={{ padding: '0.5em 0' }}>
                {allowFurtherReplies && repliesData && <Div>
                    <Row gutter={[16, 16]}>
                        <Col>
                            {addReplyData && addReplyData.error && <Alert message={addReplyData.error} type="error" showIcon />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Input.TextArea
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={onReplyTextChange}
                                rows={2}
                                disabled={!repliesData.allowFurtherReplies}
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col style={{ display: 'flex' }}>
                            <Checkbox
                                checked={allowReplies}
                                onChange={onAllowRepliesChange}
                                style={{ marginRight: 'auto' }}
                            >
                                Allow additional replies.
                            </Checkbox>
                            <Button
                                type="primary"
                                loading={isLoadingAddReply}
                                disabled={!allowFurtherReplies || !replyText}
                                onClick={onAddReplySubmit}
                                style={{ marginLeft: 'auto' }}
                            >
                                Send Reply
                            </Button>
                        </Col>
                    </Row>
                </Div>}
                {(!isLoadingReplies && !allowFurtherReplies) && <Typography.Text strong>
                    Additional replies have been disabled for this conversation.
                </Typography.Text>}
            </Div>
        </Spin>
    );
}

export default FeedbackResponseReplies;

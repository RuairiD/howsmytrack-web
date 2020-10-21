import React, { useCallback, useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

import { Spin, Typography } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";

import FeedbackResponseReply from "../FeedbackResponseReply/FeedbackResponseReply";
import AddReplyForm from "./AddReplyForm";
import setAllowingScrollingAndShadowOpacities from "./setAllowingScrollingAndShadowOpacities";

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
    // We don't need to show the scroll bar if there's not enough
    // content to warrant scrolling.
    const [allowingScrolling, setAllowingScrolling] = useState(true);
    const [topShadowOpacity, setTopShadowOpacity] = useState(0);
    const [bottomShadowOpacity, setBottomShadowOpacity] = useState(0);

    const repliesContainer = useRef(null);

    const onRepliesContainerScroll = () => {
        setAllowingScrollingAndShadowOpacities(
            repliesContainer.current,
            setAllowingScrolling,
            setTopShadowOpacity,
            setBottomShadowOpacity,
        );
    };

    const scrollToBottomReply = useCallback(() => {
        repliesContainer.current.scrollTop = repliesContainer.current.scrollHeight;
        onRepliesContainerScroll();
    }, [repliesContainer]);

    const markRepliesAsRead = ({ replies }) => {
        // Mark all replies as read when the modal is first visible.
        // The backend will ensure that only replies sent *to* the
        // logged-in user will be marked as read as obviously marking
        // all replies as read (including the other user's) would be
        // very confusing.
        const replyIds = [];
        for (const reply of replies) {
            replyIds.push(reply.id);
        }
        return axios.post(`${apiRoot}/graphql/`, {
            query: MARK_REPLIES_AS_READ_MUTATION,
            variables: {
                replyIds,
            },
        });
    };

    const [markRepliesAsReadMutate] = useMutation(markRepliesAsRead);

    const getReplies = () => (
        axios.post(`${apiRoot}/graphql/`, {
            query: REPLIES_QUERY,
            variables: {
                feedbackResponseId,
            },
        }).then((response) => response.data.data.replies)
    );

    const { isLoading: isLoadingReplies, data: repliesData, refetch: refetchReplies } = useQuery(
        // By refetching when `addReplyData` changes, we can force
        // the replies to update with the newly added reply.
        [REPLIES_QUERY],
        getReplies,
    );

    useEffect(() => {
        if (repliesData && repliesData.replies) {
            markRepliesAsReadMutate({ replies: repliesData.replies });
            scrollToBottomReply();
        }
    }, [repliesData, markRepliesAsReadMutate, scrollToBottomReply]);

    const allowFurtherReplies = (repliesData && repliesData.allowFurtherReplies);

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
                    tagRef={repliesContainer}
                >
                    <Typography.Paragraph style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                    }}
                    >
                        <Typography.Text strong>Original Feedback: </Typography.Text>"{feedback}"
                    </Typography.Paragraph>
                    {repliesData && repliesData.replies.map((reply) => (
                        <FeedbackResponseReply
                            key={reply.id}
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
            <AddReplyForm
                feedbackResponseId={feedbackResponseId}
                refetchReplies={refetchReplies}
                isLoadingReplies={isLoadingReplies}
                allowFurtherReplies={allowFurtherReplies}
            />
        </Spin>
    );
};

export default FeedbackResponseReplies;


import React, { useCallback, useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

import { Alert, Button, Checkbox, Col, Input, Row, Spin, Typography } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";

import FeedbackResponseReply from "../FeedbackResponseReply/FeedbackResponseReply";

const ADD_FEEDBACK_RESPONSE_REPLY_MUTATION = `mutation AddFeedbackResponseReply($feedbackResponseId: Int!, $text: String!, $allowReplies: Boolean!) {
    addFeedbackResponseReply(feedbackResponseId: $feedbackResponseId, text: $text, allowReplies: $allowReplies) {
        reply {
            allowReplies
        }
        error
    }
}`;

const FeedbackResponseRepliesTextField = ({
    feedbackResponseId,
    refetchReplies,
    isLoadingReplies,
    allowFurtherReplies,
}) => {
    const [replyText, setReplyText] = useState("");
    const [allowReplies, setAllowReplies] = useState(true);

    const addReply = () => (
        axios.post(`${apiRoot}/graphql/`, {
            query: ADD_FEEDBACK_RESPONSE_REPLY_MUTATION,
            variables: {
                feedbackResponseId,
                text: replyText,
                allowReplies,
            },
        }).then((response) => response.data.data.addFeedbackResponseReply)
    );

    const [addReplyMutate, { isLoading, data }] = useMutation(addReply);

    const onAddReplySubmit = () => {
        addReplyMutate();
    };

    useEffect(() => {
        if (data && data.reply) {
            // Clear textfield
            setReplyText("");
            refetchReplies();
        }
    }, [data, refetchReplies]);

    let canReply = allowFurtherReplies
    if (data && data.reply) {
        canReply = data.reply.allowReplies;
    }

    const onReplyTextChange = (event) => {
        setReplyText(event.target.value);
    };

    const onAllowRepliesChange = (event) => {
        setAllowReplies(event.target.checked);
    };

    return (
        <Div style={{ padding: "0.5em 0" }}>
            {canReply && (
                <Div>
                    <Row gutter={[16, 16]}>
                        <Col>
                            {data && data.error && <Alert message={data.error} type="error" showIcon />}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Input.TextArea
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={onReplyTextChange}
                                rows={2}
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col style={{ display: "flex" }}>
                            <Checkbox
                                checked={allowReplies}
                                onChange={onAllowRepliesChange}
                                style={{ marginRight: "auto" }}
                            >
                                Allow additional replies.
                            </Checkbox>
                            <Button
                                type="primary"
                                loading={isLoading}
                                disabled={!canReply || !replyText}
                                onClick={onAddReplySubmit}
                                style={{ marginLeft: "auto" }}
                            >
                                Send Reply
                            </Button>
                        </Col>
                    </Row>
                </Div>
            )}
            {(!isLoadingReplies && !canReply) && (
                <Typography.Text strong>
                    Additional replies have been disabled for this conversation.
                </Typography.Text>
            )}
        </Div>
    );
}

export default FeedbackResponseRepliesTextField;

import React, { useState, useMemo } from "react";
import { useMutation } from "react-query";

import { Button, Card, Col, Rate, Row, Typography } from "antd";
import { Div, Span } from "lemon-reset";
import apiRoot from "../../apiRoot";

import ViewRepliesButton from "../ViewRepliesButton/ViewRepliesButton";
import FeedbackResponseRepliesModal from "../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal";

export type FeedbackResponseProps = {
    feedbackResponseId: number,
    feedback: string,
    currentRating: number,
    allowReplies: boolean,
    replies: number,
    unreadReplies: number,
};

const RATE_FEEDBACK_RESPONSE_MUTATION = `mutation RateFeedbackResponse($feedbackResponseId: Int!, $rating: Int!) {
    rateFeedbackResponse(feedbackResponseId: $feedbackResponseId, rating: $rating) {
        success
        error
    }
}`;

const RATING_TOOLTIP_TEXTS = [
    "This feedback is irrelevant and completely unhelpful.",
    "This feedback is vague, unhelpful, irrelevant or poorly written.",
    "This feedback is useful.",
    "This feedback is relevant, helpful and thoughtful.",
    "This feedback is deeply thoughtful, well-written and very constructive.",
];

const FeedbackResponse = ({
    feedbackResponseId,
    feedback,
    currentRating,
    allowReplies,
    replies,
    unreadReplies,
}: FeedbackResponseProps) => {
    /*
     * Component for showing user the feedback they have received from another user.
     * Only displayed in a feedback group once the user who received the feedback has
     * left feedback for everyone else in the group.
     */

    const [rating, setRating] = useState(currentRating);
    const [isRepliesModalVisible, setIsRepliesModalVisible] = useState(false);

    const submitRating = ({ newRating }) => (
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: RATE_FEEDBACK_RESPONSE_MUTATION,
                variables: {
                    feedbackResponseId,
                    rating: newRating,
                },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.rateFeedbackResponse)
    );

    const [submitRatingMutate, { data, isLoading }] = useMutation(submitRating);

    const submitted = useMemo(() => (!!currentRating || (data && data.success)), [currentRating, data]);

    const onRatingChange = (newRating) => {
        setRating(newRating);
    };

    const showRepliesModal = () => {
        setIsRepliesModalVisible(true);
    };

    const onRepliesModalCancel = () => {
        setIsRepliesModalVisible(false);
    };

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col>
                    <Typography.Paragraph style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                    }}
                    >
                        "{feedback}"
                    </Typography.Paragraph>
                </Col>
            </Row>
            <Card.Meta
                title="How helpful was this feedback?"
                description={(
                    <Div style={{ display: "inline" }}>
                        <Span style={{ float: "left", paddingBottom: "0.25em" }}>
                            <Rate
                                style={{
                                    color: "#000000",
                                    marginRight: "1em",
                                }}
                                allowClear
                                tooltips={RATING_TOOLTIP_TEXTS}
                                value={rating}
                                disabled={submitted || isLoading}
                                onChange={onRatingChange}
                            />
                            <Button
                                type="primary"
                                loading={isLoading}
                                disabled={submitted || isLoading || !rating}
                                onClick={() => submitRatingMutate({
                                    feedbackResponseId,
                                    newRating: rating,
                                })}
                            >
                                {submitted && "Rated"}
                                {!submitted && "Rate"}
                            </Button>
                        </Span>
                        {(allowReplies && submitted) && (
                            <ViewRepliesButton
                                replies={replies}
                                unreadReplies={unreadReplies}
                                onClick={showRepliesModal}
                            />
                        )}
                    </Div>
                )}
            />
            {allowReplies && (
                <FeedbackResponseRepliesModal
                    feedbackResponseId={feedbackResponseId}
                    feedback={feedback}
                    onCancel={onRepliesModalCancel}
                    isVisible={isRepliesModalVisible}
                />
            )}
        </Card>
    );
};

export default FeedbackResponse;

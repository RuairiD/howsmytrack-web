import React, { useState, useMemo } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { Button, Rate } from "antd";
import { Span } from "lemon-reset";
import apiRoot from "../../apiRoot";

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

const FeedbackResponseRater = ({
    feedbackResponseId,
    currentRating,
}) => {
    const [rating, setRating] = useState(currentRating);

    const onRatingChange = (newRating) => {
        setRating(newRating);
    };

    const submitRating = () => (
        axios.post(`${apiRoot()}/graphql/`, {
            query: RATE_FEEDBACK_RESPONSE_MUTATION,
            variables: {
                feedbackResponseId,
                rating,
            },
        }).then((response) => response.data.data.rateFeedbackResponse)
    );

    const [submitRatingMutate, { data, isLoading }] = useMutation(submitRating);

    const submitted = useMemo(() => (!!currentRating || (data && data.success)), [currentRating, data]);

    return (
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
                onClick={submitRatingMutate}
            >
                {submitted && "Rated"}
                {!submitted && "Rate"}
            </Button>
        </Span>
    );
};

export default FeedbackResponseRater;

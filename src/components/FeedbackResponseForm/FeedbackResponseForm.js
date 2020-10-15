import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import ReactGA from "react-ga";

import { Alert, Button, Card, Checkbox, Col, Input, Row, Typography } from "antd";
import { Div } from "lemon-reset";
import apiRoot from "../../apiRoot";

import ViewRepliesButton from "../ViewRepliesButton/ViewRepliesButton";
import MediaEmbed from "../MediaEmbed/MediaEmbed";
import FeedbackResponseRepliesModal from "../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal";

export type FeedbackResponseFormProps = {
    feedbackResponseId: number,
    currentFeedback: string,
    mediaUrl: string,
    mediaType: string,
    feedbackPrompt: string,
    alreadySubmitted: boolean,
    currentAllowReplies: boolean,
    replies: number,
    unreadReplies: number,
};

const SUBMIT_FEEDBACK_RESPONSE_MUTATION = `mutation SubmitFeedbackResponse($feedbackResponseId: Int!, $feedback: String!, $allowReplies: Boolean!) {
    submitFeedbackResponse(feedbackResponseId: $feedbackResponseId, feedback: $feedback, allowReplies: $allowReplies) {
        success
        error
    }
}`;

const GA_FEEDBACK_RESPONSE_CATEGORY = "feedbackResponse";

const OriginalRequest = ({ mediaUrl, mediaType, feedbackPrompt }) => (
    <Div>
        <Row gutter={[16, 16]}>
            <Col>
                <MediaEmbed mediaUrl={mediaUrl} mediaType={mediaType} />
            </Col>
        </Row>
        {
            feedbackPrompt
            && (
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>The requester has said: </Typography.Text>
                        <Typography.Text>"{feedbackPrompt}"</Typography.Text>
                    </Col>
                </Row>
            )
        }
    </Div>
);

const FormRow = ({ children }) => (
    <Row gutter={[16, 16]}>
        <Col>
            {children}
        </Col>
    </Row>
);

const FeedbackResponseForm = ({
    feedbackResponseId,
    currentFeedback,
    mediaUrl,
    mediaType,
    feedbackPrompt,
    alreadySubmitted,
    currentAllowReplies,
    replies,
    unreadReplies,
}: FeedbackResponseFormProps) => {
    /*
     * Component for displaying feedback form for a group member to complete.
     */
    const [feedback, setFeedback] = useState(currentFeedback);
    const [allowReplies, setAllowReplies] = useState(currentAllowReplies);
    const [isRepliesModalVisible, setIsRepliesModalVisible] = useState(false);

    useEffect(() => {
        ReactGA.event({
            category: GA_FEEDBACK_RESPONSE_CATEGORY,
            action: "view",
        });
    }, []);

    const onFeedbackTextChange = (event) => {
        setFeedback(event.target.value);
    };

    const onAllowRepliesChange = (event) => {
        setAllowReplies(event.target.checked);
    };

    const submitForm = () => {
        ReactGA.event({
            category: GA_FEEDBACK_RESPONSE_CATEGORY,
            action: "submit",
        });
        return fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                query: SUBMIT_FEEDBACK_RESPONSE_MUTATION,
                variables: {
                    feedbackResponseId,
                    feedback,
                    allowReplies,
                },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.submitFeedbackResponse);
    };

    const [submitFormMutate, { isLoading, data }] = useMutation(submitForm);

    if (data) {
        if (data.success) {
            ReactGA.event({
                category: GA_FEEDBACK_RESPONSE_CATEGORY,
                action: "success",
            });
        } else {
            ReactGA.event({
                category: GA_FEEDBACK_RESPONSE_CATEGORY,
                action: "error",
            });
        }
    }

    const submitted = alreadySubmitted || (data && data.success);

    const showRepliesModal = () => {
        setIsRepliesModalVisible(true);
    };

    const onRepliesModalCancel = () => {
        setIsRepliesModalVisible(false);
    };

    return (
        <Card>
            <OriginalRequest mediaUrl={mediaUrl} mediaType={mediaType} feedbackPrompt={feedbackPrompt} />
            <Div>
                <FormRow>
                    <Input.TextArea
                        value={feedback}
                        onChange={onFeedbackTextChange}
                        rows={8}
                        disabled={submitted}
                    />
                    {data && data.error && <Alert message={data.error} type="error" showIcon />}
                </FormRow>
                <FormRow>
                    <Checkbox
                        checked={allowReplies}
                        onChange={onAllowRepliesChange}
                        disabled={submitted}
                    >
                        Allow the recipient to anonymously reply to your feedback.
                    </Checkbox>
                </FormRow>
                <FormRow>
                    <Button
                        block
                        type="primary"
                        loading={isLoading}
                        disabled={submitted || !feedback}
                        onClick={submitFormMutate}
                    >
                        {!submitted && "Submit Feedback"}
                        {submitted && "Submitted"}
                    </Button>
                </FormRow>
                {allowReplies && submitted && (
                    <FormRow>
                        <ViewRepliesButton
                            replies={replies}
                            unreadReplies={unreadReplies}
                            onClick={showRepliesModal}
                        />
                    </FormRow>
                )}
            </Div>
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

export default FeedbackResponseForm;

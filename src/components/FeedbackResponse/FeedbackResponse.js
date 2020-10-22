import React, { useState } from "react";

import { Card, Col, Row, Typography } from "antd";
import { Div } from "lemon-reset";

import ViewRepliesButton from "../ViewRepliesButton/ViewRepliesButton";
import FeedbackResponseRepliesModal from "../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal";
import FeedbackResponseRater from "./FeedbackResponseRater";

export type FeedbackResponseProps = {
    feedbackResponseId: number,
    feedback: string,
    currentRating: number,
    allowReplies: boolean,
    replies: number,
    unreadReplies: number,
};

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
    const [isRepliesModalVisible, setIsRepliesModalVisible] = useState(false);

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
                        <FeedbackResponseRater
                            feedbackResponseId={feedbackResponseId}
                            currentRating={currentRating}
                        />
                        {(allowReplies && !!currentRating) && (
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

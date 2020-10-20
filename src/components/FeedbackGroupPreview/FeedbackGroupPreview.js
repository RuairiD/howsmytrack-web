import React from "react";

import { Button, Card, Row, Col, Icon, Progress, Tooltip, Typography } from "antd";
import { A, Div } from "lemon-reset";

import type { FeedbackRequestSummaryProps } from "../FeedbackRequestSummary/FeedbackRequestSummary";

import CardTitle from "./CardTitle";
import CardExtra from "./CardExtra";
import RequestForGroup from "./RequestForGroup";

const FEEDBACK_FOR_THEM_TOOLTIP = "How many tracks you've written feedback for in this group.";
const FEEDBACK_FOR_YOU_TOOLTIP = "How many members of this group have written feedback for your track (this number is hidden if you have not yet written feedback for everyone in your group)";

export type FeedbackGroupPreviewProps = {
    feedbackGroupId: number,
    name: string,
    timeCreated: string,
    // The user's original request for the group
    feedbackRequestSummary: FeedbackRequestSummaryProps,
    // Number of users in the group with tracks
    userCount: number,
    // Number of users in the group without tracks
    tracklessUserCount: number,
    // Number of submissions in the group for which the logged-in user has submitted feedback
    userFeedbackCount: number,
    // Number of group members who have submitted feedback for the user
    feedbackResponseCount: number,
    // Number of replies sent to the user that haven't been read yet.
    unreadReplies: number,
};

/*
 * Component for inline group preview shown on FeedbackGroupsPage
 */
const FeedbackGroupPreview = ({
    feedbackGroupId,
    name,
    timeCreated,
    feedbackRequestSummary,
    userCount,
    tracklessUserCount,
    userFeedbackCount,
    feedbackResponseCount,
    unreadReplies,
}: FeedbackGroupPreviewProps) => (
    <Div>
        <Card title={(
            <CardTitle
                feedbackGroupId={feedbackGroupId}
                name={name}
                unreadReplies={unreadReplies}
            />
        )}
        >
            <A href={`/group/${feedbackGroupId}`}>
                <RequestForGroup mediaUrl={feedbackRequestSummary.mediaUrl} mediaType={feedbackRequestSummary.mediaType} />
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>Feedback for them</Typography.Text>
                        <Tooltip
                            title={FEEDBACK_FOR_THEM_TOOLTIP}
                        >
                            <Button type="link"><Icon type="question-circle" /></Button>
                        </Tooltip>
                        <Progress
                            percent={100 * (userFeedbackCount / userCount)}
                            format={() => `${userFeedbackCount}/${userCount}`}
                            width={80}
                        />
                    </Col>
                </Row>
                {feedbackRequestSummary.mediaUrl && (
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Text strong>Feedback for you</Typography.Text>
                            <Tooltip
                                title={FEEDBACK_FOR_YOU_TOOLTIP}
                            >
                                <Button type="link"><Icon type="question-circle" /></Button>
                            </Tooltip>
                            <Progress
                                percent={100 * (feedbackResponseCount / (userCount + tracklessUserCount))}
                                format={() => `${feedbackResponseCount}/${userCount + tracklessUserCount}`}
                                width={80}
                            />
                        </Col>
                    </Row>
                )}
                <Card.Meta description={<CardExtra timeCreated={timeCreated} />} />
            </A>
        </Card>
    </Div>
);

export default FeedbackGroupPreview;

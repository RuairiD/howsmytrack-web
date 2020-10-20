import React from "react";

import { Col, List, Result, Row, Typography } from "antd";
import { Div } from "lemon-reset";

import FeedbackResponseForm from "../FeedbackResponseForm/FeedbackResponseForm";
import type { FeedbackResponseFormProps } from "../FeedbackResponseForm/FeedbackResponseForm";

import type { FeedbackResponseProps } from "../FeedbackResponse/FeedbackResponse";

import type { FeedbackRequestSummaryProps } from "../FeedbackRequestSummary/FeedbackRequestSummary";
import FeedbackGroupRequest from "./FeedbackGroupRequest";

const LIST_GRID_LAYOUT = {
    gutter: 16,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
    xxl: 2,
};

type Props = {
    feedbackResponseForms: Array<FeedbackResponseFormProps>,
    feedbackReceived: Array<FeedbackResponseProps>,
    feedbackRequestSummary: FeedbackRequestSummaryProps,
};

const FeedbackGroup = ({
    feedbackResponseForms,
    feedbackReceived,
    feedbackRequestSummary,
}: Props) => {
    if (feedbackResponseForms) {
        return (
            <Div>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Title level={3}>Feedback requests for you</Typography.Title>
                    </Col>
                </Row>
                <List
                    grid={LIST_GRID_LAYOUT}
                    dataSource={feedbackResponseForms}
                    renderItem={(feedbackResponseForm) => (
                        <List.Item>
                            <FeedbackResponseForm
                                {...feedbackResponseForm}
                            />
                        </List.Item>
                    )}
                />

                {feedbackRequestSummary.mediaUrl && (
                    <FeedbackGroupRequest
                        feedbackRequestSummary={feedbackRequestSummary}
                        feedbackReceived={feedbackReceived}
                    />
                )}
            </Div>
        );
    }
    return (
        <Result
            status="error"
            title="You are not authorised to view this group."
        />
    );
};

export default FeedbackGroup;

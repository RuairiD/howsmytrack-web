import React from 'react';

import { Card, Col, Divider, Empty, List, Result, Row, Typography } from 'antd';

import FeedbackResponseForm from '../FeedbackResponseForm/FeedbackResponseForm';
import type { FeedbackResponseFormProps } from '../FeedbackResponseForm/FeedbackResponseForm';

import FeedbackResponse from '../FeedbackResponse/FeedbackResponse';
import type { FeedbackResponseProps } from '../FeedbackResponse/FeedbackResponse';

import FeedbackRequestSummary from '../FeedbackRequestSummary/FeedbackRequestSummary';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type Props = {
    name: string,
    timeCreated: string,
    feedbackResponseForms: Array<FeedbackResponseFormProps>,
    feedbackReceived: Array<FeedbackResponseProps>,
    feedbackRequestSummary: FeedbackRequestSummaryProps,
};

const LIST_GRID_LAYOUT = {
    gutter: 16,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
    xxl: 2,
};

const ReceivedFeedback = ({ feedbackReceived }) => {
    if (feedbackReceived === null || feedbackReceived === undefined) {
        return (
            <Card>
                <Empty
                    style={{ margin: '1em' }}
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description="Feedback for your submission will appear here once you have submitted feedback for everyone else in your group."
                />
            </Card>
        )
    }

    if (feedbackReceived.length === 0) {
        return (
            <Card>
                <Empty
                    style={{ margin: '1em' }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Nobody in your group has submitted feedback yet..."
                />
            </Card>
        )
    }

    return (
        <List
            grid={LIST_GRID_LAYOUT}
            dataSource={feedbackReceived}
            renderItem={feedbackReceived => (
                <List.Item>
                    <FeedbackResponse
                        {...feedbackReceived}
                    />
                </List.Item>
            )}
        />
    )
}

const FeedbackGroup = ({
    name,
    timeCreated,
    feedbackResponseForms,
    feedbackReceived,
    feedbackRequestSummary,
}: Props) => {
    /*
     * Component without docs
     */

    if (feedbackResponseForms) {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Title level={3}>Feedback requests for you</Typography.Title>
                    </Col>
                </Row>
                <List
                    grid={LIST_GRID_LAYOUT}
                    dataSource={feedbackResponseForms}
                    renderItem={feedbackResponseForm => (
                        <List.Item>
                            <FeedbackResponseForm
                                {...feedbackResponseForm}
                            />
                        </List.Item>
                    )}
                />

                {feedbackRequestSummary.mediaUrl && <React.Fragment>
                    <Divider />

                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Title level={3}>Feedback for your submission</Typography.Title>
                            <FeedbackRequestSummary
                                feedbackRequestSummary={feedbackRequestSummary}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col>
                            <ReceivedFeedback feedbackReceived={feedbackReceived} />
                        </Col>
                    </Row>
                </React.Fragment>}
            </div>
        )
    }
    return (
        <Result
            status="error"
            title="You are not authorised to view this group."
        />
    );
}

export default FeedbackGroup;

import React from 'react';

import { Col, Divider, Empty, List, Row, Typography } from 'antd';
import FeedbackGroupPreview from '../FeedbackGroupPreview/FeedbackGroupPreview';
import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';
import FeedbackRequestSummary from '../FeedbackRequestSummary/FeedbackRequestSummary';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type Props = {
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
    unassignedRequest: FeedbackRequestSummaryProps,
};

const AssignedGroups = ({ feedbackGroups }) => {
    if (feedbackGroups && feedbackGroups.length > 0) {
        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 2,
                    xxl: 2,
                }}
                dataSource={feedbackGroups}
                renderItem={feedbackGroup => (
                    <List.Item style={{ width: '100%' }}>
                        <FeedbackGroupPreview
                            {...feedbackGroup}
                        />
                    </List.Item>
                )}
            />
        );
    }
    return (
        <Empty
            style={{ color: '#444444' }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You haven't been assigned any groups yet. Perhaps you should make a request?"
        />
    );
};

const UnassignedRequest = ({ unassignedRequest }) => (
    <React.Fragment>
        <Row gutter={[16, 16]}>
            <Col>
                <Typography.Title level={3}>Your Unassigned Request</Typography.Title>
                <FeedbackRequestSummary
                    feedbackRequestSummary={unassignedRequest}
                    showButtons
                />
            </Col>
        </Row>
        <Divider />
    </React.Fragment>
);

const FeedbackGroups = ({
    feedbackGroups,
    unassignedRequest,
}: Props) => {
    /*
     * Component for displaying user details/groups page showing user info and all groups they are a part of.
     */
    return (
        <div>
            {unassignedRequest && <UnassignedRequest unassignedRequest={unassignedRequest} />}
            <Row gutter={[16, 16]}>
                <Col>
                    <AssignedGroups feedbackGroups={feedbackGroups} />
                </Col>
            </Row>
        </div>
    )
}

export default FeedbackGroups;

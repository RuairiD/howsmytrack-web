import React from "react";

import { Card, Empty, List } from "antd";

import FeedbackResponse from "../FeedbackResponse/FeedbackResponse";

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
                    style={{ margin: "1em" }}
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description="Feedback for your submission will appear here once you have submitted feedback for everyone else in your group."
                />
            </Card>
        );
    }

    if (feedbackReceived.length === 0) {
        return (
            <Card>
                <Empty
                    style={{ margin: "1em" }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Nobody in your group has submitted feedback yet..."
                />
            </Card>
        );
    }

    return (
        <List
            grid={LIST_GRID_LAYOUT}
            dataSource={feedbackReceived}
            renderItem={(feedbackItemReceived) => (
                <List.Item>
                    <FeedbackResponse
                        {...feedbackItemReceived}
                    />
                </List.Item>
            )}
        />
    );
};

export default ReceivedFeedback;

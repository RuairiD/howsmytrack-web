import React from 'react';

import { Empty, List, Typography } from 'antd';
import FeedbackGroupPreview from '../FeedbackGroupPreview/FeedbackGroupPreview';
import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';

type Props = {
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
};

class FeedbackGroups extends React.Component<Props> {
    /*
     * Component for displaying user details/groups page showing user info and all groups they are a part of.
     */
    render() {
        if (this.props.feedbackGroups && this.props.feedbackGroups.length > 0) {
            return (
                <div>
                    <Typography.Title level={2}>Your Feedback Groups</Typography.Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.feedbackGroups}
                        renderItem={feedbackGroup => (
                            <List.Item>
                                <FeedbackGroupPreview
                                    {...feedbackGroup}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            );
        }
        return (
            <div>
                <Typography.Title level={2}>Your Feedback Groups</Typography.Title>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="You haven't been assigned any groups yet."
                />
            </div>
        );
    }
}

export default FeedbackGroups;

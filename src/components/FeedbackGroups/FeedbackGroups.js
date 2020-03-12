import React from 'react';

import { Empty, List, Typography, Divider } from 'antd';
import FeedbackGroupPreview from '../FeedbackGroupPreview/FeedbackGroupPreview';
import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';
import FeedbackRequestSummary from '../FeedbackRequestSummary/FeedbackRequestSummary';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type Props = {
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
    unassignedRequest: FeedbackRequestSummaryProps,
};

class FeedbackGroups extends React.Component<Props> {
    /*
     * Component for displaying user details/groups page showing user info and all groups they are a part of.
     */

    renderFeedbackGroups = () => {
        if (this.props.feedbackGroups && this.props.feedbackGroups.length > 0) {
            return (
                <div>
                    <Typography.Title level={2}>Your Feedback Groups</Typography.Title>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 2,
                            xxl: 3,
                        }}
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
                    style={{ color: '#444444' }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="You haven't been assigned any groups yet. Perhaps you should make a request?"
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.unassignedRequest && <React.Fragment>
                    <Typography.Title level={2}>Your Unassigned Request</Typography.Title>
                    <FeedbackRequestSummary
                        feedbackRequestSummary={this.props.unassignedRequest}
                        showButtons
                    />
                    <Divider />
                </React.Fragment>}
                {this.renderFeedbackGroups()}
            </div>
        )
    }
}

export default FeedbackGroups;

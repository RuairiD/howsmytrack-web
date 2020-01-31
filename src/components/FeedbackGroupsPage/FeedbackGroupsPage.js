import React from 'react';

import { List, Typography } from 'antd';
import FeedbackGroupPreview from '../FeedbackGroupPreview/FeedbackGroupPreview';

type Props = {
    username: string,
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
};

type State = {
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
};

class FeedbackGroupsPage extends React.Component<Props, State> {
    /*
     * Component for displaying user details/groups page showing user info and all groups they are a part of.
     */
    state = {
        feedbackGroups: this.props.feedbackGroups,
    };

    render() {
        return (
            <div>
                <Typography.Title level={2}>{this.props.username}'s Feedback Groups</Typography.Title>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.feedbackGroups}
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
}

export default FeedbackGroupsPage;

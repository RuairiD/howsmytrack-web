import React from 'react';

import { Typography } from 'antd';

import FeedbackResponseForm from '../FeedbackResponseForm/FeedbackResponseForm';
import type { FeedbackResponseFormProps } from '../FeedbackResponseForm/FeedbackResponseForm';

import FeedbackResponse from '../FeedbackResponse/FeedbackResponse';

type Props = {
    feedbackResponseForms: Array<FeedbackResponseFormProps>,
    feedbackReceived: Array<string>,
};

type State = {
    feedbackReceived: Array<string>,
};

class FeedbackGroup extends React.Component<Props, State> {
    /*
     * Component for displayed feedback form for a group member to complete.
     */
    state = {
        feedbackReceived: this.props.feedbackReceived,
    };

    render() {
        return (
            <div>
                <Typography.Title level={2}>Your Feedback Group</Typography.Title>
                <Typography.Title level={3}>Feedback requests for you</Typography.Title>
                {this.props.feedbackResponseForms.map(
                    (feedbackResponseForm, i) => (
                        <FeedbackResponseForm
                            key={i}
                            {...feedbackResponseForm}
                        />
                    )
                )}
                <Typography.Title level={3}>Feedback for your submissions</Typography.Title>
                {this.state.feedbackReceived && this.state.feedbackReceived.map(
                    (feedbackReceived, i) => (
                        <FeedbackResponse
                            key={i}
                            feedbackText={feedbackReceived}
                        />
                    )
                )}
                {!this.state.feedbackReceived &&
                    <Typography.Text>
                        Feedback for your submission will appear here once you have submitted feedback for everyone else in your group.
                    </Typography.Text>
                }
            </div>
        );
    }
}

export default FeedbackGroup;

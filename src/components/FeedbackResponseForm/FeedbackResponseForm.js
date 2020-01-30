import React from 'react';

import { Button, Input, Typography } from 'antd';

import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

export type FeedbackResponseFormProps = {
    initialFeedbackText: string,
    soundcloudUrl: string,
    feedbackPrompt: string,
};

type State = {
    feedbackText: string,
};

class FeedbackResponseForm extends React.Component<Props, State> {
    /*
     * Component for displayed feedback form for a group member to complete.
     */
    state = {
        feedbackText: this.props.initialFeedbackText,
    };

    onFeedbackTextChange = (event) => {
        this.setState({
            feedbackText: event.target.value,
        })
    };

    submitForm = (feedbackText) => {
        return new Promise(function(resolve, reject) {
            // TODO: AJAX request
            resolve();
        })
    };

    onSubmit = () => {this.submitForm(
        this.state.feedbackText
    )};

    render() {
        return (
            <div>
                <SoundcloudEmbed soundcloudUrl={this.props.soundcloudUrl} />
                {
                    this.props.feedbackPrompt &&
                    <Typography.Text>{this.props.feedbackPrompt}</Typography.Text>
                }
                <Input.TextArea
                    value={this.state.feedbackText}
                    onChange={this.onFeedbackTextChange}
                    rows={4}
                />
                <Button
                    type="primary"
                    disabled={!this.state.feedbackText}
                >
                    Submit Feedback
                </Button>
            </div>
        );
    }
}

export default FeedbackResponseForm;

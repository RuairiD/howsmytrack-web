import React from 'react';

import { Rate, Typography } from 'antd';

type Props = {
    feedbackText: string,
    feedbackRating: number,
};

type State = {
    feedbackRating: number,
};

class FeedbackResponse extends React.Component<Props, State> {
    /*
     * Component without docs
     */
    state = {
        feedbackRating: this.props.feedbackRating,
    };

    submitRating = (soundcloudUrl, feedbackPrompt) => {
        return new Promise(function(resolve, reject) {
            // TODO: AJAX request
            resolve();
        })
    };

    onRatingChange = (rating) => {
        if (!this.state.feedbackRating) {
            this.submitRating(rating)
            this.setState({
                feedbackRating: rating,
            })
        }
    };

    render() {
        return (
            <div>
                <Typography.Text>"{this.props.feedbackText}"</Typography.Text>
                <Rate
                    value={this.state.feedbackRating}
                    disabled={!!this.state.feedbackRating}
                    onChange={this.onRatingChange}
                />
            </div>
        );
    }
}

export default FeedbackResponse;

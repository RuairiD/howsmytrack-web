import React from 'react';

import { Card, Col, Rate, Row, Typography } from 'antd';

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
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text>"{this.props.feedbackText}"</Typography.Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>How helpful was this feedback?</Typography.Text>
                        <Rate
                            value={this.state.feedbackRating}
                            disabled={!!this.state.feedbackRating}
                            onChange={this.onRatingChange}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default FeedbackResponse;

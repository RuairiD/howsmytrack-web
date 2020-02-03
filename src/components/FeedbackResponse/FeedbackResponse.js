import React from 'react';

import { Card, Col, Rate, Row, Typography } from 'antd';

export type FeedbackResponseProps = {
    feedbackReponseId: number,
    feedback: string,
    rating: number,
};

type State = {
    rating: number,
};

const RATE_FEEDBACK_RESPONSE_MUTATION = `mutation RateFeedbackResponse($feedbackResponseId: Int!, $rating: Int!) {
    rateFeedbackResponse(feedbackResponseId: $feedbackResponseId, rating: $rating) {
        success
        error
    }
}`;

class FeedbackResponse extends React.Component<Props, State> {
    /*
     * Component for showing user the feedback they have received from another user.
     * Only displayed in a feedback group onc ehte user who received the feedback has
     * left feedback for everyone else in the group.
     */
    state = {
        rating: this.props.rating,
    };

    submitRating = (feedbackResponseId, rating) => {
        fetch('http://localhost:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: RATE_FEEDBACK_RESPONSE_MUTATION,
                variables: {
                    feedbackResponseId: feedbackResponseId,
                    rating: rating,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            // TODO: acknowledge result, show errors etc.
        });
    };

    onRatingChange = (rating) => {
        if (!this.state.rating) {
            this.submitRating(this.props.feedbackResponseId, rating)
            this.setState({
                rating: rating,
            })
        }
    };

    render() {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text>"{this.props.feedback}"</Typography.Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>How helpful was this feedback?</Typography.Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Rate
                            value={this.state.rating}
                            disabled={!!this.state.rating}
                            onChange={this.onRatingChange}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default FeedbackResponse;

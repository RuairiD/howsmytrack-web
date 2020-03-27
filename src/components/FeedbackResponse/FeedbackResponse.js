import React from 'react';

import apiRoot from '../../apiRoot';

import { Button, Card, Col, Rate, Row, Typography } from 'antd';

import ViewRepliesButton from '../ViewRepliesButton/ViewRepliesButton';
import FeedbackResponseRepliesModal from '../FeedbackResponseRepliesModal/FeedbackResponseRepliesModal';

export type FeedbackResponseProps = {
    feedbackReponseId: number,
    feedback: string,
    rating: number,
    allowReplies: boolean,
    allowFurtherReplies: boolean,
    replies: number,
};

type State = {
    requestSent: boolean,
    rating: number,
    submitted: boolean,
    isRepliesModalVisible: boolean,
};

const RATE_FEEDBACK_RESPONSE_MUTATION = `mutation RateFeedbackResponse($feedbackResponseId: Int!, $rating: Int!) {
    rateFeedbackResponse(feedbackResponseId: $feedbackResponseId, rating: $rating) {
        success
        error
    }
}`;

const RATING_TOOLTIP_TEXTS = [
    "This feedback is irrelevant and completely unhelpful.",
    "This feedback is vague, unhelpful, irrelevant or poorly written.",
    "This feedback is useful.",
    "This feedback is relevant, helpful and thoughtful.",
    "This feedback is deeply thoughtful, well-written and very constructive.",
];

class FeedbackResponse extends React.Component<FeedbackResponseProps, State> {
    /*
     * Component for showing user the feedback they have received from another user.
     * Only displayed in a feedback group once the user who received the feedback has
     * left feedback for everyone else in the group.
     */
    state = {
        rating: this.props.rating,
        requestSent: false,
        submitted: !!this.props.rating,
        isRepliesModalVisible: false,
    };

    submitRating = () => {
        this.setState({
            requestSent: true,
        })
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: RATE_FEEDBACK_RESPONSE_MUTATION,
                variables: {
                    feedbackResponseId: this.props.feedbackResponseId,
                    rating: this.state.rating,
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                requestSent: false,
                submitted: data['data']['rateFeedbackResponse'].success,
            });
        });
    };

    onRatingChange = (rating) => {
        this.setState({
            rating: rating,
        });
    };

    showRepliesModal = () => {
        this.setState({
            isRepliesModalVisible: true,
        })
    };

    onRepliesModalCancel = () => {
        this.setState({
            isRepliesModalVisible: false,
        })
    };

    render() {
        return (
            <Card>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Paragraph style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}>
                            "{this.props.feedback}"
                        </Typography.Paragraph>
                    </Col>
                </Row>
                <Card.Meta
                    title="How helpful was this feedback?"
                    description={(
                        <div style={{ display: 'inline' }}>
                            <span style={{ float: 'left', paddingBottom: '0.25em' }}>
                                <Rate
                                    style={{
                                        color: '#000000',
                                        marginRight: '1em',
                                    }}
                                    allowClear
                                    tooltips={RATING_TOOLTIP_TEXTS}
                                    value={this.state.rating}
                                    disabled={this.state.submitted || this.state.requestSent}
                                    onChange={this.onRatingChange}
                                />
                                <Button
                                    type="primary"
                                    loading={this.state.requestSent}
                                    disabled={this.state.submitted || !this.state.rating}
                                    onClick={this.submitRating}
                                >
                                    {this.state.submitted && "Rated"}
                                    {!this.state.submitted && "Rate"}
                                </Button>
                            </span>
                            {(this.props.allowReplies && this.state.submitted) && <span style={{ float: 'right', paddingBottom: '0.25em' }}>
                                <ViewRepliesButton
                                    replies={this.props.replies}
                                    unreadReplies={this.props.unreadReplies}
                                    onClick={this.showRepliesModal}
                                />
                            </span>}
                        </div>
                    )}
                />
                {this.props.allowReplies && <FeedbackResponseRepliesModal
                    feedbackResponseId={this.props.feedbackResponseId}
                    feedback={this.props.feedback}
                    onCancel={this.onRepliesModalCancel}
                    isVisible={this.state.isRepliesModalVisible}
                />}
            </Card>
        );
    }
}

export default FeedbackResponse;

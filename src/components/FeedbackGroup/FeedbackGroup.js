import React from 'react';

import { Col, Divider, Empty, Result, Row, Typography } from 'antd';

import FeedbackResponseForm from '../FeedbackResponseForm/FeedbackResponseForm';
import type { FeedbackResponseFormProps } from '../FeedbackResponseForm/FeedbackResponseForm';

import FeedbackResponse from '../FeedbackResponse/FeedbackResponse';
import type { FeedbackResponseProps } from '../FeedbackResponse/FeedbackResponse';

type Props = {
    feedbackResponseForms: Array<FeedbackResponseFormProps>,
    feedbackReceived: Array<FeedbackResponseProps>,
};

type State = {
    feedbackReceived: Array<FeedbackResponseProps>,
};

class FeedbackGroup extends React.Component<Props, State> {
    /*
     * Component without docs
     */
    state = {
        feedbackReceived: this.props.feedbackReceived,
    };

    renderReceivedFeedback = () => {
        if (this.state.feedbackReceived === null || this.state.feedbackReceived === undefined) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description="Feedback for your submission will appear here once you have submitted feedback for everyone else in your group."
                />
            )
        }

        if (this.state.feedbackReceived.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Nobody in your group has submitted feedback yet..."
                />
            )
        }

        return (
            <div>
                {this.state.feedbackReceived.map(
                    (feedbackReceived, i) => (
                        <Col span={8} key={i}>
                            <FeedbackResponse
                                {...feedbackReceived}
                            />
                        </Col>
                    )
                )}
            </div>
        )
    }

    render() {
        if (this.props.feedbackResponseForms) {
            return (
                <div>
                    <Typography.Title level={2}>Your Feedback Group</Typography.Title>

                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Title level={3}>Feedback requests for you</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        {this.props.feedbackResponseForms.map(
                            (feedbackResponseForm, i) => (
                                <Col span={8} key={i}>
                                    <FeedbackResponseForm
                                        {...feedbackResponseForm}
                                    />
                                </Col>
                            )
                        )}
                    </Row>

                    <Divider />

                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Title level={3}>Feedback for your submission</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        {this.renderReceivedFeedback()}
                    </Row>
                </div>
            )
        }
        return (
            <Result
                status="error"
                title="You are not authorised to view this group."
            />
        );
    }
}

export default FeedbackGroup;

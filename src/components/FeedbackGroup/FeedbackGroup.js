import React from 'react';
import dateFormat from 'dateformat';

import { Col, Divider, Empty, Result, Row, Typography } from 'antd';

import FeedbackResponseForm from '../FeedbackResponseForm/FeedbackResponseForm';
import type { FeedbackResponseFormProps } from '../FeedbackResponseForm/FeedbackResponseForm';

import FeedbackResponse from '../FeedbackResponse/FeedbackResponse';
import type { FeedbackResponseProps } from '../FeedbackResponse/FeedbackResponse';

type Props = {
    name: string,
    timeCreated: string,
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

    getTimeCreated = () => {
        if (!this.props.timeCreated) {
            return null;
        }
        return dateFormat(
            new Date(Date.parse(this.props.timeCreated)),
            'mmmm dS yyyy',
        );
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
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Typography.Title style={{ marginBottom: 0 }} level={2}>{this.props.name}</Typography.Title>
                            <Typography.Title type="secondary" style={{ marginTop: 0 }} level={4}>{this.getTimeCreated()}</Typography.Title>
                        </Col>
                    </Row>

                    <Divider />

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

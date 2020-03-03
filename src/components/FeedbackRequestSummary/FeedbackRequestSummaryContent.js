import React from 'react';

import { Row, Alert, Col, Typography } from 'antd';
import MediaEmbed from '../MediaEmbed/MediaEmbed';
import GENRE_OPTIONS from '../../genres';
import type { FeedbackRequestSummaryProps } from './FeedbackRequestSummary';

type Props = {
    feedbackRequestSummary: FeedbackRequestSummaryProps,
};

class FeedbackRequestSummaryContent extends React.Component<Props> {
    /*
     * Component for inline feedback request preview shown on FeedbackGroupsPage and in FeedbackRequestForm
     */

    renderMedia = () => {
        if (!this.props.feedbackRequestSummary.mediaUrl) {
            return (
                <Alert
                    message="No track has been provided for this request. You'll be able to join a group and provide feedback for others, but you won't receive any feedback for yourself."
                    type="info"
                    showIcon
                />
            )
        }
        if (!this.props.feedbackRequestSummary.mediaType) {
            return (
                <Alert
                    message="Unable to play media. Invalid URL."
                    type="error"
                    showIcon
                />
            )
        }
        return <MediaEmbed mediaUrl={this.props.feedbackRequestSummary.mediaUrl} mediaType={this.props.feedbackRequestSummary.mediaType} />
    };
    
    render() {
        
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col>
                        {this.renderMedia()}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Text strong>Genre: </Typography.Text>
                        <Typography.Text>{GENRE_OPTIONS[this.props.feedbackRequestSummary.genre]}</Typography.Text>
                    </Col>
                </Row>
                {this.props.feedbackRequestSummary.mediaUrl && <Row>
                    {this.props.feedbackRequestSummary.feedbackPrompt && <Col>
                        <Typography.Text strong>You said: </Typography.Text>
                        <Typography.Text>"{this.props.feedbackRequestSummary.feedbackPrompt}"</Typography.Text>
                    </Col>}
                    {!this.props.feedbackRequestSummary.feedbackPrompt && <Col>
                        <Typography.Text strong>You did not provide any additional information for feedback.</Typography.Text>
                    </Col>}
                </Row>}
            </div>
        );
    }
}

export default FeedbackRequestSummaryContent;

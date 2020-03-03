import React from 'react';

import apiRoot from '../../apiRoot';

import { Form } from 'antd';
import FeedbackRequestForm from '../FeedbackRequestForm/FeedbackRequestForm';

type Props = {
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
};

const EDIT_FEEDBACK_REQUEST_MUTATION = `mutation EditFeedbackRequest($feedbackRequestId: Int!, $mediaUrl: String, $emailWhenGrouped: Boolean, $genre: String, $feedbackPrompt: String) {
    editFeedbackRequest(feedbackRequestId: $feedbackRequestId, mediaUrl: $mediaUrl, emailWhenGrouped: $emailWhenGrouped, genre: $genre, feedbackPrompt: $feedbackPrompt) {
        success
        error
        invalidMediaUrl
    }
}`;

class UnwrappedEditFeedbackRequestForm extends React.Component<Props, State> {
    /*
     * Component for displaying edit feedback request form.
     */
    makeEditFeedbackRequest = (params) => {
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: EDIT_FEEDBACK_REQUEST_MUTATION,
                variables: params,
            }),
            credentials: 'include',
        });
    };

    render() {
        // Request is trackless in the absence of a media_url
        return (
            <FeedbackRequestForm
                {...this.props}
                trackless={!this.props.mediaUrl}
                makeRequest={this.makeEditFeedbackRequest}
                responseName="editFeedbackRequest"
                submittedText={{
                    title: "Your feedback request has been updated!",
                }}
                gaCategory="editFeedbackRequest"
            />
        );
    }
}

export default Form.create({ name: 'editFeedbackRequest' })(UnwrappedEditFeedbackRequestForm);

import React from 'react';

import apiRoot from '../../apiRoot';

import { Form } from 'antd';
import FeedbackRequestForm from '../FeedbackRequestForm/FeedbackRequestForm';

const CREATE_FEEDBACK_REQUEST_MUTATION = `mutation CreateFeedbackRequest($mediaUrl: String, $emailWhenGrouped: Boolean, $genre: String, $feedbackPrompt: String) {
    createFeedbackRequest(mediaUrl: $mediaUrl, emailWhenGrouped: $emailWhenGrouped, genre: $genre, feedbackPrompt: $feedbackPrompt) {
        success
        error
        invalidMediaUrl
    }
}`;

class UnwrappedCreateFeedbackRequestForm extends React.Component<State> {
    /*
     * Component for displaying new feedback request form.
     */
    makeCreateFeedbackRequest = (params) => {
        return fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: CREATE_FEEDBACK_REQUEST_MUTATION,
                variables: params,
            }),
            credentials: 'include',
        });
    };

    render() {
        return (
            <FeedbackRequestForm
                {...this.props}
                makeRequest={this.makeCreateFeedbackRequest}
                responseName="createFeedbackRequest"
                submittedText={{
                    title: "Your feedback request has been submitted!",
                    subTitle: "You will receive an email within the next 24 hours with your group assignment. If you wish to edit your request, you may do so on 'Your Groups' until the request has been assigned to a feedback group."
                }}
                gaCategory="createFeedbackRequest"
            />
        );
    }
}

export default Form.create({ name: 'feedbackRequest' })(UnwrappedCreateFeedbackRequestForm);;

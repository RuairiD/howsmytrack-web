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

const makeEditFeedbackRequest = (params) => {
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

/*
 * Component for displaying edit feedback request form.
 * Request is considered trackless in the absence of a media_url
 */
const UnwrappedEditFeedbackRequestForm = (props: Props) => (
    <FeedbackRequestForm
        {...props}
        trackless={!props.mediaUrl}
        makeRequest={makeEditFeedbackRequest}
        responseName="editFeedbackRequest"
        submittedText={{
            title: "Your feedback request has been updated!",
        }}
        gaCategory="editFeedbackRequest"
    />
);

export default Form.create({ name: 'editFeedbackRequest' })(UnwrappedEditFeedbackRequestForm);

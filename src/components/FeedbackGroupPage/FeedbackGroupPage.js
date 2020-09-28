import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroup from '../FeedbackGroup/FeedbackGroup';

type Props = {
    feedbackGroupId: number,
    isMobile: boolean,
};

const FEEDBACK_GROUP_QUERY = `query FeedbackGroup($feedbackGroupId: Int!) {
  feedbackGroup(feedbackGroupId: $feedbackGroupId) {
    id
    name
    timeCreated
    feedbackRequest {
      mediaUrl
      mediaType
      feedbackPrompt
      genre
    }
    feedbackResponses {
      id
      feedback
      submitted
      feedbackRequest {
        feedbackPrompt
        mediaUrl
        mediaType
      }
      allowReplies
      replies
      unreadReplies
    }
    userFeedbackResponses {
      id
      feedback
      rating
      allowReplies
      replies
      unreadReplies
    }
  }
}`;

const formatQueryResponse = (data) => {
    const feedbackGroupProps = {
        'feedbackResponseForms': [],
    }

    for (const feedbackResponse of data['feedbackResponses']) {
        feedbackGroupProps['feedbackResponseForms'].push({
            'feedbackResponseId': feedbackResponse['id'],
            'feedback': feedbackResponse['feedback'],
            'mediaUrl': feedbackResponse['feedbackRequest']['mediaUrl'],
            'mediaType': feedbackResponse['feedbackRequest']['mediaType'],
            'feedbackPrompt': feedbackResponse['feedbackRequest']['feedbackPrompt'],
            'submitted': feedbackResponse['submitted'],
            'allowReplies': feedbackResponse['allowReplies'],
            'replies': feedbackResponse['replies'],
            'unreadReplies': feedbackResponse['unreadReplies'],
        });
    }

    if (data['userFeedbackResponses']) {
        feedbackGroupProps['feedbackReceived'] = []
        for (var userFeedbackResponse of data['userFeedbackResponses']) {
            feedbackGroupProps['feedbackReceived'].push({
                'feedbackResponseId': userFeedbackResponse['id'],
                'feedback': userFeedbackResponse['feedback'],
                'rating': userFeedbackResponse['rating'],
                'allowReplies': userFeedbackResponse['allowReplies'],
                'replies': userFeedbackResponse['replies'],
                'unreadReplies': userFeedbackResponse['unreadReplies'],
            })
        }
    }

    feedbackGroupProps['feedbackRequestSummary'] = data['feedbackRequest'];

    return feedbackGroupProps
};

const formatTimeCreated = (timeCreated) => {
    if (!timeCreated) {
        return null;
    }
    return dateFormat(
        new Date(Date.parse(timeCreated)),
        'mmmm dS yyyy',
    );
};

const FeedbackGroupPage = ({ feedbackGroupId, isMobile }: Props) => {
    const [hasProps, setHasProps] = useState(false);
    const [name, setName] = useState(null);
    const [timeCreated, setTimeCreated] = useState(null);
    const [feedbackResponseForms, setFeedbackResponseForms] = useState(null);
    const [feedbackReceived, setFeedbackReceived] = useState(null);
    const [feedbackRequestSummary, setFeedbackRequestSummary] = useState(null);

    useEffect(() => {
        document.title = "how's my track?";
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: FEEDBACK_GROUP_QUERY,
                variables: { feedbackGroupId: feedbackGroupId },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['feedbackGroup']) {
                // Could not get group, either because user isn't member of the group
                // or because group doesn't exist.
                setHasProps(true);
                return
            }
            const feedbackGroup = formatQueryResponse(
                data['data']['feedbackGroup'],
            );
            setName(data['data']['feedbackGroup']['name']);
            setTimeCreated(data['data']['feedbackGroup']['timeCreated']);
            setFeedbackResponseForms(feedbackGroup['feedbackResponseForms']);
            setFeedbackReceived(feedbackGroup['feedbackReceived']);
            setFeedbackRequestSummary(feedbackGroup['feedbackRequestSummary']);
            setHasProps(true);

            document.title = "how's my track? - " + data['data']['feedbackGroup']['name'];
        });
    }, [feedbackGroupId]);

    if (hasProps) {
        return (
            <GenericPage title={name} subTitle={formatTimeCreated(timeCreated)} isMobile={isMobile}>
                <FeedbackGroup
                    name={name}
                    timeCreated={timeCreated}
                    feedbackResponseForms={feedbackResponseForms}
                    feedbackReceived={feedbackReceived}
                    feedbackRequestSummary={feedbackRequestSummary}
                />
            </GenericPage>
        )
    }
    return null;
}

export default FeedbackGroupPage;

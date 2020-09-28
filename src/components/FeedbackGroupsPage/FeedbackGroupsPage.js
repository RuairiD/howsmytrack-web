import React, { useState, useEffect } from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroups from '../FeedbackGroups/FeedbackGroups';

type Props = {
    isMobile: boolean,
};

const FEEDBACK_GROUPS_QUERY = `query FeedbackGroups {
  feedbackGroups {
    id
    name
    timeCreated
    members
    tracklessMembers
    feedbackRequest {
      mediaUrl
      mediaType
    }
    feedbackResponses {
      submitted
      unreadReplies
    }
    userFeedbackResponses {
      submitted
      unreadReplies
    }
    userFeedbackResponseCount
  }
}`;

const UNASSIGNED_REQUEST_QUERY = `query UnassignedRequest {
  unassignedRequest {
    id
    mediaUrl
    mediaType
    feedbackPrompt
    emailWhenGrouped
    genre
  }
}`;

const formatFeedbackGroupsQueryResponse = (data) => {
    const feedbackGroups = []

    for (const feedbackGroup of data) {
        let userFeedbackCount = 0;
        if (feedbackGroup['feedbackResponses']) {
            for (let feedbackResponse of feedbackGroup['feedbackResponses']) {
                if (feedbackResponse['submitted']) {
                    userFeedbackCount++;
                }
            }
        }

        let unreadReplies = 0;
        if (feedbackGroup['feedbackResponses']) {
            for (let feedbackResponse of feedbackGroup['feedbackResponses']) {
                unreadReplies += feedbackResponse['unreadReplies'];
            }
        }
        if (feedbackGroup['userFeedbackResponses']) {
            for (let feedbackResponse of feedbackGroup['userFeedbackResponses']) {
                unreadReplies += feedbackResponse['unreadReplies'];
            }
        }

        feedbackGroups.push({
            'feedbackGroupId': feedbackGroup['id'],
            'name': feedbackGroup['name'],
            'timeCreated': feedbackGroup['timeCreated'],
            'feedbackRequestSummary': feedbackGroup['feedbackRequest'],
            'userCount': feedbackGroup['members'],
            'tracklessUserCount': feedbackGroup['tracklessMembers'],
            'userFeedbackCount': userFeedbackCount,
            'feedbackResponseCount': feedbackGroup['userFeedbackResponseCount'],
            'unreadReplies': unreadReplies,
        });
    }

    return feedbackGroups
};

const formatUnassignedQueryResponse = (data) => {
    return {
        feedbackRequestId: data['id'],
        mediaUrl: data['mediaUrl'],
        mediaType: data['mediaType'],
        feedbackPrompt: data['feedbackPrompt'],
        emailWhenGrouped: data['emailWhenGrouped'],
        genre: data['genre'],
    }
};

const FeedbackGroupsPage = ({ isMobile }: Props) => {
    const [hasFeedbackGroupsProps, setHasFeedbackGroupsProps] = useState(false);
    const [hasUnassignedRequestProps, setHasUnassignedRequestProps] = useState(false);
    const [feedbackGroups, setFeedbackGroups] = useState(null);
    const [unassignedRequest, setUnassignedRequest] = useState(null);

    useEffect(() => {
        document.title = "how's my track? - Your Groups";

        // Fetch user's assigned feedback groups
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: FEEDBACK_GROUPS_QUERY,
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['feedbackGroups']) {
                // Could not get groups because user is not logged in.
                setHasFeedbackGroupsProps(true)
                return
            }
            const feedbackGroups = formatFeedbackGroupsQueryResponse(
                data['data']['feedbackGroups'],
            )
            setHasFeedbackGroupsProps(true);
            setFeedbackGroups(feedbackGroups);
        });

        // Fetch unassigned request, if any.
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: UNASSIGNED_REQUEST_QUERY,
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['unassignedRequest']) {
                // Could not get groups because user is not logged in
                // or because user doesn't have any unassigned requests.
                setHasUnassignedRequestProps(true);
                return
            }
            const unassignedRequest = formatUnassignedQueryResponse(
                data['data']['unassignedRequest'],
            )
            setHasUnassignedRequestProps(true);
            setUnassignedRequest(unassignedRequest);
        });
    }, []);

    if (hasFeedbackGroupsProps && hasUnassignedRequestProps) {
        return (
            <GenericPage title="Your Groups" isMobile={isMobile}>
                <FeedbackGroups
                    feedbackGroups={feedbackGroups}
                    unassignedRequest={unassignedRequest}
                />
            </GenericPage>
        );
    }

    return null;
}

export default FeedbackGroupsPage;

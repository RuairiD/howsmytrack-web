import React from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroups from '../FeedbackGroups/FeedbackGroups';

import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type State = {
    hasFeedbackGroupsProps: boolean,
    hasUnassignedRequestProps: boolean,
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
    unassignedRequest: FeedbackRequestSummaryProps,
};

const FEEDBACK_GROUPS_QUERY = `query FeedbackGroups {
  feedbackGroups {
    id
    name
    members
    mediaUrl
    mediaType
    feedbackResponses {
      submitted
    }
    userFeedbackResponses {
      submitted
    }
  }
}`;

const UNASSIGNED_REQUEST_QUERY = `query UnassignedRequest {
  unassignedRequest {
    id
    mediaUrl
    mediaType
    feedbackPrompt
  }
}`;

class FeedbackGroupsPage extends React.Component<State> {

    state = {
        hasFeedbackGroupsProps: false,
        hasUnassignedRequestProps: false,
    };

    formatFeedbackGroupsQueryResponse = (data) => {
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

            let feedbackResponseCount = 0;
            if (feedbackGroup['userFeedbackResponses']) {
                for (let feedbackResponse of feedbackGroup['userFeedbackResponses']) {
                    if (feedbackResponse['submitted']) {
                        feedbackResponseCount++;
                    }
                }
            }
            feedbackGroups.push({
                'feedbackGroupId': feedbackGroup['id'],
                'mediaUrl': feedbackGroup['mediaUrl'],
                'mediaType': feedbackGroup['mediaType'],
                'userCount': feedbackGroup['members'],
                'userFeedbackCount': userFeedbackCount,
                'feedbackResponseCount': feedbackResponseCount,
            });
        }

        return feedbackGroups
    };

    formatUnassignedQueryResponse = (data) => {
        return {
            feedbackRequestId: data['id'],
            mediaUrl: data['mediaUrl'],
            mediaType: data['mediaType'],
            feedbackPrompt: data['feedbackPrompt'],
        }
    };

    componentDidMount() {
        document.title = "how's my track? - Your Groups";
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
                this.setState({
                    hasFeedbackGroupsProps: true,
                })
                return
            }
            const feedbackGroups = this.formatFeedbackGroupsQueryResponse(
                data['data']['feedbackGroups'],
            )
            this.setState({
                hasFeedbackGroupsProps: true,
                feedbackGroups: feedbackGroups,
            });
        });

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
                this.setState({
                    hasUnassignedRequestProps: true,
                })
                return
            }
            const unassignedRequest = this.formatUnassignedQueryResponse(
                data['data']['unassignedRequest'],
            )
            this.setState({
                hasUnassignedRequestProps: true,
                unassignedRequest: unassignedRequest,
            });
        });
    }

    render() {
        if (this.state.hasFeedbackGroupsProps && this.state.hasUnassignedRequestProps) {
            return (
                <GenericPage>
                    <FeedbackGroups
                        feedbackGroups={this.state.feedbackGroups}
                        unassignedRequest={this.state.unassignedRequest}
                    />
                </GenericPage>
            );
        }
        return null;
    }
}

export default FeedbackGroupsPage;

import React from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroups from '../FeedbackGroups/FeedbackGroups';

import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type Props = {
    isMobile: boolean,
};

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

class FeedbackGroupsPage extends React.Component<Props, State> {
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

    formatUnassignedQueryResponse = (data) => {
        return {
            feedbackRequestId: data['id'],
            mediaUrl: data['mediaUrl'],
            mediaType: data['mediaType'],
            feedbackPrompt: data['feedbackPrompt'],
            emailWhenGrouped: data['emailWhenGrouped'],
            genre: data['genre'],
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
                <GenericPage isMobile={this.props.isMobile}>
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

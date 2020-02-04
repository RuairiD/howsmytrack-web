import React from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroups from '../FeedbackGroups/FeedbackGroups';

import type { FeedbackGroupPreviewProps } from '../FeedbackGroupPreview/FeedbackGroupPreview';

type State = {
    hasProps: boolean,
    feedbackGroups: Array<FeedbackGroupPreviewProps>,
};

const FEEDBACK_GROUPS_QUERY = `query FeedbackGroups {
  feedbackGroups {
    id
    name
    members
    soundcloudUrl
    feedbackResponses {
      submitted
    }
    userFeedbackResponses {
      submitted
    }
  }
}`;

class FeedbackGroupsPage extends React.Component<State> {

    state = {
        hasProps: false,
    };

    formatQueryResponse = (data) => {
        const feedbackGroups = []

        for (const feedbackGroup of data) {
            let userFeedbackCount = 0;
            if (feedbackGroup['feedbackResponses']) {
                for (var feedbackResponse of feedbackGroup['feedbackResponses']) {
                    if (feedbackResponse['submitted']) {
                        userFeedbackCount++;
                    }
                }
            }

            let feedbackResponseCount = 0;
            if (feedbackGroup['userFeedbackResponses']) {
                for (var feedbackResponse of feedbackGroup['userFeedbackResponses']) {
                    if (feedbackResponse['submitted']) {
                        feedbackResponseCount++;
                    }
                }
            }
            feedbackGroups.push({
                'feedbackGroupId': feedbackGroup['id'],
                'soundcloudUrl': feedbackGroup['soundcloudUrl'],
                'userCount': feedbackGroup['members'],
                'userFeedbackCount': userFeedbackCount,
                'feedbackResponseCount': feedbackResponseCount,
            });
        }

        return feedbackGroups
    };

    componentDidMount() {
        document.title = 'FeedbackGroups - Your Groups';
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
                    hasProps: true,
                })
                return
            }
            const feedbackGroups = this.formatQueryResponse(
                data['data']['feedbackGroups'],
            )
            this.setState({
                hasProps: true,
                feedbackGroups: feedbackGroups,
            });
        });
    }

    render() {
        return this.state.hasProps && (
            <div>
                <GenericPage>
                    <FeedbackGroups
                        feedbackGroups={this.state.feedbackGroups}
                    />
                </GenericPage>
            </div>
        )
    }
}

export default FeedbackGroupsPage;

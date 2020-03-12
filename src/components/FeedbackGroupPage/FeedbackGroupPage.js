import React from 'react';

import apiRoot from '../../apiRoot';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroup from '../FeedbackGroup/FeedbackGroup';

import type { FeedbackResponseFormProps } from '../FeedbackResponseForm/FeedbackResponseForm';
import type { FeedbackRequestSummaryProps } from '../FeedbackRequestSummary/FeedbackRequestSummary';

type Props = {
    feedbackGroupId: number,
    isMobile: boolean,
};

type State = {
    hasProps: boolean,
    name: string,
    timeCreated: string,
    feedbackResponseForms: Array<FeedbackResponseFormProps>,
    feedbackReceived: Array<string>,
    feedbackRequestSummary: FeedbackRequestSummaryProps,
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
      allowFurtherReplies
      replies {
        id
        username
        text
        timeCreated
      }
      unreadReplies
    }
    userFeedbackResponses {
      id
      feedback
      rating
      allowReplies
      allowFurtherReplies
      replies {
        id
        username
        text
        timeCreated
      }
      unreadReplies
    }
  }
}`;

class FeedbackGroupPage extends React.Component<Props, State> {
    state = {
        hasProps: false,
    };

    formatQueryResponse = (data) => {
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
                'allowFurtherReplies': feedbackResponse['allowFurtherReplies'],
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
                    'allowFurtherReplies': userFeedbackResponse['allowFurtherReplies'],
                    'replies': userFeedbackResponse['replies'],
                    'unreadReplies': userFeedbackResponse['unreadReplies'],
                })
            }
        }

        feedbackGroupProps['feedbackRequestSummary'] = data['feedbackRequest'];

        return feedbackGroupProps
    };

    componentDidMount() {
        document.title = "how's my track?";
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: FEEDBACK_GROUP_QUERY,
                variables: { feedbackGroupId: this.props.feedbackGroupId },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            if (!data['data']['feedbackGroup']) {
                // Could not get group, either because user isn't member of the group
                // or because group doesn't exist.
                this.setState({
                    hasProps: true,
                })
                return
            }
            const feedbackGroup = this.formatQueryResponse(
                data['data']['feedbackGroup'],
            )
            this.setState({
                hasProps: true,
                name: data['data']['feedbackGroup']['name'],
                timeCreated: data['data']['feedbackGroup']['timeCreated'],
                feedbackResponseForms: feedbackGroup['feedbackResponseForms'],
                feedbackReceived: feedbackGroup['feedbackReceived'],
                feedbackRequestSummary: feedbackGroup['feedbackRequestSummary'],
            });
            document.title = "how's my track? - " + data['data']['feedbackGroup']['name'];
        });
    }

    render() {
        return this.state.hasProps && (
            <GenericPage isMobile={this.props.isMobile}>
                <FeedbackGroup
                    name={this.state.name}
                    timeCreated={this.state.timeCreated}
                    feedbackResponseForms={this.state.feedbackResponseForms}
                    feedbackReceived={this.state.feedbackReceived}
                    feedbackRequestSummary={this.state.feedbackRequestSummary}
                />
            </GenericPage>
        )
    }
}

export default FeedbackGroupPage;

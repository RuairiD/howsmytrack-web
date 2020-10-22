import dateFormat from "dateformat";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import apiRoot from "../../apiRoot";

import GenericPage from "../GenericPage/GenericPage";
import FeedbackGroup from "../../components/FeedbackGroup/FeedbackGroup";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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
        feedbackResponseForms: [],
    };

    for (const feedbackResponse of data.feedbackResponses) {
        feedbackGroupProps.feedbackResponseForms.push({
            feedbackResponseId: feedbackResponse.id,
            currentFeedback: feedbackResponse.feedback,
            mediaUrl: feedbackResponse.feedbackRequest.mediaUrl,
            mediaType: feedbackResponse.feedbackRequest.mediaType,
            feedbackPrompt: feedbackResponse.feedbackRequest.feedbackPrompt,
            alreadySubmitted: feedbackResponse.submitted,
            currentAllowReplies: feedbackResponse.allowReplies,
            replies: feedbackResponse.replies,
            unreadReplies: feedbackResponse.unreadReplies,
        });
    }

    feedbackGroupProps.feedbackReceived = null;
    if (data.userFeedbackResponses) {
        feedbackGroupProps.feedbackReceived = [];
        for (const userFeedbackResponse of data.userFeedbackResponses) {
            feedbackGroupProps.feedbackReceived.push({
                feedbackResponseId: userFeedbackResponse.id,
                feedback: userFeedbackResponse.feedback,
                currentRating: userFeedbackResponse.rating,
                allowReplies: userFeedbackResponse.allowReplies,
                replies: userFeedbackResponse.replies,
                unreadReplies: userFeedbackResponse.unreadReplies,
            });
        }
    }

    feedbackGroupProps.feedbackRequestSummary = data.feedbackRequest;

    return feedbackGroupProps;
};

const formatTimeCreated = (timeCreated) => dateFormat(
    new Date(Date.parse(timeCreated)),
    "mmmm dS yyyy",
);

const FeedbackGroupPage = ({ feedbackGroupId, isMobile }: Props) => {
    const { isLoading, data } = useQuery([FEEDBACK_GROUP_QUERY, { feedbackGroupId }], () => axios.post(`${apiRoot}/graphql/`, {
        query: FEEDBACK_GROUP_QUERY,
        variables: { feedbackGroupId },
    }).then((response) => response.data.data.feedbackGroup));

    useEffect(() => {
        if (data) {
            document.title = `how's my track? - ${data.name}`;
        } else {
            document.title = "how's my track?";
        }
    });

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    const feedbackGroup = formatQueryResponse(data);
    return (
        <GenericPage title={data.name} subTitle={formatTimeCreated(data.timeCreated)} isMobile={isMobile}>
            <FeedbackGroup
                feedbackResponseForms={feedbackGroup.feedbackResponseForms}
                feedbackReceived={feedbackGroup.feedbackReceived}
                feedbackRequestSummary={feedbackGroup.feedbackRequestSummary}
            />
        </GenericPage>
    );
};

export default FeedbackGroupPage;

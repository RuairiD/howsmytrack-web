import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import apiRoot from "../../apiRoot";

import GenericPage from "../GenericPage/GenericPage";
import FeedbackGroups from "../FeedbackGroups/FeedbackGroups";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
    const feedbackGroups = [];

    for (const feedbackGroup of data) {
        let userFeedbackCount = 0;
        if (feedbackGroup.feedbackResponses) {
            for (const feedbackResponse of feedbackGroup.feedbackResponses) {
                if (feedbackResponse.submitted) {
                    userFeedbackCount++;
                }
            }
        }

        let unreadReplies = 0;
        if (feedbackGroup.feedbackResponses) {
            for (const feedbackResponse of feedbackGroup.feedbackResponses) {
                unreadReplies += feedbackResponse.unreadReplies;
            }
        }
        if (feedbackGroup.userFeedbackResponses) {
            for (const feedbackResponse of feedbackGroup.userFeedbackResponses) {
                unreadReplies += feedbackResponse.unreadReplies;
            }
        }

        feedbackGroups.push({
            feedbackGroupId: feedbackGroup.id,
            name: feedbackGroup.name,
            timeCreated: feedbackGroup.timeCreated,
            feedbackRequestSummary: feedbackGroup.feedbackRequest,
            userCount: feedbackGroup.members,
            tracklessUserCount: feedbackGroup.tracklessMembers,
            userFeedbackCount,
            feedbackResponseCount: feedbackGroup.userFeedbackResponseCount,
            unreadReplies,
        });
    }

    return feedbackGroups;
};

const formatUnassignedQueryResponse = (data) => ({
    feedbackRequestId: data.id,
    mediaUrl: data.mediaUrl,
    mediaType: data.mediaType,
    feedbackPrompt: data.feedbackPrompt,
    emailWhenGrouped: data.emailWhenGrouped,
    genre: data.genre,
});

const FeedbackGroupsPage = ({ isMobile }: Props) => {
    useEffect(() => {
        document.title = "how's my track? - Your Groups";
    }, []);

    const { isLoading: isLoadingFeedbackGroups, data: feedbackGroupsData } = (
        // Fetch user's assigned feedback groups
        useQuery(
            [FEEDBACK_GROUPS_QUERY],
            () => (
                axios.post(`${apiRoot}/graphql/`, {
                    query: FEEDBACK_GROUPS_QUERY,
                }).then((response) => response.data.data.feedbackGroups)
            ),
        )
    );

    const { isLoading: isLoadingUnassignedRequest, data: unassignedRequestData } = (
        // Fetch unassigned request, if any.
        useQuery(
            [UNASSIGNED_REQUEST_QUERY],
            () => (
                axios.post(`${apiRoot}/graphql/`, {
                    query: UNASSIGNED_REQUEST_QUERY,
                }).then((response) => response.data.data.unassignedRequest)
            ),
        )
    );

    console.log(feedbackGroupsData, unassignedRequestData);

    if (isLoadingFeedbackGroups || isLoadingUnassignedRequest) {
        return (
            <LoadingSpinner />
        );
    }

    let feedbackGroups = [];
    if (feedbackGroupsData) {
        feedbackGroups = formatFeedbackGroupsQueryResponse(
            feedbackGroupsData,
        );
    }

    let unassignedRequest = null;
    if (unassignedRequestData) {
        unassignedRequest = formatUnassignedQueryResponse(
            unassignedRequestData,
        );
    }

    return (
        <GenericPage title="Your Groups" isMobile={isMobile}>
            <FeedbackGroups
                feedbackGroups={feedbackGroups}
                unassignedRequest={unassignedRequest}
            />
        </GenericPage>
    );
};

export default FeedbackGroupsPage;

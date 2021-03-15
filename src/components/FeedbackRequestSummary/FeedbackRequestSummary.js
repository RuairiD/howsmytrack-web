import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { Alert, Card, Result, Spin } from "antd";
import apiRoot from "../../apiRoot";

import EditFeedbackRequestModal from "../EditFeedbackRequestModal/EditFeedbackRequestModal";
import FeedbackRequestSummaryContent from "./FeedbackRequestSummaryContent";
import RequestButtons from "./RequestButtons";

export type FeedbackRequestSummaryProps = {
    feedbackRequestId: number,
    mediaUrl: string,
    mediaType: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    genre: string,
};

type Props = {
    feedbackRequestSummary: FeedbackRequestSummaryProps,
    showButtons: boolean,
};

const DELETE_FEEDBACK_REQUEST_MUTATION = `mutation DeleteFeedbackRequest($feedbackRequestId: Int!) {
    deleteFeedbackRequest(feedbackRequestId: $feedbackRequestId) {
        success
        error
    }
}`;

const deleteRequest = ({ feedbackRequestId }) => (
    axios.post(`${apiRoot}/graphql/`, {
        query: DELETE_FEEDBACK_REQUEST_MUTATION,
        variables: {
            feedbackRequestId,
        },
    }).then((response) => response.data.data.deleteFeedbackRequest)
);

const FeedbackRequestSummary = ({
    feedbackRequestSummary,
    showButtons,
}: Props) => {
    /*
     * Component for inline feedback request preview shown on FeedbackGroupsPage
     * which also allows users to edit their requests.
     */
    const [isEditFeedbackRequestModalVisible, setIsEditFeedbackRequestModalVisible] = useState(false);

    const showEditFeedbackRequestModal = () => {
        setIsEditFeedbackRequestModalVisible(true);
    };

    const hideEditFeedbackRequestModal = () => {
        setIsEditFeedbackRequestModalVisible(false);
    };

    const [deleteRequestMutate, { isLoading, data }] = useMutation(deleteRequest);

    if (data && data.success) {
        return (
            <Result
                status="success"
                title="This request has been deleted."
            />
        );
    }
    return (
        <Spin spinning={isLoading}>
            <Card
                title="You submitted:"
                extra={showButtons && (
                    <RequestButtons
                        mediaUrl={feedbackRequestSummary.mediaUrl}
                        onEditClick={showEditFeedbackRequestModal}
                        onDelete={() => deleteRequestMutate({
                            feedbackRequestId: feedbackRequestSummary.feedbackRequestId,
                        })}
                    />
                )}
            >
                {data && !data.success && <Alert message={data.error} type="error" showIcon />}
                <FeedbackRequestSummaryContent
                    feedbackRequestSummary={feedbackRequestSummary}
                />
            </Card>
            <EditFeedbackRequestModal
                onCancel={hideEditFeedbackRequestModal}
                isVisible={isEditFeedbackRequestModalVisible}
                feedbackRequestId={feedbackRequestSummary.feedbackRequestId}
                mediaUrl={feedbackRequestSummary.mediaUrl}
                feedbackPrompt={feedbackRequestSummary.feedbackPrompt}
                emailWhenGrouped={feedbackRequestSummary.emailWhenGrouped}
                genre={feedbackRequestSummary.genre}
            />
        </Spin>
    );
};

export default FeedbackRequestSummary;

import React, { useState } from "react";
import { useMutation } from "react-query";

import { Button, Card, message, Popconfirm, Result, Spin } from "antd";
import apiRoot from "../../apiRoot";

import EditFeedbackRequestModal from "../EditFeedbackRequestModal/EditFeedbackRequestModal";
import FeedbackRequestSummaryContent from "./FeedbackRequestSummaryContent";

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

const getDeleteConfirmationText = (mediaUrl) => {
    if (mediaUrl) {
        return "This request has not been assigned to a group. If you delete it, you will not receive any feedback on it. Are you sure you want to delete this request?";
    }
    return "This request has not been assigned to a group. Are you sure you want to delete this request?";
};

const RequestButtons = ({ mediaUrl, showEditFeedbackRequestModal, deleteRequestMutate }) => (
    <React.Fragment>
        <Button
            shape="circle"
            icon="edit"
            onClick={showEditFeedbackRequestModal}
            style={{
                marginRight: "0.5em",
            }}
        />
        <Popconfirm
            title={getDeleteConfirmationText(mediaUrl)}
            onConfirm={deleteRequestMutate}
            okText="Yes"
            cancelText="No"
        >
            <Button
                shape="circle"
                icon="delete"
            />
        </Popconfirm>
    </React.Fragment>
);

const deleteRequest = ({ feedbackRequestId }) => (
    fetch(`${apiRoot}/graphql/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query: DELETE_FEEDBACK_REQUEST_MUTATION,
            variables: {
                feedbackRequestId,
            },
        }),
        credentials: "include",
    }).then((result) => result.json()).then((response) => response.data.deleteFeedbackRequest)
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

    if (data && !data.success) {
        message.error(data.error);
    }

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
                        showEditFeedbackRequestModal={showEditFeedbackRequestModal}
                        deleteRequestMutate={() => deleteRequestMutate({
                            feedbackRequestId: feedbackRequestSummary.feedbackRequestId,
                        })}
                    />
                )}
            >
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

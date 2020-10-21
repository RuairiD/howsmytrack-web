import React from "react";

import { Alert } from "antd";
import MediaEmbed from "../MediaEmbed/MediaEmbed";

const FeedbackRequestSummaryMedia = ({ mediaUrl, mediaType }) => {
    if (!mediaUrl) {
        return (
            <Alert
                message="No track has been provided for this request. You'll be able to join a group and provide feedback for others, but you won't receive any feedback for yourself."
                type="info"
                showIcon
            />
        );
    }
    if (!mediaType) {
        return (
            <Alert
                message="Unable to play media. Invalid URL."
                type="error"
                showIcon
            />
        );
    }
    return <MediaEmbed mediaUrl={mediaUrl} mediaType={mediaType} />;
};

export default FeedbackRequestSummaryMedia;

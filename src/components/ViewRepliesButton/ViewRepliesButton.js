import React from "react";

import { Badge, Button, Icon } from "antd";

type Props = {
    replies: number,
    unreadReplies: number,
    onClick: () => {},
};

const getBadgeTitle = (unreadReplies) => {
    if (unreadReplies === 1) {
        return "1 unread reply";
    }
    return `${unreadReplies} unread replies`;
};

const getRepliesText = (replies) => {
    if (replies === 0) {
        return "Leave a Reply";
    }

    let repliesText = `View ${replies} replies`;
    if (replies === 1) {
        repliesText = "View 1 reply";
    }

    return repliesText;
};

/*
 * Component for rendering a button for opening a FeedbackResponseRepliesModal
 * Indicates how many replies there are to read and how many are unread.
 */
const ViewRepliesButton = ({
    replies,
    unreadReplies,
    onClick,
}: Props) => (
    <Button
        block
        onClick={onClick}
        style={{
            marginTop: "0.5em",
        }}
    >
        <Icon type="message" />
        {getRepliesText(replies)}
        <Badge
            style={{
                marginLeft: "0.5em",
            }}
            count={unreadReplies}
            title={getBadgeTitle(unreadReplies)}
        />
    </Button>
);

export default ViewRepliesButton;

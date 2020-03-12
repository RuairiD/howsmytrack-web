import React from 'react';

import { Button } from 'antd';

type Props = {
    replies: number,
    unreadReplies: number,
    onClick: () => {},
};

class ViewRepliesButton extends React.Component<Props> {
    /*
     * Component for rendering a button for opening a FeedbackResponseRepliesModal
     * Indicates how many replies there are to read and how many are unread.
     */
    renderRepliesText = () => {
        if (this.props.replies === 0) {
            return "Leave a Reply";
        }

        let repliesText = "View " + this.props.replies + " replies";
        if (this.props.replies === 1) {
            repliesText = "View 1 reply";
        }

        if (this.props.unreadReplies) {
            repliesText = repliesText + " (" + this.props.unreadReplies + " unread)";
        }
        
        return repliesText;
    };

    render() {
        return (
            <Button
                onClick={this.props.onClick}
            >
                {this.renderRepliesText()}
            </Button>
        );
    }
}

export default ViewRepliesButton;

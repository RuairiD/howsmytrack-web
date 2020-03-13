import React from 'react';

import { Badge, Button, Icon } from 'antd';

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
        
        return repliesText;
    };

    render() {
        return (
            <div style={{ paddingRight: '20px' }}>
                <Badge count={this.props.unreadReplies}>
                    <Button onClick={this.props.onClick}>
                        <Icon type="message" />
                        {this.renderRepliesText()}
                    </Button>
                </Badge>
            </div>
        );
    }
}

export default ViewRepliesButton;

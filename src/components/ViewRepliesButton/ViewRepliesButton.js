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

    getBadgeTitle = () => {
        if (this.unreadReplies === 1) {
            return '1 unread reply';
        }
        return this.unreadReplies + ' unread replies';
    };

    render() {
        return (
            <Button
                block
                onClick={this.props.onClick}
                style={{
                    marginTop: '0.5em',
                }}
            >
                <Icon type="message" />
                {this.renderRepliesText()}
                <Badge
                    style={{
                        marginLeft: '0.5em',
                    }}
                    count={this.props.unreadReplies}
                    title={this.getBadgeTitle()}
                />
            </Button>
        );
    }
}

export default ViewRepliesButton;

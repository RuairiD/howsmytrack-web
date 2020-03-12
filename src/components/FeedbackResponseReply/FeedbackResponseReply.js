import React from 'react';
import dateFormat from 'dateformat';

import { Comment } from 'antd';

export type FeedbackResponseReplyProps = {
    username: string,
    text: string,
    timeCreated: string,
};

class FeedbackResponseReply extends React.Component<FeedbackResponseReplyProps> {
    /*
     * Component for showing a reply to some feedback as part of a thread.
     */
    render() {
        return (
            <Comment
                author={this.props.username}
                content={
                    <p>{this.props.text}</p>
                }
                datetime={dateFormat(
                    new Date(
                        Date.parse(this.props.timeCreated)
                    ),
                    'mmmm dS yyyy h:MM TT',
                )}
            />
        );
    }
}

export default FeedbackResponseReply;

import React from 'react';
import dateFormat from 'dateformat';

import { Comment } from 'antd';

export type FeedbackResponseReplyProps = {
    username: string,
    text: string,
    timeCreated: string,
};
/*
 * Component for showing a reply to some feedback as part of a thread.
 */
const FeedbackResponseReply = ({
    username,
    text,
    timeCreated,
}: FeedbackResponseReplyProps) => (
    <Comment
        author={username}
        content={text}
        datetime={dateFormat(
            new Date(
                Date.parse(timeCreated)
            ),
            'mmmm dS yyyy h:MM TT',
        )}
    />
);

export default FeedbackResponseReply;

import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroups from '../FeedbackGroups/FeedbackGroups';

function FeedbackGroupsPage() {
    return (
        <div>
            <GenericPage
                username="ruairidx"
                rating={4.8876567}
            >
                <FeedbackGroups
                    username="ruairidx"
                    feedbackGroups={[
                        {
                            feedbackGroupId: 13,
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/grey',
                            userCount: 4,
                            userFeedbackCount: 0,
                            feedbackResponseCount: 1,
                        },
                        {
                            feedbackGroupId: 8,
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/waiting-for-bad-news',
                            userCount: 4,
                            userFeedbackCount: 2,
                            feedbackResponseCount: 3,
                        },
                        {
                            feedbackGroupId: 4,
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/bruno',
                            userCount: 4,
                            userFeedbackCount: 3,
                            feedbackResponseCount: 3,
                        },
                    ]}
                />
            </GenericPage>
        </div>
    )
}

export default FeedbackGroupsPage;

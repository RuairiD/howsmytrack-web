import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroup from '../FeedbackGroup/FeedbackGroup';

function FeedbackGroupPage() {
    return (
        <div>
            <GenericPage
                username="ruairidx"
                rating={4.8876567}
            >
                <FeedbackGroup
                    feedbackResponseForms={[
                        {
                            initialFeedbackText: '',
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/waiting-for-bad-news',
                            feedbackPrompt: 'does this sound good lol',
                        },
                        {
                            initialFeedbackText: 'one thing i think you should try is',
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/bruno',
                            feedbackPrompt: '',
                        },
                        {
                            initialFeedbackText: 'TODO: mention chord voicings',
                            soundcloudUrl: 'https://soundcloud.com/ruairidx/the-ice-beneath-his-feet-master-2020-01-27/s-QlPhS',
                            feedbackPrompt: 'Not sure about the chord voicings in the middle section; too much range.',
                        },
                    ]}
                    feedbackReceived={['your bass is shit', 'give up man lol']}
                />
            </GenericPage>
        </div>
    )
}

export default FeedbackGroupPage;

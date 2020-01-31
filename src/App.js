import React from 'react';
import './App.css';

import GenericPage from './components/GenericPage/GenericPage';
import FeedbackGroupPage from './components/FeedbackGroupPage/FeedbackGroupPage';
import FeedbackRequestForm from './components/FeedbackRequestForm/FeedbackRequestForm';
import FeedbackGroupsPage from './components/FeedbackGroupsPage/FeedbackGroupsPage';
import FAQPage from './components/FAQPage/FAQPage';

/*
<FeedbackGroupPage
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

<FeedbackGroupsPage
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

*/

function App() {
    return (
        <div>
            <GenericPage
                username="ruairidx"
                rating={4.8876567}
            >
                <FeedbackGroupPage
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

export default App;

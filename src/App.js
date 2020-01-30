import React from 'react';
import './App.css';

import FeedbackGroup from './components/FeedbackGroup/FeedbackGroup';
import FeedbackRequestForm from './components/FeedbackRequestForm/FeedbackRequestForm';

function App() {
    return (
        <div>
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
                ]}
                feedbackReceived={['your bass is shit', 'give up man lol']}
            />

            <FeedbackRequestForm 
                onSubmit={
                    (soundcloudUrl, feedbackPrompt) => {
                        console.log(soundcloudUrl, feedbackPrompt)
                    }
                }
            />
        </div>
    )
}

export default App;

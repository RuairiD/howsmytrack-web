import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import FeedbackGroup from '../FeedbackGroup/FeedbackGroup';

type State = {
    hasProps: boolean,
    username: string,
    rating: number,
    feedbackResponseForms: Array<object>,
    feedbackReceived: Array<string>,
};

var VERIFY_TOKEN_QUERY = `query VerifyToken($token: String!) {
    verifyToken(token: $token) {
        payload
    }
}`; // use to get username

/*
query {
  feedbackRequests {
    id
    soundcloudUrl
    feedbackPrompt
    feedbackGroup {
      id
      name
    }
    feedbackResponses {
      id
      feedback
    }
  }
}

# mutation {
#   registerUser(email: "ruairidx@gmail.com", password: "asdqwertyfgh", passwordRepeat: "asdqwertyfgh") {
#     success,
#     errors
#   }
# }

# mutation {
#   tokenAuth(username: "ruairidx@gmail.com", password: "asdqwertyfgh") {
#     token
#   }
# }

# mutation {
#   verifyToken(token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJ1YWlyaWR4QGdtYWlsLmNvbSIsImV4cCI6MTU4MDUxMjg1NSwib3JpZ0lhdCI6MTU4MDUxMjU1NX0.VwWgXwe1pJZlpk3FZf8ymdzcwiM918FKAbA9PVWYDZs") {
#     payload
#   }
# }

# mutation {
#   createFeedbackRequest(soundcloudUrl: "https://soundcloud.com/ruairidx/bruno", feedbackPrompt: "hhhhh") {
#     success
#     errors
#   }
# }

# mutation {
#   rateFeedbackResponse(feedbackResponseId: 1, rating:4) {
#     success
#     errors
#   }
# }
*/

class FeedbackGroupPage extends React.Component<State> {
    state = {
        hasProps: false,
    };

    componentDidMount() {
        
    }

    render() {
        return this.state.hasProps && (
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
        )
    }
}

export default FeedbackGroupPage;

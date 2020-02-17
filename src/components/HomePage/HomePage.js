import React from 'react';

import apiRoot from '../../apiRoot';

import FeedbackGroupsPage from '../FeedbackGroupsPage/FeedbackGroupsPage';
import FaqPage from '../FaqPage/FaqPage';

type Props = {
    isMobile: boolean,
};

type State = {
    isLoggedIn: boolean,
};

const USER_DETAILS_QUERY = `query UserDetails {
  userDetails {
    username
    rating
  }
}`;

class HomePage extends React.Component<Props, State> {
    state = {
        isLoggedIn: false,
    };

    componentDidMount() {
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: USER_DETAILS_QUERY,
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                isLoggedIn: !!data['data']['userDetails']['username'],
            });
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<FeedbackGroupsPage isMobile={this.props.isMobile} />);
        }
        return (<FaqPage isMobile={this.props.isMobile} />);
    }
}

export default HomePage;

import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import TrackUrlHelp from '../TrackUrlHelp/TrackUrlHelp';

type Props = {
    isMobile: boolean,
};

class TrackUrlHelpPage extends React.Component<Props> {
    render() {
        return (
            <GenericPage title="How do I get the correct track URL?" isMobile={this.props.isMobile}>
                <TrackUrlHelp />
            </GenericPage>
        )
    }
}

export default TrackUrlHelpPage;

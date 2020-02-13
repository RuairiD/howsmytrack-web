import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import Faq from '../Faq/Faq';

type Props = {
    isMobile: boolean,
}

class FaqPage extends React.Component<Props> {
    render() {
        return (
            <GenericPage isMobile={this.props.isMobile}>
                <Faq />
            </GenericPage>
        )
    }
}

export default FaqPage;

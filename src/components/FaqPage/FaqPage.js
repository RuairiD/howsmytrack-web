import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import Faq from '../Faq/Faq';

class FaqPage extends React.Component {
    render() {
        return (
            <GenericPage>
                <Faq />
            </GenericPage>
        )
    }
}

export default FaqPage;

import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import Faq from '../Faq/Faq';

class FaqPage extends React.Component {
    render() {
        return (
            <div>
                <GenericPage
                    username="ruairidx"
                    rating={4.8876567}
                >
                    <Faq />
                </GenericPage>
            </div>
        )
    }
}

export default FaqPage;

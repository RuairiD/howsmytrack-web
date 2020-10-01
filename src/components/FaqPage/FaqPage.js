import React from 'react';

import GenericPage from '../GenericPage/GenericPage';
import Faq from '../Faq/Faq';

type Props = {
    isMobile: boolean,
};

const FaqPage = ({ isMobile }: Props) =>(
    <GenericPage title="Frequently Asked Questions" isMobile={isMobile}>
        <Faq />
    </GenericPage>
)

export default FaqPage;

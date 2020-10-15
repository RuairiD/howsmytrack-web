import React from "react";

import GenericPage from "../GenericPage/GenericPage";
import TrackUrlHelp from "../TrackUrlHelp/TrackUrlHelp";

type Props = {
    isMobile: boolean,
};

const TrackUrlHelpPage = ({ isMobile }: Props) => (
    <GenericPage title="How do I get the correct track URL?" isMobile={isMobile}>
        <TrackUrlHelp />
    </GenericPage>
);

export default TrackUrlHelpPage;

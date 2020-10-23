import React from "react";

const MissingGenreMessage = ({ isRequestTrackless }) => (
    <React.Fragment>
        {isRequestTrackless && "Please select the genre you would like to provide feedback for."}
        {!isRequestTrackless && "Please select a genre for this track. If you are unsure or do not see your genre listed, just select 'No Genre'."}
    </React.Fragment>
);

export default MissingGenreMessage;

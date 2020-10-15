import React from "react";

import { Audio, Div } from "lemon-reset";

const formatMediaUrl = (mediaUrl) => {
    const urlParts = mediaUrl.split("?");
    return `${urlParts[0]}?raw=1`;
};

type Props = {
    mediaUrl: string,
};

const DropboxEmbed = ({ mediaUrl }: Props) => (
    <Div>
        <Audio
            style={{ width: "100%" }}
            controls
            src={formatMediaUrl(mediaUrl)}
        />
    </Div>
);

export default DropboxEmbed;

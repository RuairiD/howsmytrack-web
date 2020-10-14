import React from 'react';

import { Audio, Div } from 'lemon-reset';

const formatMediaUrl = (mediaUrl) => {
    let urlParts = mediaUrl.split('?');
    return urlParts[0] + '?raw=1';
}

type Props = {
    mediaUrl: string,
};

const DropboxEmbed = ({ mediaUrl }: Props) => (
    <Div>
        <Audio
            style={{ width: "100%" }}
            controls
            src={formatMediaUrl(mediaUrl)}
        ></Audio>
    </Div>
);

export default DropboxEmbed;

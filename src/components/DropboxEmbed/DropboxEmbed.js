import React from 'react';

const formatMediaUrl = (mediaUrl) => {
    let urlParts = mediaUrl.split('?');
    return urlParts[0] + '?raw=1';
}

type Props = {
    mediaUrl: string,
};

const DropboxEmbed = ({ mediaUrl }: Props) => (
    <div>
        <audio
            style={{ width: "100%" }}
            controls
            src={formatMediaUrl(mediaUrl)}
        ></audio>
    </div>
);

export default DropboxEmbed;

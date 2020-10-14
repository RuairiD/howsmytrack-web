import React from 'react';
import { Div, Iframe } from 'lemon-reset';

const formatMediaUrl = (mediaUrl) => {
    let urlParts = mediaUrl.split('/view');
    return urlParts[0] + '/preview?usp=sharing';
}

type Props = {
    mediaUrl: string,
};

const GoogleDriveEmbed = ({ mediaUrl }: Props) => (
    <Div>
        <Iframe
            title="googledrive"
            width="100%"
            height="64"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={formatMediaUrl(mediaUrl)}   
        >
        </Iframe>
    </Div>
);

export default GoogleDriveEmbed;

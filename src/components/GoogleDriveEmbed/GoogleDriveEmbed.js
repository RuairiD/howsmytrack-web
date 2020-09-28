import React from 'react';

const formatMediaUrl = (mediaUrl) => {
    let urlParts = mediaUrl.split('/view');
    return urlParts[0] + '/preview?usp=sharing';
}

type Props = {
    mediaUrl: string,
};

const GoogleDriveEmbed = ({ mediaUrl }: Props) => (
    <div>
        <iframe
            title="googledrive"
            width="100%"
            height="64"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={formatMediaUrl(mediaUrl)}   
        >
        </iframe>
    </div>
);

export default GoogleDriveEmbed;

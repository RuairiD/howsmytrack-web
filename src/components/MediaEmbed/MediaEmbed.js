import React from 'react';
import { Div } from 'lemon-reset';

import DropboxEmbed from '../DropboxEmbed/DropboxEmbed';
import GoogleDriveEmbed from '../GoogleDriveEmbed/GoogleDriveEmbed';
import OneDriveEmbed from '../OneDriveEmbed/OneDriveEmbed';
import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

type Props = {
    mediaUrl: string,
    mediaType: string,
    size: string,
};

const MediaEmbed  = ({ mediaUrl, mediaType, size, }: Props) => (
    <Div>
        {mediaType === 'SOUNDCLOUD' && <SoundcloudEmbed
            mediaUrl={mediaUrl}
            size={size}
        />}
        {mediaType === 'GOOGLEDRIVE' && <GoogleDriveEmbed
            mediaUrl={mediaUrl}
        />}
        {mediaType === 'DROPBOX' && <DropboxEmbed
            mediaUrl={mediaUrl}
        />}
        {mediaType === 'ONEDRIVE' && <OneDriveEmbed
            mediaUrl={mediaUrl}
        />}
    </Div>
);

export default MediaEmbed;

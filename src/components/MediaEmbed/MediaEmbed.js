import React from 'react';

import DropboxEmbed from '../DropboxEmbed/DropboxEmbed';
import GoogleDriveEmbed from '../GoogleDriveEmbed/GoogleDriveEmbed';
import SoundcloudEmbed from '../SoundcloudEmbed/SoundcloudEmbed';

type Props = {
    mediaUrl: string,
    mediaType: string,
    size: string,
};

class MediaEmbed extends React.Component<Props> {
    formatMediaUrl = (mediaUrl) => {
        let urlParts = mediaUrl.split('?');
        return urlParts[0] + '?raw=1';
    }

    render() {
        return (
            <div>
                {this.props.mediaType === 'MediaTypeChoice.SOUNDCLOUD' && <SoundcloudEmbed
                    mediaUrl={this.props.mediaUrl}
                    size={this.props.size}
                />}
                {this.props.mediaType === 'MediaTypeChoice.GOOGLEDRIVE' && <GoogleDriveEmbed
                    mediaUrl={this.props.mediaUrl}
                />}
                {this.props.mediaType === 'MediaTypeChoice.DROPBOX' && <DropboxEmbed
                    mediaUrl={this.props.mediaUrl}
                />}
            </div>
        );
    }
}

export default MediaEmbed;

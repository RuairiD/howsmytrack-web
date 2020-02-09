import React from 'react';

type Props = {
    mediaUrl: string,
};

class DropboxEmbed extends React.Component<Props> {
    formatMediaUrl = (mediaUrl) => {
        let urlParts = mediaUrl.split('?');
        return urlParts[0] + '?raw=1';
    }

    render() {
        return (
            <div>
                <audio controls src={this.formatMediaUrl(this.props.mediaUrl)}></audio>
            </div>
        );
    }
}

export default DropboxEmbed;

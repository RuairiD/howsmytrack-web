import React from 'react';

type Props = {
    mediaUrl: string,
};

class GoogleDriveEmbed extends React.Component<Props> {
    formatMediaUrl = (mediaUrl) => {
        let urlParts = mediaUrl.split('/view');
        return urlParts[0] + '/preview?usp=sharing';
    }

    render() {
        return (
            <div>
                <iframe
                    title="googledrive"
                    width="100%"
                    height="64"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={this.formatMediaUrl(this.props.mediaUrl)}   
                >
                </iframe>
            </div>
        );
    }
}

export default GoogleDriveEmbed;

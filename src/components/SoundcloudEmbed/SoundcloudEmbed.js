import React from 'react';

type Props = {
    soundcloudUrl: string,
    size: string,
};

class SoundcloudEmbed extends React.Component<Props> {
    createIframeUrl = (soundcloudUrl) => {
        return 'https://w.soundcloud.com/player/?url=' + soundcloudUrl + '&color=%23ff5500&inverse=false&auto_play=false&show_user=true'
    }

    formatTrackUrl = (soundcloudUrl) => {
        /*
         * Format track URL for embedded iframe by separating out secret token.
         */
        let urlParts = soundcloudUrl.split('/')
        let secretToken = urlParts[urlParts.length - 1] 
        if (secretToken.length !== 7) {
            // Not a valid secret token, probably just a public track that doesn't need a secret token.
            return soundcloudUrl
        }
        let secretlessUrl = ''
        for (var i = 0; i < urlParts.length - 1; i++) {
            secretlessUrl = secretlessUrl + urlParts[i] + '/'
        }
        return secretlessUrl + '?secret_token=' + secretToken
    }

    getFrameHeight = () => {
        if (this.props.size === 'small') {
            return 20;
        }
        return 166;
    }

    render() {
        return (
            <div>
                <iframe
                    title="soundcloud"
                    width="100%"
                    height={this.getFrameHeight()}
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={
                        this.createIframeUrl(
                            this.formatTrackUrl(
                                this.props.soundcloudUrl
                            )
                        )
                    }   
                >
                </iframe>
            </div>
        );
    }
}

export default SoundcloudEmbed;

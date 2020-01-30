import React from 'react';

type Props = {
    soundcloudUrl: string,
};


class SoundcloudEmbed extends React.Component<Props> {
    createIframeUrl = (soundcloudUrl) => {
        return 'https://w.soundcloud.com/player/?url=' + soundcloudUrl + '&color=%23ff5500&inverse=false&auto_play=false&show_user=true'
    }

    render() {
        return (
            <div>
                <iframe
                    title="soundcloud"
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameborder="no"
                    allow="autoplay"
                    src={this.createIframeUrl(this.props.soundcloudUrl)}
                >
                </iframe>
            </div>
        );
    }
}

export default SoundcloudEmbed;

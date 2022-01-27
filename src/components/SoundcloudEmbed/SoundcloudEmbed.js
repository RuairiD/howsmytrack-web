import React from "react";
import { Div, Iframe } from "lemon-reset";

type Props = {
    mediaUrl: string,
    size: string,
};

const createIframeUrl = (mediaUrl) => `https://w.soundcloud.com/player/?url=${mediaUrl}&color=%23ff5500&inverse=false&auto_play=false&show_user=true`;

const formatMediaUrl = (mediaUrl) => {
    /*
     * Format track URL for embedded iframe by separating out secret token.
     */
    // Remove query string.
    const cleanedMediaUrl = mediaUrl.split("?")[0];
    const urlParts = cleanedMediaUrl.split("/");
    if (urlParts.length < 6) {
        // No secret token provided; leave it as a public track.
        return cleanedMediaUrl;
    }
    const secretToken = urlParts[5];
    let secretlessUrl = "";
    for (let i = 0; i < urlParts.length - 1; i++) {
        secretlessUrl = `${secretlessUrl + urlParts[i]}/`;
    }
    return `${secretlessUrl}?secret_token=${secretToken}`;
};

const getFrameHeight = (size) => {
    if (size === "small") {
        return 20;
    }
    return 166;
};

const SoundcloudEmbed = ({ mediaUrl, size }: Props) => (
    <Div>
        <Iframe
            title="soundcloud"
            width="100%"
            height={getFrameHeight(size)}
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={createIframeUrl(
                formatMediaUrl(mediaUrl),
            )}
        />
    </Div>
);

export default SoundcloudEmbed;

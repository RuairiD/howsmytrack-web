import React from 'react';

type Props = {
    mediaUrl: string,
};

const formatMediaUrl = (mediaUrl) => {
    // File urls are of the form
    //    https://onedrive.live.com/?authkey=AUTHKEY&cid=CID&id=ID
    // Download urls (for <audio> tags) are of the form 
    //    https://onedrive.live.com/download?cid=CID&resid=ID&authkey=AUTHKEY
    // These params are in the regular file URL and can be extracted and rearranged.
    let urlParams = new URLSearchParams(mediaUrl);
    let cid = urlParams.get('cid');
    let resid = urlParams.get('id');
    let authkey = urlParams.get('authkey');
    let formattedUrl = 'https://onedrive.live.com/download?' +
        'cid=' + cid +
        '&resid=' + resid +
        '&authkey=' + authkey;
    return formattedUrl;
}

const OneDriveEmbed  = ({ mediaUrl }: Props) => (
    <div>
        <audio
            style={{ width: "100%" }}
            controls
            src={formatMediaUrl(mediaUrl)}
        >
        </audio>
    </div>
);

export default OneDriveEmbed;

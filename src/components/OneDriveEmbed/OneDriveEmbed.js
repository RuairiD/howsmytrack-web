import React from "react";
import { Audio, Div } from "lemon-reset";

type Props = {
    mediaUrl: string,
};

const formatMediaUrl = (mediaUrl) => {
    // File urls are of the form
    //    https://onedrive.live.com/?authkey=AUTHKEY&cid=CID&id=ID
    // Download urls (for <audio> tags) are of the form
    //    https://onedrive.live.com/download?cid=CID&resid=ID&authkey=AUTHKEY
    // These params are in the regular file URL and can be extracted and rearranged.
    const urlParams = new URLSearchParams(mediaUrl.split("?")[1]);
    const cid = urlParams.get("cid");
    const resid = urlParams.get("id");
    const authkey = urlParams.get("authkey");

    const formattedUrl = `https://onedrive.live.com/download?cid=${cid}&resid=${resid}&authkey=${authkey}`;
    return formattedUrl;
};

const OneDriveEmbed = ({ mediaUrl }: Props) => (
    <Div>
        <Audio
            style={{ width: "100%" }}
            controls
            src={formatMediaUrl(mediaUrl)}
        />
    </Div>
);

export default OneDriveEmbed;

import React from "react";

import { Icon, List, Typography } from "antd";
import { Div, Li, Ol, Ul } from "lemon-reset";

const PLATFORMS = [
    {
        name: "Soundcloud",
        content: (
            <Typography.Paragraph>
                <Ol>
                    <Li>Navigate to your track&apos;s page (the URL should be something like `https://soundcloud.com/ruairidx/grey`</Li>
                    <Li>Click the <Typography.Text strong>Share</Typography.Text> button below the track waveform.</Li>
                    <Li>Copy the URL below <Typography.Text strong>Private Share</Typography.Text> (or just <Typography.Text strong>Share</Typography.Text> if your track is already public)</Li>
                </Ol>
                Your URL should look like:
                <Ul>
                    <Li><Typography.Text code>https://soundcloud.com/ruairidx/grey</Typography.Text></Li>
                    <Li><Typography.Text code>https://soundcloud.com/ruairidx/grey/secret</Typography.Text></Li>
                </Ul>
            </Typography.Paragraph>
        ),
    },
    {
        name: "Google Drive",
        content: (
            <Typography.Paragraph>
                <Ol>
                    <Li>Right click the track file (ensure it is the track itself and not its folder etc.)</Li>
                    <Li>Click the <Typography.Text strong>Share</Typography.Text> button in the right click menu</Li>
                    <Li>
                        Click <Typography.Text strong>Copy Link</Typography.Text>
                        <Ul>
                            <Li>You may need to click <Typography.Text strong>Get shareable link</Typography.Text> in the top right corner before the link is available.</Li>
                        </Ul>
                    </Li>
                </Ol>
                Your URL should look like:
                <Ul>
                    <Li><Typography.Text code>https://drive.google.com/file/d/abcdefghijklmnopqrstuvwxyz1234567/view</Typography.Text></Li>
                </Ul>
            </Typography.Paragraph>
        ),
    },
    {
        name: "Dropbox",
        content: (
            <Typography.Paragraph>
                <Ol>
                    <Li>Click the <Icon type="ellipsis" /> next to your track file</Li>
                    <Li>Click the <Typography.Text strong>Share</Typography.Text> button in the menu</Li>
                    <Li>
                        Click <Typography.Text strong>Copy Link</Typography.Text> at the bottom of the popup.
                        <Ul>
                            <Li>You may need to click <Typography.Text strong>Create link</Typography.Text> before the link is available.</Li>
                        </Ul>
                    </Li>
                </Ol>
                Your URL should look like:
                <Ul>
                    <Li><Typography.Text code>https://www.dropbox.com/s/abcdefghijklmno/filename</Typography.Text></Li>
                </Ul>
            </Typography.Paragraph>
        ),
    },
    {
        name: "OneDrive",
        content: (
            <Typography.Paragraph>
                <Ol>
                    <Li>Navigate to your file&apos;s page; the track should be playable and a media player should be visible.</Li>
                    <Li>Click the <Typography.Text strong>Share</Typography.Text> button in the top left corner</Li>
                    <Li>Click the <Typography.Text strong>Copy</Typography.Text> button next to the shareable URL. <Typography.Text strong>Do not use this URL; howsmytrack.com will reject it. Keep reading.</Typography.Text></Li>
                    <Li>Paste the URL into an incognito/private browsing window, or any window where you aren&apos;t logged in on OneDrive (this is important). The URL will resolve into a longer URL; copy this link from your address bar.</Li>
                </Ol>
                Your URL should look like:
                <Ul>
                    <Li><Typography.Text code>https://onedrive.live.com/?authkey=AUTHKEY&cid=CID&id=ID</Typography.Text></Li>
                </Ul>
            </Typography.Paragraph>
        ),
    },
];

/*
 * Component for displaying help page with instructions on how to getthe
 * correct track URL for each platform for use on howsmytrack
 */
const TrackUrlHelp = () => (
    <Div>
        <Typography.Paragraph>These instructions are for desktop and may differ on mobile.</Typography.Paragraph>
        <List
            itemLayout="vertical"
            dataSource={PLATFORMS}
            renderItem={(platform) => (
                <List.Item>
                    <List.Item.Meta
                        title={platform.name}
                    />
                    {platform.content}
                </List.Item>
            )}
        />
    </Div>
);

export default TrackUrlHelp;

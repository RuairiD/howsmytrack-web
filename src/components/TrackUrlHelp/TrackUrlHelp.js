import React from 'react';

import { Icon, List, Typography } from 'antd';

type Props = {};

class TrackUrlHelp extends React.Component<Props> {
    /*
     * Component for displaying help page with instructions on how to getthe
     * correct track URL for each platform for use on howsmytrack
     */

    platforms = [
        {
            name: "Soundcloud",
            content: (
                <Typography.Paragraph>
                    <ol>
                        <li>Navigate to your track's page (the URL should be something like `https://soundcloud.com/ruairidx/grey`</li>
                        <li>Click the <Typography.Text strong>Share</Typography.Text> button below the track waveform.</li>
                        <li>Copy the URL below <Typography.Text strong>Private Share</Typography.Text> (or just <Typography.Text strong>Share</Typography.Text> if your track is already public)</li>
                    </ol>
                    Your URL should look like:
                    <ul>
                        <li><Typography.Text code>https://soundcloud.com/ruairidx/grey</Typography.Text></li>
                        <li><Typography.Text code>https://soundcloud.com/ruairidx/grey/secret</Typography.Text></li>
                    </ul>
                </Typography.Paragraph>
            ),
        },
        {
            name: "Google Drive",
            content: (
                <Typography.Paragraph>
                    <ol>
                        <li>Right click the track file (ensure it is the track itself and not its folder etc.)</li>
                        <li>Click the <Typography.Text strong>Share</Typography.Text> button in the right click menu</li>
                        <li>
                            Click <Typography.Text strong>Copy Link</Typography.Text>
                            <ul>
                                <li>You may need to click <Typography.Text strong>Get shareable link</Typography.Text> in the top right corner before the link is available.</li>
                            </ul>
                        </li>
                    </ol>
                    Your URL should look like:
                    <ul>
                        <li><Typography.Text code>https://drive.google.com/file/d/abcdefghijklmnopqrstuvwxyz1234567/view</Typography.Text></li>
                    </ul>
                </Typography.Paragraph>
            ),
        },
        {
            name: "Dropbox",
            content: (
                <Typography.Paragraph>
                    <ol>
                        <li>Click the <Icon type="ellipsis" /> next to your track file</li>
                        <li>Click the <Typography.Text strong>Share</Typography.Text> button in the menu</li>
                        <li>
                            Click <Typography.Text strong>Copy Link</Typography.Text> at the bottom of the popup.
                            <ul>
                                <li>You may need to click <Typography.Text strong>Create link</Typography.Text> before the link is available.</li>
                            </ul>
                        </li>
                    </ol>
                    Your URL should look like:
                    <ul>
                        <li><Typography.Text code>https://www.dropbox.com/s/abcdefghijklmno/filename</Typography.Text></li>
                    </ul>
                </Typography.Paragraph>
            ),
        },
        {
            name: "OneDrive",
            content: (
                <Typography.Paragraph>
                    <ol>
                        <li>Navigate to your file's page; the track should be playable and a media player should be visible.</li>
                        <li>Click the <Typography.Text strong>Share</Typography.Text> button in the top left corner</li>
                        <li>Click the <Typography.Text strong>Copy</Typography.Text> button next to the shareable URL. <Typography.Text strong>Do not use this URL; howsmytrack.com will reject it. Keep reading.</Typography.Text></li>
                        <li>Paste the URL into an incognito/private browsing window, or any window where you aren't logged in on OneDrive (this is important). The URL will resolve into a longer URL; copy this link from your address bar.</li>
                    </ol>
                    Your URL should look like:
                    <ul>
                        <li><Typography.Text code>https://onedrive.live.com/?authkey=AUTHKEY&cid=CID&id=ID</Typography.Text></li>
                    </ul>
                </Typography.Paragraph>
            ),
        },
    ]

    render() {
        return (
            <div>
                <Typography.Paragraph>These instructions are for desktop and may differ on mobile.</Typography.Paragraph>
                <List
                    itemLayout="vertical"
                    dataSource={this.platforms}
                    renderItem={platform => (
                        <List.Item>
                            <List.Item.Meta
                                title={platform.name}
                            />
                            {platform.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default TrackUrlHelp;
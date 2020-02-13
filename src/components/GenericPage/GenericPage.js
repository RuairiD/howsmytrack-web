import React from 'react';
import cookie from 'react-cookies'

import apiRoot from '../../apiRoot';

import { Divider, Layout, notification, Typography } from 'antd';
import Sidebar from '../Sidebar/Sidebar';

const REFRESH_TOKEN_FROM_COOKIE_MUTATION = `mutation RefreshTokenFromCookie {
    refreshTokenFromCookie {
        token
    }
}`;

const SAFARI_NOTIFICATION_COOKIE_NAME = 'sn';

type Props = {
    isMobile: boolean,
}

class GenericPage extends React.Component<Props> {
    /*
     * Component for displaying generic page with children.
     * Also responsible for refreshing JWT token on pageload.
     */

    componentDidMount() {
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: REFRESH_TOKEN_FROM_COOKIE_MUTATION,
            }),
            credentials: 'include',
        });

        // Show warning to user that Safari will not work if
        // cookies cannot be set.
        if (this.isSafari() && !cookie.load(SAFARI_NOTIFICATION_COOKIE_NAME)) {
            notification.warning({
                message: 'Using Safari?',
                description: (
                    <Typography.Paragraph>
                        Users may not be able to sign in on Safari if <Typography.Text strong>'Prevent cross-site tracking'</Typography.Text> is enabled. If you are unable to sign in successfully, go to <Typography.Text strong>Preferences > Privacy</Typography.Text> in Safari and ensure <Typography.Text strong>'Prevent cross-site tracking'</Typography.Text> is unchecked.
                    </Typography.Paragraph>
                ),
                duration: 0,
                onClose: this.onSafariNotificationClose,
            });
        }
    }

    isSafari = () => {
        const userAgent = navigator.userAgent.toLowerCase(); 
        if (userAgent.indexOf('safari') !== -1) { 
            if (!(userAgent.indexOf('chrome') > -1)) {
                return true;
            }
        }
        return false;
    };

    onSafariNotificationClose = () => {
        // Set a cookie to prevent the notification being shown to the user again.
        cookie.save(
            SAFARI_NOTIFICATION_COOKIE_NAME,
            true,
            {
                path: '/',
                maxAge: 604800, // 1 week in seconds
            },
        )
    };

    render() {
        return (
            <Layout>
                {this.props.isMobile && <Sidebar isMobile={this.props.isMobile} />}
                <Layout.Content>
                    <Layout>
                        {!this.props.isMobile && <Layout.Sider theme="light">
                            <Sidebar />
                        </Layout.Sider>}
                        <Layout.Content style={{ minHeight: '100vh' }}>
                            <Layout>
                                {!this.props.isMobile && <Layout.Content style={{ padding: '4em' }}>
                                    {this.props.children}
                                </Layout.Content>}
                                {this.props.isMobile && <Layout.Content style={{ padding: '2em' }}>
                                    {this.props.children}
                                </Layout.Content>}
                                <Layout.Footer style={{ textAlign: 'center' }}>
                                    <Divider />
                                    <Typography.Paragraph>
                                        <Typography.Text strong>
                                            <a target="_blank" rel="noopener noreferrer" href="http://ruairidorrity.com">ruairi dorrity</a> &#47;&#47; <a target="_blank" rel="noopener noreferrer" href="http://ruairidx.com">ruairi dx</a>
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <Typography.Text strong>source</Typography.Text><br />
                                        <Typography.Text>
                                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-api">api</a> &#47;&#47; <a target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-web">web</a>
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                </Layout.Footer>
                            </Layout>
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
        );
    }
}

export default GenericPage;

import React from 'react';

import apiRoot from '../../apiRoot';

import { Divider, Layout, Typography } from 'antd';
import Sidebar from '../Sidebar/Sidebar';

const REFRESH_TOKEN_FROM_COOKIE_MUTATION = `mutation RefreshTokenFromCookie {
    refreshTokenFromCookie {
        token
    }
}`;

class GenericPage extends React.Component {
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
    }

    render() {
        return (
            <Layout>
                <Layout.Content>
                    <Layout>
                        <Layout.Sider theme="light">
                            <Sidebar />
                        </Layout.Sider>
                        <Layout.Content style={{ minHeight: '100vh' }}>
                            <Layout>
                                <Layout.Content style={{ padding: '4em' }}>
                                    {this.props.children}
                                </Layout.Content>
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

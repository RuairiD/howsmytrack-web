import React from 'react';

import apiRoot from '../../apiRoot';

import { Divider, Layout, Typography } from 'antd';
import Sidebar from '../Sidebar/Sidebar';

type Props = {
    title: string,
};

type State = {
    tokenRefreshed: boolean,
};

const REFRESH_TOKEN_FROM_COOKIE_MUTATION = `mutation RefreshTokenFromCookie {
    refreshTokenFromCookie {
        token
    }
}`;

class GenericPage extends React.Component<Props, State> {
    /*
     * Component for displaying generic page with children.
     * Also responsible for refreshing JWT token on pageload.
     */
    state = {
        tokenRefreshed: false,
    };

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
        }).then(() => {
            // Doesn't matter if refreshing was successful or not; that gets
            // handled elsewhere. Right now we just care that the job was done.
            this.setState({
                tokenRefreshed: true,
            });
        });
    }

    render() {
        if (this.state.tokenRefreshed) {
            return (
                <Layout>
                    <Layout.Header style={{ padding: '0.5em 1em' }}>
                        <Typography.Title level={1} style={{ color: '#FFFFFF' }}>
                            how's my track?
                        </Typography.Title>
                    </Layout.Header>
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
                                                <a href="https://ruairidorrity.com">ruairi dorrity</a> &#47;&#47; <a href="https://ruairidx.com">ruairi dx</a>
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
        return null;
    }
}

export default GenericPage;

import React from 'react';

import { Divider, Layout, Typography } from 'antd';
import Sidebar from '../Sidebar/Sidebar';

type Props = {
    title: string,
    username: string,
    rating: number,
};

type State = {
};

class GenericPage extends React.Component<Props, State> {
    /*
     * Component for displaying generic page with children,
     */
    state = {};

    render() {
        return (
            <Layout>
                <Layout.Header style={{ padding: '0.5em 1em' }}>
                    <Typography.Title level={1} style={{ color: '#FFFFFF' }}>
                        FeedbackGroups.
                    </Typography.Title>
                </Layout.Header>
                <Layout.Content>
                    <Layout>
                        <Layout.Sider>
                            <Sidebar
                                username={this.props.username}
                                rating={this.props.rating}
                            />
                        </Layout.Sider>
                        <Layout.Content>
                            <Layout>
                                <Layout.Content style={{ padding: '4em' }}>
                                    {this.props.children}
                                </Layout.Content>
                                <Layout.Footer style={{ textAlign: 'center' }}>
                                    <Divider />
                                    <Typography.Paragraph>
                                        <Typography.Text strong>
                                            <a href="https://ruairidorrity.com">ruairi dorrity</a> // <a href="https://ruairidx.com">ruairi dx</a>
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

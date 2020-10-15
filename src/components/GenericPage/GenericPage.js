import React, { useEffect } from "react";

import { Divider, Layout, PageHeader, Typography } from "antd";
import { A, Div } from "lemon-reset";
import apiRoot from "../../apiRoot";
import MenuBar from "../MenuBar/MenuBar";

const REFRESH_TOKEN_FROM_COOKIE_MUTATION = `mutation RefreshTokenFromCookie {
    refreshTokenFromCookie {
        token
    }
}`;

type Props = {
    title: string,
    subTitle: string,
    hideMenu: boolean,
    isMobile: boolean,
};

// TODO: I hate this but it was a quick and dirty way of making sure the page filled the container and
// stayed the same width as other pages which had text they actually needed.
const TRANSPARENT_TEXT = (
    <Typography.Paragraph style={{ opacity: 0, height: 0, width: "100%" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed hendrerit leo. Donec vitae risus et ante egestas sollicitudin at a mi. Duis fringilla a mi ut congue. Sed elit nunc, mollis sit amet interdum id, viverra vitae ligula. Proin eu risus vitae turpis fermentum maximus. Phasellus finibus enim nibh, non cursus lorem auctor interdum. Sed a ex id magna ultricies gravida. Proin sit amet sem at quam tristique tristique sit amet sed augue. Cras in bibendum risus, eu consequat turpis. In sed commodo augue. Donec nibh nulla, viverra quis mi tincidunt, pulvinar interdum neque.
    </Typography.Paragraph>
);

const getSiderWidth = () => {
    // Ideally, 560px+ of content should be visible besides the Sider.
    // A Sider of <200px is awkward though and similarly, a Sider of >256px
    // is redundant.
    let siderWidth = window.screen.width - 560;
    if (siderWidth < 200) {
        siderWidth = 200;
    } else if (siderWidth > 256) {
        siderWidth = 256;
    }
    return `${siderWidth}px`;
};

const GenericPage = ({ title, subTitle, hideMenu, isMobile, children }: Props) => {
    /*
     * Component for displaying generic page with children.
     * Also responsible for refreshing JWT token on pageload.
     */

    useEffect(() => {
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: REFRESH_TOKEN_FROM_COOKIE_MUTATION,
            }),
            credentials: "include",
        });
    }, []);

    return (
        <Layout className="page-container">
            <Div className="page-container-inner">
                {!hideMenu && isMobile && <MenuBar isMobile={isMobile} />}
                <Layout.Content>
                    <Layout>
                        {!hideMenu && !isMobile && (
                            <Layout.Sider theme="light" width={getSiderWidth()}>
                                <MenuBar />
                            </Layout.Sider>
                        )}
                        <Layout.Content className="page-content">
                            {!hideMenu && (
                                <PageHeader
                                    ghost={false}
                                    title={title}
                                    subTitle={subTitle}
                                />
                            )}
                            <Layout className="content">
                                <Layout.Content>
                                    {children}
                                    {TRANSPARENT_TEXT}
                                </Layout.Content>

                                <Layout.Footer style={{ textAlign: "center" }}>
                                    <Divider />
                                    <Typography.Paragraph>
                                        <Typography.Text strong>
                                            <A target="_blank" rel="noopener noreferrer" href="http://ruairidorrity.com">ruairi dorrity</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="http://ruairidx.com">ruairi dx</A>
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        <Typography.Text strong>source</Typography.Text><br />
                                        <Typography.Text>
                                            <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-api">api</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/howsmytrack-web">web</A>
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                </Layout.Footer>
                            </Layout>
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Div>
        </Layout>
    );
};

export default GenericPage;

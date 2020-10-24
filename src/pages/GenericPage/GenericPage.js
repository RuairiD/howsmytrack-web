import React, { useEffect } from "react";

import { Layout, PageHeader, Typography } from "antd";
import { Div } from "lemon-reset";
import axios from "axios";
import apiRoot from "../../apiRoot";
import MenuBar from "../../components/MenuBar/MenuBar";
import PageFooter from "./PageFooter";
import PageSidebar from "./PageSidebar";

// TODO: UserSettingsPage looks weird because it shrinks to fit the small amount of content.
// Fix the CSS and remove this when you have time.
const TransparentText = () => (
    <Typography.Paragraph style={{ opacity: 0, height: 0, width: "100%", userSelect: "none" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed hendrerit leo. Donec vitae risus et ante egestas sollicitudin at a mi. Duis fringilla a mi ut congue. Sed elit nunc, mollis sit amet interdum id, viverra vitae ligula. Proin eu risus vitae turpis fermentum maximus. Phasellus finibus enim nibh, non cursus lorem auctor interdum. Sed a ex id magna ultricies gravida. Proin sit amet sem at quam tristique tristique sit amet sed augue. Cras in bibendum risus, eu consequat turpis. In sed commodo augue. Donec nibh nulla, viverra quis mi tincidunt, pulvinar interdum neque.
    </Typography.Paragraph>
);

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

const GenericPage = ({ title, subTitle, hideMenu, isMobile, children }: Props) => {
    /*
     * Component for displaying generic page with children.
     * Also responsible for refreshing JWT token on pageload.
     */
    useEffect(() => {
        axios.post(`${apiRoot}/graphql/`, {
            query: REFRESH_TOKEN_FROM_COOKIE_MUTATION,
        });
    }, []);

    return (
        <Layout className="page-container">
            <Div className="page-container-inner">
                {!hideMenu && isMobile && <MenuBar isMobile={isMobile} />}
                <Layout.Content>
                    <Layout>
                        {!hideMenu && !isMobile && (
                            <PageSidebar />
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
                                </Layout.Content>
                                <Layout.Footer>
                                    <PageFooter />
                                    <TransparentText />
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

import React, { useEffect } from "react";

import { Layout, PageHeader } from "antd";
import { Div } from "lemon-reset";
import axios from "axios";
import apiRoot from "../../apiRoot";
import MenuBar from "../../components/MenuBar/MenuBar";
import PageFooter from "./PageFooter";
import PageSidebar from "./PageSidebar";

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

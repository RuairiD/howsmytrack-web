import React from "react";

import { Layout } from "antd";
import MenuBar from "../MenuBar/MenuBar";

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

const PageSidebar = () => (
    <Layout.Sider theme="light" width={getSiderWidth()}>
        <MenuBar />
    </Layout.Sider>
);

export default PageSidebar;

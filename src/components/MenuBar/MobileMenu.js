import React from "react";

import { Collapse, Icon } from "antd";

import MobileHeader from "./MobileHeader";
import MainMenu from "./MainMenu";

const MobileMenu = ({
    onMenuClick,
    username,
    rating,
    notifications,
    onCollapseChange,
    mobileMenuCollapsed,
}) => (
    <Collapse
        className="mobile-menu-collapse"
        bordered={false}
        expandIcon={({ isActive }) => (
            <Icon type="menu" rotate={isActive ? 90 : 0} />
        )}
        onChange={onCollapseChange}
    >
        <Collapse.Panel
            header={(
                <MobileHeader
                    mobileMenuCollapsed={mobileMenuCollapsed}
                    notifications={notifications}
                />
            )}
            key="1"
        >
            <MainMenu
                isMobile
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />
        </Collapse.Panel>
    </Collapse>
);

export default MobileMenu;

import React, { useState } from "react";

import { A, Div, Img } from "lemon-reset";
import MobileMenu from "./MobileMenu";
import MainMenu from "./MainMenu";

const MenuBarContent = ({
    isMobile,
    onMenuClick,
    username,
    rating,
    notifications,
}) => {
    const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true);

    const onCollapseChange = (key) => {
        setMobileMenuCollapsed(key.length === 0);
    };

    return (
        <Div className="menu-bar">
            {!isMobile && (
                <A href="/" className="full-logo">
                    <Img
                        alt="how's my track"
                        src="/logo512.png"
                        width="200px"
                        style={{
                            padding: "0.5em",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />
                </A>
            )}
            {isMobile && (
                <MobileMenu
                    onMenuClick={onMenuClick}
                    username={username}
                    rating={rating}
                    notifications={notifications}
                    onCollapseChange={onCollapseChange}
                    mobileMenuCollapsed={mobileMenuCollapsed}
                />
            )}
            {!isMobile && (
                <MainMenu
                    onMenuClick={onMenuClick}
                    username={username}
                    rating={rating}
                    notifications={notifications}
                />
            )}
        </Div>
    );
};

export default MenuBarContent;

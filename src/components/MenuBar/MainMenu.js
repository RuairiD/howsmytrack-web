import React from "react";

import { Div } from "lemon-reset";

import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import SocialLinksMenu from "./SocialLinksMenu";

const MainMenu = ({
    isMobile,
    onMenuClick,
    username,
    rating,
    notifications,
}) => (
    <Div>
        {username && (
            <LoggedInMenu
                onMenuClick={onMenuClick}
                username={username}
                rating={rating}
                notifications={notifications}
            />
        )}
        {!username && (
            <LoggedOutMenu
                onMenuClick={onMenuClick}
            />
        )}
        <SocialLinksMenu
            isMobile={isMobile}
            onMenuClick={onMenuClick}
        />
    </Div>
);

export default MainMenu;

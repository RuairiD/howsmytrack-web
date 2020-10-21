import React from "react";

import { Affix } from "antd";
import { Div } from "lemon-reset";
import MenuBarContent from "./MenuBarContent";

type Props = {
    isMobile: boolean,
};

const MenuBar = ({ isMobile }: Props) => {
    /*
     * Component for displaying page sidebar with menu links, or for mobile,
     * displaying a menu at the top of the screen.
     */

    // Wrapping this in Div prevents forwardRef related errors being raised by
    // ant-design; an inelegant solution but an unobtrusive one as well.
    const menuBarContent = (
        <Div>
            <MenuBarContent
                isMobile={isMobile}
            />
        </Div>
    );

    if (isMobile) {
        return menuBarContent;
    }
    return (
        <Affix>
            {menuBarContent}
        </Affix>
    );
};

export default MenuBar;

import React from "react";

import { Affix } from "antd";
import { Div } from "lemon-reset";
import MenuBarController from "./MenuBarController";

type Props = {
    isMobile: boolean,
};

const MenuBar = ({ isMobile }: Props) => {
    /*
     * Component for displaying page sidebar with menu links, or for mobile,
     * displaying a menu at the top of the screen.
     *
     * TODO: delete and replace with MenuBarController content; this file is now unused.
     */

    // Wrapping this in Div prevents forwardRef related errors being raised by
    // ant-design; an inelegant solution but an unobtrusive one as well.
    const menuBarController = (
        <Div>
            <MenuBarController
                isMobile={isMobile}
            />
        </Div>
    );

    if (isMobile) {
        return menuBarController;
    }
    return (
        <Affix>
            {menuBarController}
        </Affix>
    );
};

export default MenuBar;

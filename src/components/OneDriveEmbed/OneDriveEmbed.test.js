import React from "react";
import { shallow } from "enzyme";
import OneDriveEmbed from "./OneDriveEmbed";

describe("OneDriveEmbed", () => {
    it("formats the mediaUrl", () => {
        const wrapper = shallow(
            <OneDriveEmbed mediaUrl="https://onedrive.live.com/?authkey=AUTHKEY&cid=CID&id=ID" />,
        );
        expect(wrapper.find("Audio").get(0).props.src).toBe("https://onedrive.live.com/download?cid=CID&resid=ID&authkey=AUTHKEY");
    });
});

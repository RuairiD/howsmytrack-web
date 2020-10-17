import React from "react";
import { shallow } from "enzyme";
import DropboxEmbed from "./DropboxEmbed";

describe("DropboxEmbed", () => {
    it("formats the mediaUrl", () => {
        const wrapper = shallow(
            <DropboxEmbed mediaUrl="https://www.dropbox.com/s/trackid/file.wav?dl=0" />,
        );
        expect(wrapper.find("Audio").get(0).props.src).toBe("https://www.dropbox.com/s/trackid/file.wav?raw=1");
    });
});

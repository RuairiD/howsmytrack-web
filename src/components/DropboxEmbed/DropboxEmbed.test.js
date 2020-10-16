import React from "react";
import { mount } from "enzyme";
import DropboxEmbed from "./DropboxEmbed";

describe("DropboxEmbed", () => {
    it("formats the mediaUrl", () => {
        const wrapper = mount(
            <DropboxEmbed mediaUrl="https://www.dropbox.com/s/trackid/file.wav?dl=0" />,
        );
        expect(wrapper.find("Audio").get(0).props.src).toBe("https://www.dropbox.com/s/trackid/file.wav?raw=1");
    });
});

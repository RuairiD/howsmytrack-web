import React from "react";
import { mount } from "enzyme";
import GoogleDriveEmbed from "./GoogleDriveEmbed";

describe("GoogleDriveEmbed", () => {
    it("formats the mediaUrl", () => {
        const wrapper = mount(
            <GoogleDriveEmbed mediaUrl="https://drive.google.com/file/d/trackid/view?usp=sharing" />,
        );
        expect(wrapper.find("Iframe").get(0).props.src).toBe("https://drive.google.com/file/d/trackid/preview?usp=sharing");
    });
});

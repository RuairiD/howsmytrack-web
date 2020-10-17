import React from "react";
import { shallow } from "enzyme";
import SoundcloudEmbed from "./SoundcloudEmbed";

describe("SoundcloudEmbed", () => {
    it("renders a small player with a formatted mediaUrl", () => {
        const wrapper = shallow(
            <SoundcloudEmbed
                mediaUrl="https://soundcloud.com/ruairidx/bruno"
                size="small"
            />,
        );
        expect(wrapper.find("Iframe").get(0).props.src).toBe(
            "https://w.soundcloud.com/player/?url=https://soundcloud.com/ruairidx/bruno&color=%23ff5500&inverse=false&auto_play=false&show_user=true",
        );
        expect(wrapper.find("Iframe").get(0).props.height).toBe(20);
    });

    it("renders with a formatted secret. mediaUrl", () => {
        const wrapper = shallow(
            <SoundcloudEmbed
                mediaUrl="https://soundcloud.com/ruairidx/bruno/s-WTUMOLA0Bsk"
                size="small"
            />,
        );
        expect(wrapper.find("Iframe").get(0).props.src).toBe(
            "https://w.soundcloud.com/player/?url=https://soundcloud.com/ruairidx/bruno/?secret_token=s-WTUMOLA0Bsk&color=%23ff5500&inverse=false&auto_play=false&show_user=true",
        );
        expect(wrapper.find("Iframe").get(0).props.height).toBe(20);
    });

    it("renders a large player", () => {
        const wrapper = shallow(
            <SoundcloudEmbed
                mediaUrl="https://soundcloud.com/ruairidx/bruno"
                size="large"
            />,
        );
        expect(wrapper.find("Iframe").get(0).props.height).toBe(166);
    });
});

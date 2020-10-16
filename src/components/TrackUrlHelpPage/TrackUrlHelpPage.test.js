import React from "react";
import { shallow } from "enzyme";
import TrackUrlHelpPage from "./TrackUrlHelpPage";

describe("TrackUrlHelpPage", () => {
    it("renders a GenericPage containing a TrackUrlHelp", () => {
        const wrapper = shallow(
            <TrackUrlHelpPage isMobile={false} />,
        );

        expect(wrapper.find("GenericPage").get(0).props.title).toBe("How do I get the correct track URL?");
        expect(wrapper.find("GenericPage").get(0).props.isMobile).toBe(false);
        expect(wrapper.find("GenericPage TrackUrlHelp").length).toBe(1);
    });
});

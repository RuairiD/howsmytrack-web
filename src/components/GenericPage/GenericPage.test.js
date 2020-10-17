import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { Div } from "lemon-reset";
import waitForExpect from "wait-for-expect";
import toJson from "enzyme-to-json";
import GenericPage from "./GenericPage";

jest.mock("axios");

describe("GenericPage", () => {
    it("makes a request to refresh the JWT token on pageload", async () => {
        const wrapper = mount(
            <GenericPage
                title="title"
                subTitle="subTitle"
            >
                <Div className="test-children" />
            </GenericPage>,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post.mock.calls.length).toBe(1);
        });
    });

    it("renders a sidebar menu when isMobile is false", () => {
        const wrapper = shallow(
            <GenericPage
                title="title"
                subTitle="subTitle"
            >
                <Div className="test-children" />
            </GenericPage>,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a collapsible menu when isMobile is true", () => {
        const wrapper = shallow(
            <GenericPage
                title="title"
                subTitle="subTitle"
                isMobile
            >
                <Div className="test-children" />
            </GenericPage>,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders no menu or PageHeader when hideMenu is true", () => {
        const wrapper = shallow(
            <GenericPage
                title="title"
                subTitle="subTitle"
                hideMenu
            >
                <Div className="test-children" />
            </GenericPage>,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

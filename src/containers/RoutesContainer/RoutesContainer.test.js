import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import RoutesContainer from "./RoutesContainer";

jest.mock("axios");
jest.mock("react-redux");

// TODO: right now, these tests aren't testing much. Ideally they would
// test that routes passed into MemoryRouter cause the correct *Page components
// to render. They did this pre-codesplitting, but enzyme has trouble mounting with
// lazy-loaded components and so these tests now just check if the routes are correct.
// This achieves coverage, but not much else.
describe("RoutesContainer", () => {
    it("renders the HomePage at /", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/");
    });

    it("renders the FaqPage at /faq", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/faq"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/faq");
    });

    it("renders the TrackUrlHelpPage at /trackurlhelp", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/trackurlhelp"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/trackurlhelp");
    });

    it("renders a FeedbackGroupsPage at /groups", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/groups"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/groups");
    });

    it("renders a FeedbackGroupPage at /group/:id", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/group/1901"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/group/:feedbackGroupId");
    });

    it("renders a UserSettingsPage at /settings", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/settings"]}>
                <RoutesContainer />
            </MemoryRouter>,
        );

        expect(wrapper.find("Route").length).toBe(1);
        expect(wrapper.find("Route").get(0).props.path).toBe("/settings");
    });
});

import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import { act } from "react-dom/test-utils";
import ReactGA from "react-ga";
import waitForExpect from "wait-for-expect";
import MenuBarContent from "./MenuBarContent";

jest.mock("axios");
jest.mock("react-ga");

describe("MenuBarContent", () => {
    beforeEach(() => {
        axios.get.mockRestore();
        axios.post.mockRestore();
        ReactGA.event.mockRestore();
    });

    it("renders logo and MainMenu for non-mobile clients", () => {
        const wrapper = shallow(
            <MenuBarContent />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders a MobileMenu for mobile clients", () => {
        const wrapper = shallow(
            <MenuBarContent isMobile />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("shows a FeedbackRequestModal when newRequest option is clicked", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "newRequest",
        }));

        wrapper.update();
        expect(wrapper.find("FeedbackRequestModal").get(0).props.isVisible).toBeTruthy();
        expect(ReactGA.event.mock.calls[0][0].action).toBe("newRequest");
    });

    it("shows a LoginModal when login option is clicked", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "login",
        }));

        wrapper.update();
        expect(wrapper.find("LoginModal").get(0).props.isVisible).toBeTruthy();
        expect(ReactGA.event.mock.calls[0][0].action).toBe("login");
    });

    it("shows a RegisterModal when register option is clicked", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "register",
        }));

        wrapper.update();
        expect(wrapper.find("RegisterModal").get(0).props.isVisible).toBeTruthy();
        expect(ReactGA.event.mock.calls[0][0].action).toBe("register");
    });

    it("does nothing except log with GA when an option without an associated action is clicked", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "faq",
        }));

        wrapper.update();
        expect(ReactGA.event.mock.calls[0][0].action).toBe("faq");
    });

    it("logs the user out when logout option is clicked", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({}));

        const assign = jest.fn();
        Object.defineProperty(
            window.location,
            "assign",
            {
                value: assign,
                writable: true,
                configurable: true,
            },
        );

        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "logout",
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.get).toHaveBeenCalled();
            expect(ReactGA.event.mock.calls[0][0].action).toBe("logout");
            expect(assign).toHaveBeenCalled();
            expect(assign.mock.calls[0][0]).toBe("/");
        });
    });

    it("resets the JWT cookie if userDetails request returns nothing", async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                data: {
                    userDetails: null,
                },
            },
        });
        axios.get.mockImplementationOnce(() => Promise.resolve({}));

        const wrapper = mount(
            <MenuBarContent />,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toHaveBeenCalled();
            expect(axios.get).toHaveBeenCalled();
        });
    });

    it("passes user details as props if userDetails returns them", async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                data: {
                    userDetails: {
                        username: "username",
                        rating: 4.321,
                        notifications: 2,
                    },
                },
            },
        });

        const wrapper = mount(
            <MenuBarContent />,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toHaveBeenCalled();
            expect(wrapper.find("MainMenu").get(0).props.username).toBe("username");
            expect(wrapper.find("MainMenu").get(0).props.rating).toBe(4.321);
            expect(wrapper.find("MainMenu").get(0).props.notifications).toBe(2);
            expect(ReactGA.set.mock.calls[0][0].username).toBe("username");
        });
    });

    it("hides FeedbackRequestModal when it is dismissed", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "newRequest",
        }));
        act(() => wrapper.find("FeedbackRequestModal").get(0).props.onCancel());

        expect(wrapper.find("FeedbackRequestModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("hides LoginModal when it is dismissed", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "login",
        }));
        act(() => wrapper.find("LoginModal").get(0).props.onCancel());

        expect(wrapper.find("LoginModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("hides RegisterModal when it is dismissed", () => {
        const wrapper = mount(
            <MenuBarContent />,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "register",
        }));
        act(() => wrapper.find("RegisterModal").get(0).props.onCancel());

        expect(wrapper.find("RegisterModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("keeps track of menu collapsed state on mobile clients", () => {
        const wrapper = mount(
            <MenuBarContent isMobile />,
        );

        act(() => wrapper.find("MobileMenu").get(0).props.onCollapseChange([]));
        wrapper.update();
        expect(wrapper.find("MobileMenu").get(0).props.mobileMenuCollapsed).toBeTruthy();

        act(() => wrapper.find("MobileMenu").get(0).props.onCollapseChange([1]));
        wrapper.update();
        expect(wrapper.find("MobileMenu").get(0).props.mobileMenuCollapsed).not.toBeTruthy();
    });
});

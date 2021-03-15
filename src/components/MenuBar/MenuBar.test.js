import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import ReactGA from "react-ga";
import waitForExpect from "wait-for-expect";
import MenuBar from "./MenuBar";

jest.mock("axios");
jest.mock("react-ga");

const mockStore = configureStore();
const defaultStore = mockStore({
    userDetails: {
        data: null,
        isLoading: true,
    },
});

describe("MenuBar", () => {
    beforeEach(() => {
        axios.get.mockRestore();
        axios.post.mockRestore();
        ReactGA.event.mockRestore();
    });

    it("shows a FeedbackRequestModal when newRequest option is clicked", () => {
        const wrapper = mount(
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
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
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
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
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
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
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
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
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
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

    it("resets the JWT cookie if userDetails request returns nothing", () => {
        const store = mockStore({
            userDetails: {
                data: null,
                isLoading: false,
            },
        });
        axios.get.mockImplementationOnce(() => Promise.resolve({}));

        mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>,
        );

        expect(axios.get).toHaveBeenCalled();
    });

    it("passes user details as props if userDetails returns them", () => {
        const store = mockStore({
            userDetails: {
                data: {
                    username: "username",
                    rating: 4.321,
                    notifications: 2,
                },
                isLoading: false,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>,
        );

        expect(wrapper.find("MainMenu").get(0).props.username).toBe("username");
        expect(wrapper.find("MainMenu").get(0).props.rating).toBe(4.321);
        expect(wrapper.find("MainMenu").get(0).props.notifications).toBe(2);
        expect(ReactGA.set.mock.calls[0][0].username).toBe("username");
    });

    it("hides FeedbackRequestModal when it is dismissed", () => {
        const wrapper = mount(
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "newRequest",
        }));
        act(() => wrapper.find("FeedbackRequestModal").get(0).props.onCancel());

        expect(wrapper.find("FeedbackRequestModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("hides LoginModal when it is dismissed", () => {
        const wrapper = mount(
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "login",
        }));
        act(() => wrapper.find("LoginModal").get(0).props.onCancel());

        expect(wrapper.find("LoginModal").get(0).props.isVisible).not.toBeTruthy();
    });

    it("hides RegisterModal when it is dismissed", () => {
        const wrapper = mount(
            <Provider store={defaultStore}>
                <MenuBar />
            </Provider>,
        );

        act(() => wrapper.find("MainMenu").get(0).props.onMenuClick({
            key: "register",
        }));
        act(() => wrapper.find("RegisterModal").get(0).props.onCancel());

        expect(wrapper.find("RegisterModal").get(0).props.isVisible).not.toBeTruthy();
    });
});

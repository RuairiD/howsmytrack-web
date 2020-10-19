import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import ReactGA from "react-ga";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import UnwrappedLoginFormContainer from "./UnwrappedLoginFormContainer";

jest.mock("axios");
jest.mock("react-ga");

const mockValidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        username: "username",
        password: "password",
    })),
};

const mockInvalidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(true)),
};

describe("UnwrappedLoginFormContainer", () => {
    afterEach(() => {
        axios.post.mockRestore();
        ReactGA.event.mockRestore();
    });

    it.only("renders a success indicator upon successful login, logs the submission and success and refreshes the page", async () => {
        axios.post.mockReturnValue({
            errors: null,
        });

        const reload = jest.fn();
        Object.defineProperty(
            window.location,
            "reload",
            {
                value: reload,
                writable: true,
                configurable: true,
            },
        );

        const wrapper = mount(
            <UnwrappedLoginFormContainer
                form={mockValidForm}
            />,
        );

        expect(wrapper.find("UnwrappedLoginForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedLoginForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(1);
            expect(wrapper.find("UnwrappedLoginForm").length).toBe(0);
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("success");
        expect(reload.mock.calls.length).toBe(1);
    });

    it.only("continues to render the form upon unsuccessful login and logs the submission and error", async () => {
        axios.post.mockReturnValue({
            errors: ["error"],
        });

        const wrapper = mount(
            <UnwrappedLoginFormContainer
                form={mockValidForm}
            />,
        );

        expect(wrapper.find("UnwrappedLoginForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedLoginForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("UnwrappedLoginForm").length).toBe(1);
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("error");
    });

    it.only("does not attempt to post the form if it has invalid fields", async () => {
        const wrapper = mount(
            <UnwrappedLoginFormContainer
                form={mockInvalidForm}
            />,
        );

        expect(wrapper.find("UnwrappedLoginForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedLoginForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("UnwrappedLoginForm").length).toBe(1);
        });

        expect(axios.post.mock.calls.length).toBe(0);
        expect(ReactGA.event.mock.calls.length).toBe(1);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
    });
});

import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import ReactGA from "react-ga";
import waitForExpect from "wait-for-expect";
import { act } from "react-dom/test-utils";
import UnwrappedRegisterFormController from "./UnwrappedRegisterFormController";

jest.mock("axios");
jest.mock("react-ga");

const mockValidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(false, {
        username: "username",
        password: "password",
        passwordRepeat: "password",
    })),
};

const mockInvalidForm = {
    getFieldDecorator: jest.fn(() => (c) => c),
    validateFieldsAndScroll: jest.fn((afterValidation) => afterValidation(true)),
};

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

describe("UnwrappedRegisterFormController", () => {
    afterEach(() => {
        axios.post.mockRestore();
        ReactGA.event.mockRestore();
        reload.mockClear();
    });

    it("renders a success indicator upon successful registration, and logs the submission and success", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    registerUser: {
                        success: true,
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <UnwrappedRegisterFormController
                form={mockValidForm}
            />,
        );

        expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedRegisterForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(1);
            expect(wrapper.find("UnwrappedRegisterForm").length).toBe(0);
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("success");
    });

    it("logs the user in after successful registration and reloads the page", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    registerUser: {
                        success: true,
                        error: null,
                    },
                },
            },
        });

        const wrapper = mount(
            <UnwrappedRegisterFormController
                form={mockValidForm}
            />,
        );

        expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedRegisterForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(1);
            expect(wrapper.find("UnwrappedRegisterForm").length).toBe(0);
        });

        expect(axios.post.mock.calls.length).toBe(2);
        expect(reload.mock.calls.length).toBe(1);
    });

    it("continues to render the form upon unsuccessful registration and logs the submission and error", async () => {
        axios.post.mockResolvedValue({
            data: {
                data: {
                    registerUser: {
                        success: false,
                        error: "error",
                    },
                },
            },
        });

        const wrapper = mount(
            <UnwrappedRegisterFormController
                form={mockValidForm}
            />,
        );

        expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedRegisterForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        });

        expect(ReactGA.event.mock.calls.length).toBe(3);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
        expect(ReactGA.event.mock.calls[1][0].action).toBe("submit");
        expect(ReactGA.event.mock.calls[2][0].action).toBe("error");
    });

    it("does not attempt to post the form if it has invalid fields", async () => {
        const wrapper = mount(
            <UnwrappedRegisterFormController
                form={mockInvalidForm}
            />,
        );

        expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        await act(async () => wrapper.find("UnwrappedRegisterForm").get(0).props.onSubmit({
            preventDefault: jest.fn(),
        }));

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("Result").length).toBe(0);
            expect(wrapper.find("UnwrappedRegisterForm").length).toBe(1);
        });

        expect(axios.post.mock.calls.length).toBe(0);
        expect(ReactGA.event.mock.calls.length).toBe(1);
        expect(ReactGA.event.mock.calls[0][0].action).toBe("view");
    });
});

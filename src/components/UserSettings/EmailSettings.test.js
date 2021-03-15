import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { Modal } from "antd";
import waitForExpect from "wait-for-expect";
import EmailSettings from "./EmailSettings";

const modalConfirmSpy = jest.spyOn(Modal, "confirm");

jest.mock("axios");
jest.mock("../../apiRoot", () => "http://localhost:8000");

describe("EmailSettings", () => {
    afterEach(() => {
        axios.get.mockRestore();
        axios.post.mockRestore();
        modalConfirmSpy.mockClear();
    });

    it("renders an editable text field with the user's current email address", () => {
        const wrapper = shallow(
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("doesn't do anything if user attempts to change email address without actually changing its value", () => {
        const wrapper = mount(
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        act(() => wrapper.find("Text.email").get(0).props.editable.onStart());
        act(() => wrapper.find("Text.email").get(0).props.editable.onChange(
            "alemac@brightonandhovealbion.com",
        ));

        expect(modalConfirmSpy).not.toHaveBeenCalled();

        wrapper.unmount();
    });

    it("shows a confirmation modal when changing the user's email address", () => {
        const wrapper = mount(
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        act(() => wrapper.find("Text.email").get(0).props.editable.onStart());
        act(() => wrapper.find("Text.email").get(0).props.editable.onChange(
            "ltrossard@brightonandhovealbion.com",
        ));

        expect(modalConfirmSpy).toHaveBeenCalled();
        expect(modalConfirmSpy.mock.calls.length).toBe(1);

        wrapper.unmount();
    });

    it("doesn't do anything if user dismisses the confirmation modal", async () => {
        const wrapper = mount(
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        act(() => wrapper.find("Text.email").get(0).props.editable.onStart());
        act(() => wrapper.find("Text.email").get(0).props.editable.onChange(
            "ltrossard@brightonandhovealbion.com",
        ));

        await act(async () => modalConfirmSpy.mock.calls[0][0].onCancel());

        expect(axios.post).not.toHaveBeenCalled();

        wrapper.unmount();
    });

    it("submits a request to change the email address if the user confirms the modal and redirects the user to the home page to re-login", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    updateEmail: {
                        success: true,
                        error: false,
                    },
                },
            },
        }));
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
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        act(() => wrapper.find("Text.email").get(0).props.editable.onStart());
        act(() => wrapper.find("Text.email").get(0).props.editable.onChange(
            "ltrossard@brightonandhovealbion.com",
        ));

        await act(async () => modalConfirmSpy.mock.calls[0][0].onOk());

        expect(axios.post).toHaveBeenCalled();
        expect(wrapper.text().includes("Saved")).toBeTruthy();

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.get).toHaveBeenCalled();
            expect(assign).toHaveBeenCalled();
            expect(assign.mock.calls[0][0]).toBe("/");
        });

        wrapper.unmount();
    });

    it("shows an error if one is returned e.g. if the email is already in use", async () => {
        const error = "email already in use";
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    updateEmail: {
                        success: false,
                        error,
                    },
                },
            },
        }));

        const wrapper = mount(
            <EmailSettings
                currentEmail="alemac@brightonandhovealbion.com"
            />,
        );

        act(() => wrapper.find("Text.email").get(0).props.editable.onStart());
        act(() => wrapper.find("Text.email").get(0).props.editable.onChange(
            "ltrossard@brightonandhovealbion.com",
        ));

        await act(async () => modalConfirmSpy.mock.calls[0][0].onOk());

        expect(axios.post).toHaveBeenCalled();
        expect(wrapper.text().includes(error)).toBeTruthy();

        wrapper.unmount();
    });
});

import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import axios from "axios";
import { act } from "react-dom/test-utils";
import waitForExpect from "wait-for-expect";
import EmailRemindersPreference from "./EmailRemindersPreference";

jest.mock("axios");

describe("EmailRemindersPreference", () => {
    afterEach(() => {
        axios.post.mockRestore();
    });

    it("renders a labeled Switch", () => {
        const wrapper = shallow(
            <EmailRemindersPreference
                currentSendReminderEmails
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("submits a request to change the email reminders preference and shows success if the user toggles the switch", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    updateSendReminderEmails: {
                        success: true,
                    },
                },
            },
        }));

        const wrapper = mount(
            <EmailRemindersPreference
                currentSendReminderEmails
            />,
        );

        await act(async () => wrapper.find("Switch").get(0).props.onChange(false));

        expect(axios.post).toHaveBeenCalled();

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.text().includes("Saved")).toBeTruthy();
        });
    });

    it("does not show success indicator if request is unsuccessful.", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    updateSendReminderEmails: {
                        success: false,
                    },
                },
            },
        }));

        const wrapper = mount(
            <EmailRemindersPreference
                currentSendReminderEmails
            />,
        );

        await act(async () => wrapper.find("Switch").get(0).props.onChange(true));

        expect(axios.post).toHaveBeenCalled();

        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.text().includes("Saved")).not.toBeTruthy();
        });
    });
});

import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import HomePage from "./HomePage";

jest.mock("axios");

describe("HomePage", () => {
    afterEach(() => {
        axios.post.mockRestore();
    });

    it("renders a LoadingSpinner while loading", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    userDetails: {
                        username: "ybissouma@brightonandhovealbion.com",
                    },
                },
            },
        }));

        const wrapper = mount(
            <HomePage />,
        );

        expect(axios.post).toHaveBeenCalled();
        // Loading spinner will be present before POST request resolves.
        expect(wrapper.find("LoadingSpinner").length).toBe(1);
    });

    it("renders a FeedbackGroupsPage for logged in users", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    userDetails: {
                        username: "ybissouma@brightonandhovealbion.com",
                    },
                },
            },
        }));

        const wrapper = mount(
            <HomePage />,
        );

        expect(axios.post).toHaveBeenCalled();
        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("FeedbackGroupsPage").length).toBe(1);
        });
    });

    it("renders a LandingPitch and Faq for logged out users", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({
            data: {
                data: {
                    userDetails: {
                        username: null,
                    },
                },
            },
        }));

        const wrapper = mount(
            <HomePage />,
        );

        expect(axios.post).toHaveBeenCalled();
        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find("LandingPitch").length).toBe(1);
            expect(wrapper.find("Faq").length).toBe(1);
        });
    });
});

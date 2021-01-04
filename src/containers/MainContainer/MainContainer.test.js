import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import waitForExpect from "wait-for-expect";
import { MemoryRouter } from "react-router-dom";

import MainContainer from "./MainContainer";
import store from "../../store";

jest.mock("axios");
jest.mock("react-redux");

describe("MainContainer", () => {
    beforeEach(() => {
        axios.post.mockRestore();
        axios.post.mockResolvedValue({
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
    });

    it("fetches userDetails on pageload and stores the result with Redux", async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/"]}>
                <MainContainer />
            </MemoryRouter>,
        );

        await waitForExpect(() => {
            wrapper.update();
            expect(axios.post).toHaveBeenCalled();
            expect(store.getState()).toEqual({
                userDetails: {
                    data: {
                        username: "username",
                        rating: 4.321,
                        notifications: 2,
                    },
                    isLoading: false,
                },
            });
        });
    });
});

import React from "react";
import { shallow } from "enzyme";
import ReactGA from "react-ga";
import App from "./App";

jest.mock("react-ga");

describe("App", () => {
    afterEach(() => {
        ReactGA.pageview.mockRestore();
    });

    it("renders MainContainer, Redux and Query providers, and logs pageview with GA", async () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find("MainContainer").length).toBe(1);
        expect(wrapper.find("HttpsRedirect").length).toBe(1);
        expect(wrapper.find("Provider").length).toBe(1);
        expect(wrapper.find("ReactQueryCacheProvider").length).toBe(1);

        expect(ReactGA.pageview.mock.calls.length).toBe(1);
        expect(ReactGA.pageview.mock.calls[0][0]).toBe("/");
    });
});

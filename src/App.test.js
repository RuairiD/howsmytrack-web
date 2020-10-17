import React from "react";
import { shallow } from "enzyme";
import ReactGA from "react-ga";
import App from "./App";

jest.mock("react-ga");

describe("App", () => {
    afterEach(() => {
        ReactGA.pageview.mockRestore();
    });

    it("renders router and logs pageview with GA", async () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find("Routes").length).toBe(1);
        expect(wrapper.find("HttpsRedirect").length).toBe(1);
        expect(wrapper.find("ReactQueryCacheProvider").length).toBe(1);

        expect(ReactGA.pageview.mock.calls.length).toBe(1);
        expect(ReactGA.pageview.mock.calls[0][0]).toBe("/");
    });
});

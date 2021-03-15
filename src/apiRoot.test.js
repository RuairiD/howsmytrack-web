import apiRoot from "./apiRoot";

describe("apiRoot", () => {
    describe("returns localhost if no environment variable set", () => {
        it("returns localhost if no environment variable set", () => {
            expect(apiRoot()).toBe("http://localhost:8000");
        });
    });

    describe("returns API_ROOT environment variable, if set", () => {
        it("returns API_ROOT environment variable, if set", () => {
            process.env.API_ROOT = "API_ROOT";
            expect(apiRoot()).toBe("API_ROOT");
        });
    });
});

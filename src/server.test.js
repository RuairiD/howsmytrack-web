const request = require("supertest");
const server = require("./server");

describe("loading express", () => {
    afterAll((done) => {
        server.close();
        done();
    });

    it("handles / requests", (done) => {
        request(server).get("/").set("x-forwarded-proto", "https").expect(200, done);
    });
    it("handles page requests", (done) => {
        request(server).get("/faq").set("x-forwarded-proto", "https").expect(200, done);
    });
    it("handles static file requests", (done) => {
        request(server).get("/favicon.png").set("x-forwarded-proto", "https").expect(200, done);
    });
    it("redirects non-HTTPS requests", (done) => {
        request(server).get("/").set("x-forwarded-proto", "http").expect(302, done);
    });
});

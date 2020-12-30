import userDetailsReducer, { setData, setIsLoading } from "./userDetailsSlice";

describe("userDetailsSlice", () => {
    it("handles updating userDetails data", async () => {
        const initialState = {
            data: null,
            isLoading: false,
        };
        const data = {
            username: "nmaupay@brightonandhovealbion.com",
        };
        expect(userDetailsReducer(initialState, setData(data))).toEqual({
            data,
            isLoading: false,
        });
    });
    it("handles updating userDetails data", async () => {
        const initialState = {
            data: null,
            isLoading: false,
        };
        const isLoading = true;
        expect(userDetailsReducer(initialState, setIsLoading(isLoading))).toEqual({
            data: null,
            isLoading,
        });
    });
});

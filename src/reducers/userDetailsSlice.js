/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    // isLoading is used to show spinners/loading indicators in
    // dependent components while initial request resolves, while
    // also mimicing the useQuery behaviour used elsewhere.
    isLoading: false,
};

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const { setData, setIsLoading } = userDetailsSlice.actions;

export const selectUserDetailsData = (state) => state.userDetails.data;
export const selectUserDetailsIsLoading = (state) => state.userDetails.isLoading;

export default userDetailsSlice.reducer;

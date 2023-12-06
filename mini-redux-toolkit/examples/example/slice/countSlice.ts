import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 1,
    },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
});

export const counterSliceName = counterSlice.name;
export const { increment, decrement } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

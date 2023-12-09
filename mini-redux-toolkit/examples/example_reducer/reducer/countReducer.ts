import { createReducer } from "@reduxjs/toolkit";
import { decrement, increment } from "../action/countAction";

export const initialCounterState = { count: 1 };

export const counterReducer = createReducer(initialCounterState, (builder) => {
    builder
        .addCase(increment, (state) => ({
            count: state.count + 1,
        }))
        .addCase(decrement, (state) => ({
            count: state.count - 1,
        }));
});

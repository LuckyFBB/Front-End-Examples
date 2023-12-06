import { createReducer } from "@reduxjs/toolkit";
import { updateAge, updateName } from "../action/userAction";

export const initialUserState = { name: "shuangxu", age: 19 };

export const userReducer = createReducer(initialUserState, (builder) => {
    builder.addCase(updateAge, (state, action) => {
        state.age = action.payload.age;
    });
    builder.addCase(updateName, (state, action) => {
        state.name = action.payload.name;
    });
});

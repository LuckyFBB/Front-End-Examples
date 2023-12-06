import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        age: 22,
        name: "shuangxu",
    },
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        updateAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
    },
});

export const userSliceName = userSlice.name;
export const { updateAge, updateName } = userSlice.actions;
export const userReducer = userSlice.reducer;

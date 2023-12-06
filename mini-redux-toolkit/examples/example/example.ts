import { configureStore } from "@reduxjs/toolkit";
import {
    counterReducer,
    counterSliceName,
    decrement,
    increment,
} from "./slice/countSlice";
import {
    updateAge,
    updateName,
    userReducer,
    userSliceName,
} from "./slice/userSlice";

const store = configureStore({
    reducer: {
        [counterSliceName]: counterReducer,
        [userSliceName]: userReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});

store.dispatch(increment());
store.dispatch(updateName("FBB"));
store.dispatch(updateAge(18));
store.dispatch(decrement());

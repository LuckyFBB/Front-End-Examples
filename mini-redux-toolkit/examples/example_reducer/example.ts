import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducer/countReducer";
import { decrement, increment } from "./action/countAction";
import { updateAge, updateName } from "./action/userAction";
import { userReducer } from "./reducer/userReducer";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});

store.dispatch(increment());
store.dispatch(updateName({ name: "FBB" }));
store.dispatch(updateAge({ age: 18 }));
store.dispatch(decrement());

// store.dispatch(updateName("FBB"));
// store.dispatch(updateAge(18));

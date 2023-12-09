// import { configureStore } from "./code/configureStore";
// import { createAction } from "./code/createAction";
// import { createReducer } from "./code/createReducer";

// const increment = createAction("counter/increment");
// const decrement = createAction("counter/decrement");

// const updateName = createAction("user/UPDATE_NAME");
// const updateAge = createAction("user/UPDATE_AGE");

// const initialCounterState = { count: 1 };
// const counterReducer = createReducer(initialCounterState, (builder) => {
//     builder
//         .addCase(increment, (state: any) => ({
//             count: state.count + 1,
//         }))
//         .addCase(decrement, (state: any) => ({
//             count: state.count - 1,
//         }));
// });

// const initialUserState = { name: "shuangxu", age: 19 };

// const userReducer = createReducer(initialUserState, (builder) => {
//     builder
//         .addCase(updateAge, (state: any, action: any) => {
//             state.age = action.payload.age;
//         })
//         .addCase(updateName, (state: any, action: any) => {
//             state.name = action.payload.name;
//         });
// });

// const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         user: userReducer,
//     },
// });

// store.subscribe(() => {
//     const state = store.getState();
//     console.log(state);
// });

// store.dispatch(increment());
// store.dispatch(updateName({ name: "FBB" }));
// store.dispatch(updateAge({ age: 18 }));
// store.dispatch(decrement());

import { configureStore } from "./code/configureStore";
import createSlice from "./code/createSlice";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 1,
    },
    reducers: {
        increment: (state: any) => {
            state.count += 1;
        },
        decrement: (state: any) => {
            state.count -= 1;
        },
    },
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        age: 22,
        name: "shuangxu",
    },
    reducers: {
        updateName: (state: any, action: any) => {
            state.name = action.payload;
        },
        updateAge: (state: any, action: any) => {
            state.age = action.payload;
        },
    },
});
const counterSliceName = counterSlice.name;
const { increment, decrement } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

const userSliceName = userSlice.name;
const { updateAge, updateName } = userSlice.actions;
const userReducer = userSlice.reducer;
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

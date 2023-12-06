import { createStore } from "redux";
import { reducers } from "./reducer";
import { updateName, updateAge } from "./action/userAction";
import { increment, decrement } from "./action/countAction";

const store = createStore(reducers);
store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});

store.dispatch(updateName("FBB"));
store.dispatch(updateAge(18));
store.dispatch(increment());
store.dispatch(decrement());

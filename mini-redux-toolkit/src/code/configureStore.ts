import { combineReducers, createStore } from "redux";

export function configureStore({ reducer }: any) {
    const rootReducer = combineReducers(reducer);
    const store = createStore(rootReducer);
    return store;
}

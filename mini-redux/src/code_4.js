// 拆分 reducer
const createStore = (reducer, initialState) => {
    let state = initialState;
    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((fn) => fn !== listener);
        };
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener?.();
        });
    };

    const getState = () => state;

    return {
        subscribe,
        dispatch,
        getState,
    };
};

const initialState = {
    user: { name: "shuangxu", age: 19 },
    counter: { count: 1 },
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_NAME":
            return {
                ...state,
                name: action.name,
            };
        case "UPDATE_AGE":
            return {
                ...state,
                age: action.age,
            };
        default:
            return state;
    }
};

const counterReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1,
            };
        case "DECREMENT":
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

const combineReducers = (reducers) => (state, action) => {
    const newState = {};
    for (const key in reducers) {
        const reducer = reducers[key];
        const preStateForKey = state[key];
        const nextStateForKey = reducer(preStateForKey, action);
        newState[key] = nextStateForKey;
    }
    return newState;
};

const reducers = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

const store = createStore(reducers, initialState);
store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count, state.user.name, state.user.age);
});
store.dispatch({ type: "UPDATE_NAME", name: "FBB" });
store.dispatch({ type: "UPDATE_AGE", age: "28" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

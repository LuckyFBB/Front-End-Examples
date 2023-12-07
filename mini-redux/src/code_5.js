// 拆分 state
const initialUserState = { name: "shuangxu", age: 19 };

const userReducer = (state = initialUserState, action) => {
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

const initialCounterState = { count: 1 };

const counterReducer = (state = initialCounterState, action) => {
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

const createStore = (reducer, initialState = {}) => {
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

    dispatch({ type: Symbol() });

    return {
        subscribe,
        dispatch,
        getState,
    };
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

const store = createStore(reducers);
store.subscribe(() => {
    const state = store.getState();
    console.log(state);
});
store.dispatch({ type: "UPDATE_NAME", name: "FBB" });
store.dispatch({ type: "UPDATE_AGE", age: "28" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

// 通过 action 约束更新状态
const createStore = (plan, initialState) => {
    let state = initialState;
    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((fn) => fn !== listener);
        };
    };

    const changeState = (action) => {
        state = plan(state, action);
        listeners.forEach((listener) => {
            listener?.();
        });
    };

    const getState = () => state;

    return {
        subscribe,
        changeState,
        getState,
    };
};

const plan = (state, action) => {
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

const { getState, changeState, subscribe } = createStore(plan, {
    name: "shuangxu",
    age: 19,
});

subscribe(() => console.log(getState().name, getState().age));

changeState({ type: "UPDATE_NAME", name: "FBB" });
changeState({ type: "UPDATE_AGE", age: "28" });
changeState({ type: "UPDATE_SEX", sex: "female" });

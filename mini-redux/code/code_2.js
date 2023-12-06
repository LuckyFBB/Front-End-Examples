// 更改/监听状态 demo
const createStore = (initialState) => {
    let state = initialState;
    let listeners  = [];

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((fn) => fn !== listener);
        };
    };

    const changeState = (newState) => {
        state = { ...state, ...newState };
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

const { getState, changeState, subscribe } = createStore({
    name: "shuangxu",
    age: 19,
});

subscribe(() => console.log(getState().name, getState().age));

changeState({ name: "FBB" });
changeState({ age: 26 });

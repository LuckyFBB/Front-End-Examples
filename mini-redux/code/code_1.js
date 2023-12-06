const state = {
    name: "shuangxu",
};
const listeners = [];

const subscribe = (listener) => {
    listeners.push(listener);
};

const changeName = (name) => {
    state.name = name;
    listeners.forEach((listener) => {
        listener?.();
    });
};

subscribe(() => console.log(state.name));

changeName("FBB");
changeName("LuckyFBB");

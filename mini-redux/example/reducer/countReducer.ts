const initialCounterState = { count: 1 };

export const countReducer = (
    state = initialCounterState,
    action: { type: string }
) => {
    switch (action.type) {
        case "count/INCREMENT":
            return { ...state, count: state.count + 1 };
        case "count/DECREMENT":
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

const initialUserState = { name: "shuangxu", age: 19 };

export const userReducer = (
    state = initialUserState,
    action: { type: string; [propName: string]: any }
) => {
    switch (action.type) {
        case "user/UPDATE_NAME":
            return { ...state, name: action.name };
        case "user/UPDATE_AGE":
            return { ...state, age: action.age };
        default:
            return state;
    }
};

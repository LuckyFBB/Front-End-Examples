import userActions from "../action/userAction";
const initialUser = {
    id: 0,
    userName: "未登录",
    isRoot: false
};

export function user(state = initialUser, action: { type: any; data: any; }) {
    switch (action.type) {
        case userActions.UPDATE_USER: {
            if (action.data !== null) {
                return { ...state, ...action.data };
            }
            return state;
        }
        default:
            return state;
    }
}

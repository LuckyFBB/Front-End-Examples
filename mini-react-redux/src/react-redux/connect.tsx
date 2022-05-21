import { useContext, useReducer } from "react";
import { ReactReduxContext } from "./ReactReduxContext";

export const connect = (mapStateToProps: { (state: any): { name: any; }; (arg0: any): any; }, mapDispatchToProps: { (dispatch: any): { updateName: () => any; }; (arg0: any): any; }) => (
    WrappedComponent: any
) => (props: { [x: string]: any; }) => {
    const { ...wrapperProps } = props;
    const context = useContext(ReactReduxContext);
    const { store } = context as any; // 解构出store
    const state = store.getState(); // 拿到state
    //使用useReducer得到一个强制更新函数
    const [, forceComponentUpdateDispatch] = useReducer((count) => count + 1, 0);
    // 订阅state的变化，当state变化的时候执行回调
    store.subscribe(() => {
        forceComponentUpdateDispatch();
    });
    // 执行mapStateToProps和mapDispatchToProps
    const stateProps = mapStateToProps?.(state);
    const dispatchProps = mapDispatchToProps?.(store.dispatch);
    // 组装最终的props
    const actualChildProps = Object.assign(
        {},
        stateProps,
        dispatchProps,
        wrapperProps
    );
    return <WrappedComponent {...actualChildProps} />;
};

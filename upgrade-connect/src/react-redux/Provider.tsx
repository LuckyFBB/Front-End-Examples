import { useEffect, useMemo } from "react";
import { ReactReduxContext } from "./ReactReduxContext";
import { Subscription } from "./Subscription";

export const Provider = (props: any) => {
    const { store, children } = props;

    // 传给子组件的context{store,subscription}
    const contextValue = useMemo(() => {
        const subscription = new Subscription(store);
        // 注册回调函数，通知子组件
        subscription.onStateChange = subscription.notifyNestedSubs;
        return { store, subscription };
    }, [store]);

    const previousState = useMemo(() => store.getState(), [store]);

    useEffect(() => {
        const { subscription } = contextValue;
        // 添加监听者
        subscription.trySubscribe();
        // 如果state发生改变，通知监听者
        if (previousState !== store.getState()) {
            subscription.notifyNestedSubs();
        }
    }, [contextValue, previousState, store]);

    return (
        <ReactReduxContext.Provider value={contextValue as any}>
            {children}
        </ReactReduxContext.Provider>
    );
};

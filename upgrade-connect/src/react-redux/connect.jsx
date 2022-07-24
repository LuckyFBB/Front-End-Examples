import { useContext, useReducer, useRef, useLayoutEffect } from "react";
import isEqual from "./isEqual";
import { ReactReduxContext } from "./ReactReduxContext";
import { Subscription } from "./Subscription";

export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const { ...wrapperProps } = props;
  const context = useContext(ReactReduxContext);
  const { store, subscription: parentSub } = context; // 解构出store
  const subscription = new Subscription(store, parentSub); // 创建当前组件的subscription
  // 保存上一次的值
  const lastChildProps = useRef();
  //使用useReducer得到一个强制更新函数
  const [, forceComponentUpdateDispatch] = useReducer((count) => count + 1, 0);

  // 获取传递给组件的props
  const childPropsSelector = (store, wrapperProps) => {
    const state = store.getState();
    // 执行mapStateToProps和mapDispatchToProps
    const stateProps = mapStateToProps?.(state);
    const dispatchProps = mapDispatchToProps?.(store.dispatch);
    return Object.assign({}, stateProps, dispatchProps, wrapperProps);
  };

  //对比state，处理回调
  const compareStateForUpdate = () => {
    const newChildProps = childPropsSelector(store, wrapperProps);
    if (isEqual(newChildProps, lastChildProps.current)) return;
    // lastChildProps.current = newChildProps;
    forceComponentUpdateDispatch();
    subscription.notifyNestedSubs();
  };

  const actualChildProps = childPropsSelector(store, wrapperProps);

  useLayoutEffect(() => {
    lastChildProps.current = actualChildProps;
  }, [actualChildProps]);

  // 使用subscription注册回调
  subscription.onStateChange = compareStateForUpdate;
  subscription.trySubscribe();

  //重写contextValue，把自己的subscription传递下去
  const overWriteContextValue = {
    ...context,
    subscription
  };

  return (
    <ReactReduxContext.Provider value={overWriteContextValue}>
      <WrappedComponent {...actualChildProps} />
    </ReactReduxContext.Provider>
  );
};

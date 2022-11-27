import { ReactReduxContext } from "./ReactReduxContext";

export const Provider = (props: { store: any; children?: React.ReactNode; context?: any; }) => {
    const { store, children, context } = props;
    const contextValue = { store };
    const Context = context || ReactReduxContext;
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

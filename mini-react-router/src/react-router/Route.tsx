import React from "react";
import RouterContext from "./RouterContext";
import pathToRegExp from "path-to-regexp";
interface IProps {
    exact?: boolean;
    path: string;
    component?: Function;
    render?: Function;
    children?: React.ReactNode;
}

class Route extends React.Component<IProps> {
    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    const pathname = context.location.pathname;
                    const {
                        path,
                        component: Component,
                        exact = false,
                        render,
                        children
                    } = this.props;
                    const props = { ...context };
                    const reg = pathToRegExp(path, [], { end: exact });
                    const match = reg.test(pathname);
                    if (!match) return null;
                    if (Component) return <Component {...props} />;
                    if (render) return render();
                    if (children) return children;
                }}
            </RouterContext.Consumer>
        );
    }
}
export default Route
import React from "react";

import pathToRegExp from "path-to-regexp";
import { useLocation } from "./Hooks";
interface IProps {
    exact?: boolean;
    path: string;
    component?: Function;
    render?: Function;
    children?: React.ReactNode;
}

function Route(props: IProps) {
    const location = useLocation();
    const { pathname } = location;
    const {
        path,
        component: Component,
        exact = false,
        render,
        children,
    } = props;
    const reg = pathToRegExp(path, [], { end: exact });
    const match = reg.test(pathname);
    if (!match) return null;
    if (Component) return <Component {...{ location }} />;
    if (render) return render();
    if (children) return children;
}
export default Route;

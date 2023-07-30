import React from "react";
import { useLocation } from "./Hooks";
import { RouteContext } from "./Context";

export const Routes = ({ children }) => {
    return useRoutes(createRoutesFromChildren(children));
};

const useRoutes = (routes) => {
    let location = useLocation();
    let { matches: parentMatches } = React.useContext(RouteContext);
    const matches = matchRoutes(routes, location);
    const renderedMatches = _renderMatches(matches, parentMatches);

    return renderedMatches;
};

// 返回的是 React.Element，渲染所有的 matches 对象
const _renderMatches = (matches, parentMatches = []) => {
    let renderedMatches = matches;
    return renderedMatches.reduceRight((outlet, match, index) => {
        let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
        const getChildren = () => {
            let children;
            if (match.route.Component) {
                children = <match.route.Component />;
            } else if (match.route.element) {
                children = match.route.element;
            } else {
                children = outlet;
            }
            return (
                <RenderedRoute
                    routeContext={{
                        outlet,
                        matches,
                    }}
                    children={children}
                />
            );
        };
        return getChildren();
    }, null);
};

function RenderedRoute({ routeContext, children }) {
    return (
        <RouteContext.Provider value={routeContext}>
            {children}
        </RouteContext.Provider>
    );
}

const matchRoutes = (routes, location) => {
    const branches = flattenRoutes(routes);
    let matches = null;
    const pathname = location.pathname;
    for (let i = 0; matches == null && i < branches.length; ++i) {
        matches = matchRouteBranch(branches[i], pathname);
    }
    return matches;
};

const matchRouteBranch = (branch, pathname) => {
    const { routesMeta } = branch;
    const matches = [];
    let matchedPathname = "/";
    for (let i = 0; i < routesMeta.length; i++) {
        const meta = routesMeta[i];
        const end = i === routesMeta.length - 1;
        let remainingPathname =
            matchedPathname === "/"
                ? pathname
                : pathname.slice(matchedPathname.length) || "/";
        const match = matchPath(
            { path: meta.relativePath, end },
            remainingPathname
        );
        if (!match) return null;
        let route = meta.route;
        matches.push({
            pathname: joinPaths([matchedPathname, match.pathname]),
            pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
            route,
        });
        if (match.pathnameBase !== "/") {
            matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
        }
    }
    return matches;
};

const matchPath = (pattern, pathname) => {
    const [matcher] = compilePath(pattern.path, pattern.end);
    let match = pathname.match(matcher);
    if (!match) return null;

    const matchedPathname = match[0];
    const pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    return {
        pathname: matchedPathname,
        pathnameBase,
        pattern,
    };
};

export const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");

const compilePath = (path, end = true) => {
    let paramNames = [];
    let regexpSource =
        "^" +
        path
            .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, "/") // Make sure it has a leading /
            .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
            .replace(/\/:(\w+)/g, (_, paramName) => {
                paramNames.push(paramName);
                return "/([^\\/]+)";
            });
    if (end) {
        regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
        regexpSource += "(?:(?=\\/|$))";
    }
    let matcher = new RegExp(regexpSource, "i");

    return [matcher, paramNames];
};

// 扁平化 routes 为一维数组
const flattenRoutes = (
    routes,
    branches = [],
    parentsMeta = [],
    parentPath = ""
) => {
    const flattenRoute = (route) => {
        const meta = {
            relativePath: route.path || "",
            route,
        };
        const path = joinPaths([parentPath, meta.relativePath]);

        const routesMeta = parentsMeta.concat(meta);
        if (route.children?.length > 0) {
            flattenRoutes(route.children, branches, routesMeta, path);
        }
        if (route.path == null) {
            return;
        }
        branches.push({ path, routesMeta });
    };
    routes.forEach((route) => {
        flattenRoute(route);
    });
    return branches;
};

const createRoutesFromChildren = (children) => {
    /* 从把变成层级嵌套结构  */
    let routes = [];
    React.Children.forEach(children, (element) => {
        /* 省略处理逻辑 */
        let route = {
            element: element.props.element,
            path: element.props.path,
            // ... 省略
        };
        if (element.props.children) {
            route.children = createRoutesFromChildren(element.props.children);
        }
        routes.push(route);
    });
    return routes;
};

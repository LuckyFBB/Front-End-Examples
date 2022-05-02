import React from "react";
import RouterContext from "../react-router/RouterContext";

export default class Link extends React.Component {
    render() {
        const { to, children } = this.props;
        return (
            <RouterContext.Consumer>
                {(context) => {
                    return (
                        <a
                            href={to}
                            onClick={(event) => {
                                event.preventDefault();
                                context.history.push(to);
                            }}
                        >
                            {children}
                        </a>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}

import React from "react";
import { createHashHistory as createHistory } from "../history";
import { Router } from "../react-router";

class HashRouter extends React.Component {
    history = createHistory();
    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}

export default HashRouter;

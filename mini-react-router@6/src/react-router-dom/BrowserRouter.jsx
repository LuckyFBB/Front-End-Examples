import React from "react";
import { createBrowserHistory as createHistory } from "../history";

import { Router } from "../react-router";

class BrowserRouter extends React.Component {
    history = createHistory();
    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}

export default BrowserRouter;

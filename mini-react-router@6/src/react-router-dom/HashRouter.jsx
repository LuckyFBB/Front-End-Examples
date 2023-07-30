import React from "react";
import { createHashHistory } from "../history";
import { Router } from "../react-router";

export default function HashRouter({ children }) {
    let historyRef = React.useRef();
    if (historyRef.current == null) {
        historyRef.current = createHashHistory();
    }
    let history = historyRef.current;
    let [state, setState] = React.useState({
        location: history.location,
    });

    React.useEffect(() => {
        const unListen = history.listen(setState);
        return unListen;
    }, [history]);

    return (
        <Router
            children={children}
            location={state.location}
            navigator={history}
        />
    );
}

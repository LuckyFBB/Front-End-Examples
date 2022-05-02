import { useContext, useEffect } from "react";
import RouterContext from "./RouterContext";
const Redirect = (props: { to: string; }) => {
    const { to } = props;
    const context = useContext(RouterContext);
    useEffect(() => {
        context?.history?.push(to);
    }, []);
    return null;
};

export default Redirect;

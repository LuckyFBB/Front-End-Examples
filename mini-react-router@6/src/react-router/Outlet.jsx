import { useOutlet } from "./Hooks";

export function Outlet(props) {
    return useOutlet(props.context);
}

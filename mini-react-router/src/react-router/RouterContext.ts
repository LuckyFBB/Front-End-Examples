import { createContext } from "react";
import { IHistory, ILocation } from "../history";

interface RouterContextObject {
    location: ILocation;
    history: IHistory
}

const RouterContext: React.Context<RouterContextObject> = createContext({} as any)
export default RouterContext;

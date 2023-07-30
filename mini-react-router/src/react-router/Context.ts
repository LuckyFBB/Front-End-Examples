import { createContext } from "react";
import { ILocation } from "../history";

interface LocationContextObject {
    location: ILocation;
}

interface NavigationContextObject {
    navigator: { push: (path: string) => void };
}

interface RouteContextObject {
    outlet: React.ReactElement | null;
    matches: any[];
    isDataRoute: boolean;
}

export const NavigationContext = createContext<NavigationContextObject>(null!);

export const LocationContext = createContext<LocationContextObject>(null!);

export const RouteContext = createContext<RouteContextObject>({
    outlet: null,
    matches: [],
    isDataRoute: false,
});

export const OutletContext = createContext<unknown>(null);

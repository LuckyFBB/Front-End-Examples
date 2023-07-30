import React from "react";
import { ILocation } from "../history";
import { LocationContext, NavigationContext } from "./Context";
interface IProps {
    navigator: { push: (to: string) => void };
    location: ILocation;
    children: React.ReactNode;
}

export function Router(props: IProps) {
    const { navigator, children, location } = props;

    const navigationContext = React.useMemo(() => ({ navigator }), [navigator]);

    const { pathname } = location;

    const locationContext = React.useMemo(
        () => ({ location: { pathname } }),
        [pathname]
    );

    return (
        <NavigationContext.Provider value={navigationContext}>
            <LocationContext.Provider
                value={locationContext}
                children={children}
            />
        </NavigationContext.Provider>
    );
}

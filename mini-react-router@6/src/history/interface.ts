interface ILocation {
    pathname: string;
}

interface IHistory {
    location: ILocation;
    push: (path: string) => void;
    listen: (listener: (location: ILocation) => void) => void;
}

export type { IHistory, ILocation };

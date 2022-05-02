import React from "react";
import { IHistory, ILocation } from "../history";
import RouterContext from "./RouterContext";
interface IProps {
    history: IHistory;
    location: ILocation;
    children: React.ReactNode
}

class Router extends React.Component<IProps, { location: ILocation }> {
    unlisten: any
    constructor(props: IProps) {
        super(props);
        this.state = {
            location: props.history.location // 将history的location挂载到state上
        };

        // 通过history监听路由变化，变化的时候，改变state上的location
        this.unlisten = props.history.listen((location: ILocation) => {
            this.setState({ location });
        });
    }
    componentDidMount() { }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        const { history, children } = this.props;
        const { location } = this.state;
        return (
            <RouterContext.Provider
                value={{
                    history,
                    location
                }}
            >
                {children}
            </RouterContext.Provider>
        );
    }
}

export default Router
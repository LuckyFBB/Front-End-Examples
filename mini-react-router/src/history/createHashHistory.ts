import { EventEmitter } from "./EventEmitter";
import { ILocation, IHistory } from "./index";

const createHashHistory = () => {
    const EventBus = EventEmitter();
    const location: ILocation = {
        pathname: window.location.hash.slice(1) || "/"
    };

    // 路由变化时的回调
    const handlePop = () => {
        const currentLocation: ILocation = {
            pathname: window.location.hash.slice(1)
        };
        EventBus.emit(currentLocation); // 路由变化时执行回调
    };

    // 不用手动执行回调，因为hash改变会触发hashchange事件
    const push = (path: string) => (window.location.hash = path);

    const listen = (listener: (location: ILocation) => void) => EventBus.subscribe(listener);

    // 监听hashchange事件
    window.addEventListener("hashchange", handlePop);

    // 返回的history上有个listen方法
    const history: IHistory = {
        location,
        listen,
        push
    };
    return history;
};

export default createHashHistory;

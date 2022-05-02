import { EventEmitter } from "./EventEmitter";
import { ILocation, IHistory } from "./index";

const createBrowserHistory = () => {
    const EventBus = EventEmitter();
    // 初始化location
    let location: ILocation = {
        pathname: window.location.pathname || "/"
    };
    // 路由变化时的回调
    const handlePop = function () {
        const currentLocation: ILocation = {
            pathname: window.location.pathname
        };
        EventBus.emit(currentLocation); // 路由变化时执行回调
    };
    // 定义history.push方法
    const push = (path: string) => {
        const history = window.history;
        // 为了保持state栈的一致性
        history.pushState(null, "", path);
        // 由于push并不触发popstate，我们需要手动调用回调函数
        location = { pathname: path };
        EventBus.emit(location);
    };

    const listen = (listener: (location: ILocation) => void) => EventBus.subscribe(listener);

    // 处理浏览器的前进后退
    window.addEventListener("popstate", handlePop);

    // 返回history
    const history: IHistory = {
        location,
        listen,
        push
    };
    return history;
};

export default createBrowserHistory;

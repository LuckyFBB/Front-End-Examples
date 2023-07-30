import { ILocation } from "./interface";

// 创建和管理listeners的方法
export const EventEmitter = () => {
    let events: Function[] = [];
    return {
        subscribe(fn: (location: ILocation) => void) {
            events.push(fn);
            return function () {
                events = events.filter((handler) => handler !== fn);
            };
        },
        emit(arg: { location: ILocation }) {
            events.forEach((fn) => fn?.(arg));
        },
    };
};

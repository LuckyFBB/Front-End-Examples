import shortid from "shortid";
import dependenceManager from "./dependenceManager";

const watcherMap = new WeakMap();

// @ts-ignore
export function observable(obj): any {
    return createProxy(obj);
}

// 深度设置Proxy对象代理
//@ts-ignore
function createProxy(obj: any) {
    return new Proxy(obj, {
        get: (target, propKey) => {
            if (typeof target[propKey] === "object") {
                return observable(target[propKey]);
            } else {
                if (!watcherMap.get(target)) {
                    watcherMap.set(target, {});
                }
                const targetObj = watcherMap.get(target);
                if (!targetObj[propKey])
                    targetObj[propKey] = new Watcher(String(propKey));
                targetObj[propKey].collect();
                return target[propKey];
            }
        },
        set: (target, propKey, value) => {
            if (target[propKey] !== value) {
                target[propKey] = value;
                const targetObj = watcherMap.get(target);
                if (targetObj && targetObj[propKey]) {
                    const watcher = targetObj[propKey];
                    watcher && watcher.notify();
                }
            }
            return true;
        },
    });
}

class Watcher {
    id: string;
    constructor(key: string) {
        this.id = `ob_${key}_${shortid()}`;
    }
    // 调用get时，收集所有观察者
    collect() {
        dependenceManager.collect(this.id);
    }
    // 调用set时，通知所有观察者
    notify() {
        dependenceManager.notify(this.id);
    }
}

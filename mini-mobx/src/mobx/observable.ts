import shortid from 'shortid';
import dependenceManager from './dependenceManager'

export function observable(target: any, name?: any, descriptor?: any): any {
    const value = descriptor.initializer();
    const _watcher = new Watcher();
    // 创建代理
    let proxyValue = createProxy(value, _watcher)
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            _watcher.collect();
            return proxyValue
        },
        set: function (value: any) {
            proxyValue = value
            return _watcher.notify();
        }
    }
}

// 深度设置Proxy对象代理
function createProxy(val: { [x: string]: any; }, watcher: Watcher) {
    if (typeof val !== "object") return val;
    const handler = {
        set: (target: object, key: PropertyKey, value: any) => {
            const setValue = Reflect.set(target, key, value)
            watcher.notify()
            return setValue
        },
        get: (target: object, key: PropertyKey) => {
            watcher.collect()
            return Reflect.get(target, key)
        }
    }
    // 深度递归进行Proxy代理，此时的递归树相当于是后序遍历进行代理
    for (let key in val) {
        val[key] = createProxy(val[key], new Watcher());
    }
    return new Proxy(val, handler);
}

class Watcher {
    id: string;
    constructor() {
        this.id = `ob_${shortid()}`;
    }
    // 调用get时，收集所有观察者
    collect() {
        dependenceManager.collect(this.id)
    }
    // 调用set时，通知所有观察者
    notify() {
        dependenceManager.trigger(this.id)
    }
}
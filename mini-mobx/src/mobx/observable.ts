import dependenceManager from './dependenceManager'
import shortid from 'shortid';



export function observable(target: any, name: any, descriptor: { initializer: () => any; }) {
    const v = descriptor.initializer();
    createDeepWatcher(v)
    const o = new Watcher(v, name);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return o.get();
        },
        set: function (v: any) {
            createDeepWatcher(v)
            return o.set(v);
        }
    };
};

function createDeepWatcher(target: any) {
    if (typeof target === "object") {
        for (let property in target) {
            if (target.hasOwnProperty(property)) {
                const observable = new Watcher(target[property], property);
                Object.defineProperty(target, property, {
                    get() {
                        debugger
                        return observable.get();
                    },
                    set(value) {
                        return observable.set(value);
                    }
                });
                createDeepWatcher(target[property])
            }
        }
    }
}
class Watcher {
    id: string
    value: any;
    constructor(v: any, property: string) {
        this.id = `ob_${property}_${shortid()}`;
        this.value = v;
    }
    get() {
        dependenceManager.collect(this.id);
        return this.value;
    }
    set(v: any) {
        this.value = v;
        dependenceManager.trigger(this.id);
    }
}
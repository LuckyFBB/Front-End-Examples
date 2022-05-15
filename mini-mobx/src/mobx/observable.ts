import dependenceManager from './dependenceManager'
import shortid from 'shortid';

export function observable(target: any, name: any, descriptor: { initializer: () => any; }) {
    const v = descriptor.initializer();
    createDeepWatcher(v)
    const watcher = new Watcher(v, name);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return watcher.get();
        },
        set: function (v: any) {
            return watcher.set(v);
        }
    };
};

function createDeepWatcher(target: any) {
    if (typeof target === "object") {
        for (let property in target) {
            if (target.hasOwnProperty(property)) {
                const watcher = new Watcher(target[property], property);
                Object.defineProperty(target, property, {
                    get() {
                        return watcher.get();
                    },
                    set(value) {
                        return watcher.set(value);
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
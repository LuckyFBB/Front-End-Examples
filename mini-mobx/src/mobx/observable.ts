import shortid from 'shortid';
import dependenceManager from './dependenceManager'

export function observable(_target: any, _name: any, descriptor: any): any {
    const v = descriptor.initializer();
    const o = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return o.get();
        },
        set: function (v: any) {
            return o.set(v);
        }
    }
}

class Observable {
    id: string;
    value: any;
    constructor(v: any) {
        this.id = `ob_${shortid()}`;
        this.value = v;
    }
    // 调用get时，收集所有观察者
    get() {
        dependenceManager.collect(this.id)
        return this.value
    }
    // 调用set时，通知所有观察者
    set(v: any) {
        this.value = v
        dependenceManager.trigger(this.id)
    }
}
import shortid from 'shortid';
import dependenceManager from "./dependenceManager";

export function computed(target: any, name: any, descriptor: any) {
    const getter = descriptor.get; // get 函数
    const _watcher = new ComputeWatcher(target);
    const proxyValue = new Proxy(target, {
        get: (target) => {
            return getter.call(target);
        }
    })
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            _watcher.get()
            return proxyValue[name]
        }
    };
}

class ComputeWatcher {
    id: string;
    target: any;
    // 标识是否绑定过computed的依赖，只需要绑定一次
    hasBindAutoReCompute: boolean | undefined;
    constructor(target: any) {
        this.id = `computed_${shortid()}`
        this.target = target
    }
    // 绑定recompute 和 内部涉及到的观察值的关系
    _bindAutoReCompute() {
        if (!this.hasBindAutoReCompute) {
            this.hasBindAutoReCompute = true;
            dependenceManager.beginCollect(this._reComputed, this);
            this._reComputed();
            dependenceManager.endCollect();
        }
    }
    // 依赖属性变化时调用的函数
    _reComputed() {
        dependenceManager.trigger(this.id);
    }
    // 提供给外部调用时收集依赖使用
    get() {
        this._bindAutoReCompute()
        dependenceManager.collect(this.id);
    }
}
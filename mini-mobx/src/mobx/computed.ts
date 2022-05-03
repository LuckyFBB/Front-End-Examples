import shortid from 'shortid';
import dependenceManager from "./dependenceManager";

export function computed(target: any, name: any, descriptor: any) {
    const getter = descriptor.get; // get 函数
    const _computed = new Computed(target, getter);

    return {
        enumerable: true,
        configurable: true,
        get: function () {
            _computed.target = this
            return _computed.get();
        }
    };
}

class Computed {
    id: string;
    target: any;
    getter: any;
    // 标识是否绑定过recomputed依赖，只需要绑定一次
    hasBindAutoReCompute: any;
    value: any;
    constructor(target: any, getter: any) {
        this.id = `computed_${shortid()}`
        this.target = target
        this.getter = getter
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
        this.value = this.getter.call(this.target);
        dependenceManager.trigger(this.id);
    }
    // 提供给外部调用时收集依赖使用
    get() {
        this._bindAutoReCompute()
        dependenceManager.collect(this.id);
        return this.value
    }
}
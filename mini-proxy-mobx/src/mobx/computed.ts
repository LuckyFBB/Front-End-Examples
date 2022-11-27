export function computed(target: any, name: any, descriptor: any) {
    setTimeout(() => {
        const getter = descriptor.get; // get 函数
        return new Proxy(target, {
            get: (target) => {
                return getter.call(target);
            },
        });
    }, 0);
}

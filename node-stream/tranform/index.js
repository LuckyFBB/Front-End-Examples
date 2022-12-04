const Transform = require("stream").Transform;

class myTransform extends Transform {
    constructor(n) {
        super();
        this.position = n;
    }
    _transform(data, enc, next) {
        const res = data
            .toString()
            .split("")
            .map((c, index) => {
                if (index % this.position === 0) return c.toLocaleUpperCase();
                return c;
            })
            .join("");
        // 调用push方法将变换后的数据添加到可读端
        this.push(res);
        // 调用next方法准备处理下一个
        next();
    }
}

const transform = new myTransform(3);

process.stdin.pipe(transform).pipe(process.stdout);

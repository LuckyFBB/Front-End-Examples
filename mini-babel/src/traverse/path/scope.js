// path.scope 中记录着作用域相关的数据
// 通过 scope 可以拿到整条作用域链，包括声明的变量和对该声明的引用

// 能生成 scope 的 AST 叫做 block
// 比如 FunctionDeclaration 就是 block，因为它会生成一个新的 scope

class Binding {
    constructor(id, path, scope, kind) {
        this.id = id;
        this.path = path;
        this.referenced = false;
        this.referencePaths = [];
    }
}

class Scope {
    constructor(parentScope, path) {
        this.parent = parentScope;
        this.path = path;
        this.bindings = {}; // 记录作用域中的每一个声明

        path.traverse({
            VariableDeclarator: (childPath) => {
                this.registerBinding(childPath.node.id.name, childPath);
            },
            FunctionDeclaration: (childPath) => {
                // TODO: 为什么要跳过
                childPath.skip();
                this.registerBinding(childPath.node.id.name, childPath);
            },
        });
        path.traverse({
            Identifier: (childPath) => {
                if (
                    !childPath.findParent(
                        (p) =>
                            p.isVariableDeclarator() ||
                            p.isFunctionDeclaration()
                    )
                ) {
                    const id = childPath.node.name;
                    const binding = this.getBinding(id);
                    if (binding) {
                        binding.referenced = true;
                        binding.referencePaths.push(childPath);
                    }
                }
            },
        });
    }
    registerBinding(id, path) {
        this.bindings[id] = new Binding(id, path);
    }
    // 从当前作用域查找声明
    getOwnBinding(id) {
        return this.bindings[id];
    }
    // 沿着作用域链查找声明
    getBinding(id) {
        let res = this.getOwnBinding(id);
        if (res === undefined && this.parent) {
            res = this.parent.getOwnBinding(id);
        }
        return res;
    }
    // 判断是否含有声明
    hasBinding(id) {
        return !!this.getBinding(id);
    }
}

module.exports = Scope;

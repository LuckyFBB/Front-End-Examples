// path 记录了遍历路径，并且还实现了一系列增删改的 api

const types = require("../visitorMap");
const Scope = require("./scope");

class NodePath {
    constructor(node, parent, parentPath, key, listKey) {
        this.node = node; // 当前节点
        this.parent = parent; // 父节点
        this.parentPath = parentPath; //父级路径
        this.key = key; //当前属性
        this.listKey = listKey; //当前属性下标

        // 判断节点
        Object.keys(types).forEach((key) => {
            if (key.startsWith("is")) {
                this[key] = types[key].bind(this, node);
            }
        });
    }

    get scope() {
        if (this.__scope) return this.__scope;
        const isBlock = this.isBlock();
        const parentScope = this.parentPath && this.parentPath.scope;
        return (this.__scope = isBlock
            ? new Scope(parentScope, this)
            : parentScope);
    }

    // 替换节点，如果是对象直接修改属性
    // 如果是数组则修改某个元素
    replaceWith(node) {
        if (this.listKey === undefined) {
            // 当前属性是一个对象
            this.parent[this.key] = node;
        } else {
            this.parent[this.key].splice(this.listKey, 1, node);
        }
    }
    // 删除节点，同上
    remove() {
        if (this.listKey === undefined) {
            this.parent[this.key] = null;
        } else {
            this.parent[this.key].splice(this.listKey, 1);
        }
    }
    // 查找节点，find是从当前path开始查找
    find(cb) {
        let currPath = this;
        while (currPath && !cb(currPath)) {
            currPath = currPath.parentPath;
        }
        return currPath;
    }
    // 查找节点，find是从parentPath开始查找
    findParent(cb) {
        let currPath = this.parentPath;
        while (currPath && !cb(currPath)) {
            currPath = currPath.parentPath;
        }
        return currPath;
    }
    // 遍历节点，traverse不遍历当前节点，直接遍历子节点
    traverse(visitors) {
        const traverse = require("../index");
        const definition = types.astDefinitionsMap.get(this.node.type);
        if (definition.visitor) {
            definition.visitor.forEach((key) => {
                const prop = this.node[key];
                if (Array.isArray(prop)) {
                    // 如果该属性是数组
                    prop.forEach((childNode, index) => {
                        traverse(childNode, visitors, this.node, this);
                    });
                } else {
                    traverse(prop, visitors, this.node, this);
                }
            });
        }
    }
    // 给节点添加标识跳过子节点遍历
    skip() {
        this.node.__shouldSkip = true;
    }
    // 当前节点打印成目标代码
    toString() {
        return generate(this.node).code;
    }
    // 该节点是否是函数声明这种能生成作用域的节点
    isBlock() {
        return types.astDefinitionsMap.get(this.node.type).isBlock;
    }
}

module.exports = NodePath;

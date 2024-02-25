const types = require("./visitorMap");
const NodePath = require("./path/path");

function traverse(node, visitors, parent, parentPath, key, listKey) {
    let visitorFuncs = visitors[node.type] || {};
    if (typeof visitorFuncs === "function") {
        visitorFuncs = {
            enter: visitorFuncs,
        };
    }
    const path = new NodePath(node, parent, parentPath, key, listKey);
    visitorFuncs.enter && visitorFuncs.enter(path);
    if (node.__shouldSkip) {
        delete node.__shouldSkip;
        return;
    }
    const definition = types.astDefinitionsMap.get(node.type); // 获得当前节点的可遍历的节点
    if (definition.visitor) {
        definition.visitor.forEach((key) => {
            const prop = node[key];
            if (Array.isArray(prop)) {
                prop.forEach((childNode, index) => {
                    traverse(childNode, visitors, node, path, key, index);
                });
            } else {
                traverse(prop, visitors, node, path, key);
            }
        });
    }
    visitorFuncs.exit && visitorFuncs.exit();
}

module.exports = traverse;

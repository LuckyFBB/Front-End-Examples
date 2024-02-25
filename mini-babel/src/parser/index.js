const acorn = require("acorn");

const defaultOptions = {
    plugins: [],
};

// 插件合集
const syntaxPlugins = {
    literal: require("./plugin/literal"),
};

function parse(code, options) {
    const resolveOptions = Object.assign({}, defaultOptions, options);

    const newParser = resolveOptions.plugins.reduce((Parser, pluginName) => {
        let plugin = syntaxPlugins[pluginName]; // 从插件合集中获得当前插件
        return plugin ? Parser.extend(plugin) : Parser; // 如果存在就集成当前插件
    }, acorn.Parser);

    return newParser.parse(
        code,
        { locations: true } // 保留AST在源码的位置，为了生成AST
    );
}

module.exports = {
    parse,
};

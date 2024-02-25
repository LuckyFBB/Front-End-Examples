const { transformSync } = require("../src/core");

const sourceCode = `
const a = 1
function add1(a,b){
    function add(c,d){
        return 1
    }
}
`;

function plugin1(api, options) {
    return {
        visitor: {
            Identifier(path) {
                if (path.findParent((p) => p.isCallExpression())) {
                    path.replaceWith(
                        api.template.expression(options.replaceName)
                    );
                }
            },
        },
    };
}

function plugin2(api, options) {
    return {
        visitor: {
            Program(path) {
                Object.entries(path.scope.bindings).forEach(([id, binding]) => {
                    if (!binding.referenced) {
                        binding.path.remove();
                    }
                });
            },
            FunctionDeclaration(path) {
                Object.entries(path.scope.bindings).forEach(([id, binding]) => {
                    if (!binding.referenced) {
                        binding.path.remove();
                    }
                });
            },
        },
    };
}

function preset(api, options) {
    if (options.target === "chrome") {
        return [
            [
                plugin1,
                {
                    replaceName: "ddddd",
                },
            ],
        ];
    } else {
        return [[plugin2]];
    }
}

const { code, map } = transformSync(sourceCode, {
    parserOpts: {
        plugins: ["literal"],
    },
    fileName: "foo.js",
    presets: [
        [
            preset,
            {
                target: "chrom1e",
            },
        ],
    ],
});

console.log(code);
console.log(map);

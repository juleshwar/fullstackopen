module.exports = {
    env: {
        commonjs: true,
        node: true,
    },
    extends: "airbnb",
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: [
            "error",
            4,
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        quotes: [
            "error",
            "double",
        ],
        semi: [
            "error",
            "never",
        ],
        "no-console": 0,
    },
}

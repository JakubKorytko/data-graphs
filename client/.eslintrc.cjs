module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
        "sort-imports":
        [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true
            }
        ],
        "import/order": [ "error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
            pathGroupsExcludedImportTypes: ["type"],
            "newlines-between": "always"
        }]
    }
}

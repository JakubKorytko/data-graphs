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
            pathGroups: [
                {
                    pattern: "components/Chart/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "components/Modals/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "components/Notifications/**",
                    group: "internal",
                    position: "after",
                },
                {
                    pattern: "components/Table/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "components/Wrappers/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "components/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "utils/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "**/*.style",
                    group: "index",
                },
                {
                    pattern: "**/*.css",
                    group: "index",
                },
                {
                    pattern: "**/*.type",
                    group: "index",
                }
            ],
            "newlines-between": "always"
        }]
    }
}

/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,

    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
        "@vue/typescript/recommended",
        "plugin:workspaces/recommended"
    ],
    parserOptions: { ecmaVersion: "latest" },
    overrides: [
        {
            files: ["*.ts", "*.vue", "*.cjs"],
            rules: {
                "vue/script-setup-uses-vars": "error",
                semi: ["error", "always"],
                "no-trailing-spaces": "error",
                "comma-dangle": "error",
                quotes: ["error", "double"],
                "object-curly-spacing": ["error", "always"],
                "object-curly-newline": [
                    "error",
                    {
                        ObjectExpression: {
                            multiline: true,
                            minProperties: 2
                        },
                        ImportDeclaration: "never"
                    }
                ],
                "max-len": [
                    "warn",
                    {
                        tabWidth: 4,
                        code: 120,
                        ignoreUrls: true,
                        ignorePattern:
                            // eslint-disable-next-line prettier/prettier
                            "(class=\"([\\s\\S]*?)\")|(d=\"([\\s\\S]*?)\")|(=\"([\\s\\S]*?)\")",
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true
                    }
                ],
                "prettier/prettier": [
                    "warn",
                    {
                        endOfLine: "auto",
                        singleAttributePerLine: true,
                        trailingComma: "none",
                        singleQuote: false,
                        tabWidth: 4
                    }
                ],
                "vue/html-indent": ["off"],
                "vue/html-self-closing": [
                    "error",
                    {
                        html: {
                            normal: "never",
                            void: "always"
                        }
                    }
                ]
            }
        }
    ]
};

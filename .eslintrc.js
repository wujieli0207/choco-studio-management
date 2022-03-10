module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // extends: ["plugin:vue/essential", "standard", "plugin:prettier/recommended"],
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "import/no-absolute-path": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
  },
};

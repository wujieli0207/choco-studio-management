module.exports = {
  root: true,
  plugins: ["stylelint-scss", "stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    "no-descending-specificity": null,
    // 禁止使用未知的伪元素选择器
    "selector-pseudo-element-no-unknown": null,
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};

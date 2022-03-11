module.exports = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat", // feature，新增功能
        "fix", // bug fix，修复 bug
        "perf", // 性能提升
        "style", // 代码样式调整，对逻辑无影响，比如为符合 eslint 要求修改代码格式
        "docs", // 文档、注释更新
        "test", // 添加、修改测试用例
        "refactor", // 重构（不包括 bug 修复、功能新增），如文件、变量重命名、代码抽象为函数，消除魔法数字
        "build", // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        "ci", // 修改 CI 配置、脚本
        "chore", // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
        "revert", // 回滚 commit
        "wip", // 开发中
        "mod",
        "workflow", // 工作流改进
        "types", // 类型修改
      ],
    ],
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended', // 添加 Prettier 推荐配置
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'prettier/prettier': 'error', // 将 Prettier 规则作为 ESLint 错误
  },
};

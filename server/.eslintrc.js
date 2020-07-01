module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "no-undef-init": 0,
    semi: [2, "always"],
    "no-path-concat": 0,
  },
  root: true,
};

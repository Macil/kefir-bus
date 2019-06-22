module.exports = {
  "env": {
    "amd": true,
    "browser": true,
    "jasmine": true,
    "node": true,
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 2015,
    "ecmaFeatures": {
    },
    "sourceType": "module"
  },
  "plugins": [
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "brace-style": ["error"],
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "no-unused-vars": ["off"],
    "no-spaced-func": ["error"],
    "no-whitespace-before-property": ["error"],
    "space-before-blocks": ["error", "always"],
    "keyword-spacing": ["error"]
  }
};

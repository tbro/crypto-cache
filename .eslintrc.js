module.exports = {
  "env": {
    "browser": false,
    "commonjs": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-unused-vars": ["error", { "varsIgnorePattern": "should", "ignoreRestSiblings": true, "args": "none" }],
  }
};

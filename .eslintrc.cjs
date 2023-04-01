// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: [ "*.ts", "*.tsx" ],
      parserOptions: { project: path.join(__dirname, "tsconfig.json"), },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: path.join(__dirname, "tsconfig.json"), },
  plugins: [ "@typescript-eslint" ],
  extends: [ "next/core-web-vitals", "plugin:@typescript-eslint/recommended" ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [ "warn", { argsIgnorePattern: "^_" } ],
    "no-case-declarations": "off",
    // "import/first": "warn",
    // "import/order": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "warn",
    "react-native/no-raw-text": "off",
    "react/jsx-filename-extension": "off",
    "no-multi-spaces": "warn",
    "spaced-comment": "off",
    "eqeqeq": "off",
    "radix": "warn",
    "indent": [ "warn", 2 ] ,
    // "react/jsx-indent": [ "warn", 2 ],
    // "react/jsx-indent-props": [ "warn", 2 ],
    "brace-style": [ "warn", "stroustrup" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "object-curly-spacing": [ "warn", "always" ],
    "object-curly-newline": [ 2, { "multiline": true, "minProperties": 3 } ],
    "arrow-body-style": "warn",
    "consistent-return": "warn",
    "no-nested-ternary": "warn",
    // "import/named": "error",
    "no-plusplus": "warn",
    "no-param-reassign": "warn",
    "no-empty": "off",
    "vars-on-top": "warn",
    "no-restricted-properties": "warn",
    "no-useless-escape":"warn",
    "no-return-await": "warn",
    "no-unneeded-ternary": "warn",
    "class-methods-use-this": "warn",
    "no-lone-blocks": "warn"
  },
};

module.exports = config;

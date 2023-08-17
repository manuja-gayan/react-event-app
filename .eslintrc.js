const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jsdoc/recommended',
    'react-app',
    'react-app/jest',
  ],
  plugins: ['prettier', 'jsdoc'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', prettierOptions],
    'jsdoc/require-returns': ['warn', { exemptedBy: ['component'] }],
    'jsdoc/require-param': ['warn', { exemptedBy: ['component'] }],
    'jsdoc/check-tag-names': 'off',
  },
  env: {
    browser: true,
    jest: true,
  },
};

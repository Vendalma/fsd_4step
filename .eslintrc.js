module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jasmine/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'fsd', 'jasmine'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'func-names': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jasmine/no-unsafe-spy': 0,
    'jasmine/prefer-toHaveBeenCalledWith': 0,
    'jasmine/no-spec-dupes': [1, 'branch'],
    'jasmine/no-suite-dupes': [1, 'branch'],
    'max-classes-per-file': ['error', 2],
    'default-case': 0,
    'no-new': 0,
    "no-unused-expressions": [
      "error",
      {
        "allowTernary": true
      }
    ]
  },
};

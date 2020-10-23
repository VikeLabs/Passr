module.exports= {
    env: {
        es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'prettier/@typescript-eslint',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    ],
    parserOptions:{
        ecmaVersion:8,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread:true,
        },
        sourceType: 'module',
        },
    rules: {
        '@typescript-eslint/explicit-function-return-type':'off',
        'react/prop-types':'off',
        'react/no-unused-prop-types':'warn',
        'react-hooks/rules-of-hooks':'error',
        'react-hooks/exhaustive-deps':'warn',
        'prettier/prettier':'warn',
        },
    reportUnusedDisabledDirectives:true,
    root: true,
    settings:{
        react: {
            version: 'detect',
        },
    },
};
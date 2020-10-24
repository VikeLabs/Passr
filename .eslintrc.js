module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/prop-types': 'off',
		'react/no-unused-prop-types': 'warn',
		'no-console': 'error',
		'prettier/prettier': 'warn',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};

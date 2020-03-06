const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
	.reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})


module.exports = {
	"parser": "@typescript-eslint/parser",
	"extends": [
		"airbnb",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier/react",
		"prettier/@typescript-eslint"
	],
	"plugins": ["@typescript-eslint"],
	"settings": {
		"import/resolver": "webpack"
	},
	"rules": {
		"import/prefer-default-export": 0,
		"import/extensions": 0,
		"react/jsx-filename-extension": [1, { "extensions": ["tsx"] }],
		"import/no-extraneous-dependencies": 0
		...a11yOff
	}
}

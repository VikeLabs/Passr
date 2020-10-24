# Tools

## [ESLint](https://eslint.org/)

ESLint is a Javascript (or Typescript) linting utility that checks for syntax errors and style guidelines. It can also fix those errors on its own. Having a cleaner code helps with consistency in the app which can be good for reviewing and debugging our code.

## [Prettier](https://prettier.io/)

Prettier is a code formatter for our Typescript and Javascript files that enforces a common style guide across our codebase. It can be downloaded as a plugin in VSCode and set to format code upon saving in the Settings.json file within VSCode.

## [lint-staged](https://github.com/okonet/lint-staged)

Allows us to run linters against staged git files and prevents errors from being introduced to our codebase. This package includes, husky, which lets us take advantage of git hooks and run commands or scripts before committing and pushing to github. We will use this along with ESLint because linting is more beneficial when we can check for errors before committing and pushing up our code. In this way we can ensure the errors don't make it to the repository in github.

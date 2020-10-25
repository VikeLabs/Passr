# Tools

## [ESLint](https://eslint.org/)

ESLint is a Javascript (or Typescript) linting utility that checks for syntax errors and style guidelines. It can also fix those errors on its own. Having a cleaner code helps with consistency in the app which can be good for reviewing and debugging our code.

## [Prettier](https://prettier.io/)

Prettier is a code formatter for our Typescript and Javascript files that enforces a common style guide across our codebase. It can be downloaded as a plugin in VSCode and set to format code upon saving in the Settings.json file within VSCode.

## [lint-staged](https://github.com/okonet/lint-staged)

Allows us to run linters against staged git files and prevents errors from being introduced to our codebase. This package includes, husky, which lets us take advantage of git hooks and run commands or scripts before committing and pushing to github. We will use this along with ESLint because linting is more beneficial when we can check for errors before committing and pushing up our code. In this way we can ensure the errors don't make it to the repository in github.

If changes still need to be pushed up even if they do not pass ESLint checks then they can be done so by using `git commit --no-verify`

# Configuration

## package.json

Each configuration should be an object and within each object is a value that prescribes a command to run and its key is a glob pattern to use for this command. We use [micromatch](https://github.com/micromatch/micromatch) for each glob pattern.

### scripts

The scripts object specifies aliases that we can use to access `react-script` commands or in particular, scrips for ESLint and Prettier.

`lint` Runs `eslint` on all files in the src folder that end in ts,js,tsx, and jsx. This allows us to run `npm run lint <somefile.tsx>` on our files to check for eslint errors.

`lint:fixed` Runs the `eslint --fixed` command and fixes eslint errrors on all files as above. This allows us to run `npm run lint:fixed <somefile.tsx>` in order to have ESLint fix a file of our choosing.

`prettier` Runs a prettier command to correct all formatting issues within files as above. This allows us to run `npm run prettier <somefile.tsx>` to have Prettier format a file of our choosing.

### dependecies

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) Turns off all rules that are unnecessary or might conflict with Prettier.

[eslint-plugin-prettier](eslint-plugin-prettier) Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

### devDependencies

[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) An ESLint plugin which provides lint rules for TypeScript codebases.

[TypeScript ESLint Parser](https://www.npmjs.com/package/@typescript-eslint/parser) An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.

[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) React specific linting rules for ESLint

[prettier](https://github.com/prettier/prettier) Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

[lint-staged](https://github.com/okonet/lint-staged) Run linters against staged git files and don't let :hankey: slip into your code base! Allows us to run scripts on staged files in git.

[husky](https://github.com/typicode/husky) Git hooks made easy. Husky makes it possible to use git hooks as if their npm scripts.

### huksy and lint-staged

Husky and lint-staged work together to run ESLint on staged files. Husky uses git hooks to run lint-staged which runs Prettier on and formats the staged files in the src folder that end in ts,js,tsx, and jsx. Husky would also be able to do this with ESLint to not allow commits with ESLint errors but this may be too restrictive at this time, we would rather focus on helping contributors fix ESLint errors after they have pushed up their code.

## .eslintrc.js

### env

An environment defines global variables that are predefined. We use browser global variables and enables all [ECMAScript 6](https://en.wikipedia.org/wiki/ECMAScript) features except for modules.

### extends

An extends property value such as "eslint:recommended" enables a subset of core rules that report common problems, which have a check mark on the rules page.

### parser

By default, ESLint uses Espree as its parser, we would like to change that to a nicer Typescript parser that puts it in a form compatible for ESLint.

### plugins

Plugins are resolved relative to the config file. In other words, ESLint will load the plugin as a user would obtain by running require('eslint-plugin-pluginname') in the config file.

### rules

ESLint comes with a large number of [rules](https://eslint.org/docs/rules/). Because typescript already has quite a bit type restrictions we can turn off the eslint check for `explicit-function-return-type` and `react-prop-types`. It's nice to be able to clean up the code of unused imports, so we make sure to set this as a warning. If someone doesn't have Prettier configured to change after saving on their IDE then we set an ESLint rule to warn about any prettier formatting inconsistencies.

## .eslintignore

For now, we choose to ignore test files, the ServiceWorker.ts, and the eslint config file.

## prettierrc.js

Specifies rules to be enforced. We prefer to use tabs, with a set width of 4. We will add semicolons in order to clearly indicate independent statements and avoid mistakes that can result from their accidental entanglement. Lastly, we use `proseWrap` to indicate that lines should not be wrapped in their presentation in github, but instead are set to their true length.

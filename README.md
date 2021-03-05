***UPDATE BADGE URLS BELOW***

[![Build Status](https://travis-ci.com/internetarchive/iaux-donation-form.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-donation-form)

[![codecov](https://codecov.io/gh/internetarchive/iaux-donation-form/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-donation-form)

# \<typescript-template>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
yarn add typescript-template
```

## Usage
```html
<script type="module">
  import 'typescript-template/typescript-template.js';
</script>

<typescript-template></typescript-template>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
yarn run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`

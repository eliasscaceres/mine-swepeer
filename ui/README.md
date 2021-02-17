# Plugin

## Project Structure

```
├── src
|   ├── components
|   ├── index.jsx
├── .babelrc
├── .gitgnore
├── .prettierrc
├── index.html
├── package.json
├── README.md
└── webpack.config.js
```

- **src** folder: contains the React files.

- **.babelrc** Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

- **.prettierrc** Prettier is an opinionated code formatter.

- **index.html** Sample html to see the plugin working after building it.

- **webpack.config.js** At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

## Quick Start

#### 1. Run `npm install`

Install all dependencies

#### 2. Run `npm run build -- --env API_URL=localhost:3000`

Creates a dist folder with the bundle-v${version}.js. Webpack takes version from package.json and attached it to bundle file name.

> Note: in this command an environment variable called API_URL is passed to be used by the plugin in order to validate the client credentials locally.

## How to run it

In order to use this plugin you have to add this code to you HTML file.

```html
<!-- Import the bundle.js file with the plugin -->
<script type="text/javascript" src="dist/bundle-v${version}.js"></script>
<!-- Create a div to embedded React widget -->
<div id="app"></div>
<!-- Script to initialize the React component with custom config -->
<script type="text/javascript">
  VideoWall.init(
    {
      token: 123,
      role: "admin",
    },
    "app",
  );
</script>
```

As you can see in the example.html file located in plugin/example.html

### Tests

The unit tests were created using the Jest framework. They can be triggered by running the following command:
```sh
npm run test
```

### Lint

We configured a semistandard library to maintain code quality.

You can verify if errors exist in the code by running the following command:
```sh
npm run linter-check
```
You can fix the found errors by running this next command:
```sh
npm run linter-fix
```

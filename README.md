# React Template

React boilerplate with Hapi server-side rendering. Uses browser-sync refreshing
with optional Redux Devtool export/importing until react-hot-loader v3
stabilizes.

#### Quick Start

Runs on Node v6+

```sh
# Install dependencies and build assets
npm run yarn
npm run build

# Serve production server
NODE_ENV=production npm start
```

The server should start at http://localhost:8000/.

#### Development

```sh
# Start dev server
npm run dev
```

```sh
# Build and start prod server (shortcut)
npm run start-prod
```

Ignore any initial errors for files that can't be found. Once the builds
complete, it should automatically refresh as needed.

Dev Server:  
http://localhost:8000/

Browser-Sync Proxy:  
http://localhost:3000/

##### Clone Component Script

Shortcut script to bootstrap new components. Requires `make` to be installed.

```sh
# Defaults to putting component in src/components/shared
make component NAME=Sample

# Creates:
# src/components/shared/
# └── Sample
#     ├── Sample.index.js
#     ├── Sample.js
#     ├── Sample_test.js
#     └── Sample.style.css

# Specify target directory
make component NAME=Sample TARGET_DIR=src/components/Dashboard

# Creates:
# src/components/Dashboard/
# └── Sample
#     ├── Sample.index.js
#     ├── Sample.js
#     ├── Sample_test.js
#     └── Sample.style.css
```

#### Deployment

```sh
# Add Heroku remotes
npm run init

# Deploy to staging on Heroku
git push staging master

# Promote current staging revision to prod on Heroku
npm run deploy:prod
```

#### Testing

```sh
# Run all tests (lint, type, unit)
npm test

# Run only unit tests
npm run test-jest
```

[Jest](https://facebook.github.io/jest/docs/tutorial-react.html) is used as the test runner for unit and snapshot tests.
[Enzyme](http://airbnb.io/enzyme/) is used for helpers in testing React
components. The simplicity of tape should enable easy browser-based tests using
[Karma](https://karma-runner.github.io/1.0/index.html) in the future.

Test filenames follow the [Go](https://golang.org/doc/code.html#Testing) and
must end with `_test.js` to be detected. This enables test files to reside in
the same directory as the subjects under test for convenience.

## Tooling Reference

#### FlowType

```sh
npm run flow
```

This project uses [Flow](https://flowtype.org/) static type checking for
JavaScript. There is plugin support for most code editors.  A [Flow Quick
Reference](https://flowtype.org/docs/quick-reference.html) is available for a
type cheat sheet.

#### ESLint

```sh
npm run lint
```

[ESLint](http://eslint.org/) is used heavily to control edge-case JS errors
before they make it to production and to keep a unified structure throughout
the codebase.  ES6-7 features are compiled down using `babel-eslint`.

#### Browser-Sync

The Browser-Sync Proxy watches files and auto-reloads.  Webpack watches changed
files and rebuilds as necessary while Browser-Sync auto-reloads the page.
However, some PostCSS assets like the `src/styles/variables.js` may not get
rebuilt unless you restart the dev server.

#### Redux Devtool

Watch and troubleshoot the local state changes.

Chrome extension:  
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

Project info:  
https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension

###### Saving Initial State

A hook has been added in `NODE_ENV=development` that lets you export a state
from the Redux Devtool as `state.json` and place it in the project root to
start with that initial state from the server-side.

See `server/handlers/html.js` for the implementation.

###### Immutable.js Browser Inpsection

This Chrome extension enables easy inspection of Immutable.js objects.

Chrome extension:  
https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog

Be sure to enable the "Enable Custom Formatters" option in the Chrome devtool
settings as well.

#### React Developer Tools

Watch and troubleshoot React component state and updates

Chrome extension:  
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

Firefox addon:  
https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

Project info:  
https://github.com/facebook/react-devtools

#### Redux Logger

For more convenience, console logging is also enabled when
`NODE_ENV=development` with [Redux
Logger](https://github.com/evgenyrodionov/redux-logger)

#### React Perf

The [chrome-react-perf](https://github.com/crysislinux/chrome-react-perf)
project provides a Chrome extension to test the render performance of
components through different tasks.

Chrome extension:  
https://chrome.google.com/webstore/detail/react-perf/hacmcodfllhbnekmghgdlplbdnahmhmm

#### Webpack

[Webpack](https://webpack.github.io/) is used to orchestrate builds.

The `webpack.browser.js` config defines the build used to compile the assets
that are run in and accessed by the browser.

The `webpack.server.js` config defines the build used to create the production
web server that serves the browser assets.

The `webpack.web.js` config exists for convenience to run a combined
`webpack.server.js` and `webpack.browser.js` build.

#### PostCSS

[PostCSS](http://postcss.org/) is used in lieu of SASS/LESS to compile CSS for
web.

The `postcss.config.js` returns the PostCSS config and currently includes the
following transforms in this order:

- [PreCSS](https://github.com/jonathantneal/precss) applies a collection of
  PostCSS configurations for SASS-like markup.
- [postcss-calc](https://github.com/postcss/postcss-calc) reduces the number of
  `calc()` operations performed by the browser by precalculating values when
  possible.
- [autoprefixer](https://github.com/postcss/autoprefixer) automatically adds
  vendor prefixes according to [Can I Use](http://caniuse.com/) rules and the
  [Browserslist](https://github.com/ai/browserslist#queries) defaults.

#### Static Files

Static files found in the `static` directory can be compiled a couple different
ways.

First for browser builds, Webpack transforms any relative path for file
extensions that use the `file-loader` into a hashed, cache-proof filename
deposited at the root of the `build/public` directory. This enables you to
`import myPNG from '../../static/images/myPng.png'` in a JavaScript file (not
implemented until server dev flow switches from babel to webpack), and Webpack
will produce a JS reference to the final hashed filename in the `build/public`
directory so that it appears as if you imported an absolute PNG filepath.
Webpack does the same thing in CSS files for relative `url()` paths and in JS
files for server builds (needed for server-side rendering).

Second for browser builds, all the contents of the `static` directory are
copied as-is to the `build/public` directory. Although this duplicates static
assets, it allows you to reference `/images/my-normal-image-name.png` if
needed. It also accomplishes required static asset paths for SEO meta tags,
`robots.txt`, `favicon.ico`, etc.

###### Image Optimization

When adding new images to `static/images`, manually run them through
[ImageOptim](https://imageoptim.com/mac) first. This keeps builds fast by not
having to use a loader like `image-webpack-loader` which would force a long
optimization on each build.

#### Offline Plugin

The [`offline-plugin`](https://www.npmjs.com/package/offline-plugin) is a
webpack loader which automatically creates a service worker script (or AppCache
manifest) and adds all webpack assets to the cache. The cache is only activated
when `NODE_ENV === 'production'` during a build, so it should not be in effect
during development.

The cache is invalidated according to the build timestamp. However, in order to
get a production build to refresh the assets, refresh the page and check the
DevTools > Application > Service Workers. The newest SW should be shown as
"Waiting" while the older should still be active. Once all tabs are closed, the
site can be reopened; and the new service worker will be active.

For more info see the [`offline-plugin` updates
doc](https://github.com/NekR/offline-plugin/blob/67cbd750f82229a41a12347d800bf3e9cc1a9ad7/docs/updates.md#serviceworker-and-appcache-update-process)

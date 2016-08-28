require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _hapi = __webpack_require__(22);
	
	var _hapi2 = _interopRequireDefault(_hapi);
	
	var _hapiReactViews = __webpack_require__(23);
	
	var _hapiReactViews2 = _interopRequireDefault(_hapiReactViews);
	
	var _good = __webpack_require__(21);
	
	var _good2 = _interopRequireDefault(_good);
	
	var _inert = __webpack_require__(24);
	
	var _inert2 = _interopRequireDefault(_inert);
	
	var _vision = __webpack_require__(28);
	
	var _vision2 = _interopRequireDefault(_vision);
	
	var _routes = __webpack_require__(9);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ENV = process.env.NODE_ENV;
	
	var server = new _hapi2.default.Server();
	
	server.connection({
	  host: '0.0.0.0',
	  port: process.env.PORT || 8000,
	  routes: {
	    cors: true
	  }
	});
	
	// Register Hapi plugins
	var plugins = [{
	  register: _inert2.default
	}, {
	  register: _vision2.default
	}, {
	  register: _good2.default,
	  options: {
	    ops: {
	      interval: 5000
	    },
	    reporters: {
	      console: [{
	        module: 'good-squeeze',
	        name: 'Squeeze',
	        args: [{ log: '*', request: '*', response: '*', error: '*' }]
	      }, {
	        module: 'good-console'
	      }, 'stdout']
	    }
	  }
	}];
	
	function startServer(done) {
	
	  return server.register(plugins, function (errorRegister) {
	
	    if (errorRegister) return server.log(['error'], errorRegister);
	
	    server.views({
	      engines: {
	        js: _hapiReactViews2.default
	      },
	      // relative to output file in build/ directory
	      relativeTo: __dirname,
	      // path: 'components',
	      path: 'views',
	      compileOptions: {
	        // layout: 'Html.js',
	        // layoutPath: Path.resolve(__dirname, 'layouts'),
	        renderMethod: 'renderToString'
	      }
	    });
	
	    server.route(_routes2.default);
	
	    return server.start(function () {
	
	      if (ENV) {
	
	        server.log(['info'], 'NODE_ENV: ' + ENV);
	      }
	      server.log(['info'], 'Server running at: ' + server.info.uri);
	
	      if (done) {
	
	        done();
	      }
	      return server;
	    });
	  });
	}
	
	if (ENV === 'production') {
	
	  startServer();
	}
	
	exports.default = startServer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var INIT_LOAD_FAIL = exports.INIT_LOAD_FAIL = 'INIT_LOAD_FAIL';
	var INIT_LOAD_START = exports.INIT_LOAD_START = 'INIT_LOAD_START';
	var INIT_LOAD_SUCCESS = exports.INIT_LOAD_SUCCESS = 'INIT_LOAD_SUCCESS';

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _boom = __webpack_require__(19);
	
	var _boom2 = _interopRequireDefault(_boom);
	
	var _fs = __webpack_require__(3);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(25);
	
	var _reactRedux = __webpack_require__(5);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactRoutes = __webpack_require__(15);
	
	var _reactRoutes2 = _interopRequireDefault(_reactRoutes);
	
	var _utils = __webpack_require__(10);
	
	var _configureStore = __webpack_require__(14);
	
	var _configureStore2 = _interopRequireDefault(_configureStore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Default render options for react templates
	// 'renderToStaticMarkup' omits react data properties
	// 'renderToString' is used for re-hydrating on client-side
	var defaultRenderOptions = {
	  runtimeOptions: {
	    docType: '<!DOCTYPE html>',
	    renderMethod: 'renderToString'
	  }
	};
	
	var routedHtml = function routedHtml(request, reply) {
	
	  // Paths relative to inside build/ only in prod
	  var assets = (0, _utils.getAssets)();
	  var cssPath = './public/styles.css';
	  if (process.env.NODE_ENV === 'development') {
	
	    cssPath = '../../build/public/styles.css';
	  }
	  var cssFile = _path2.default.resolve(__dirname, cssPath);
	  var css = '';
	
	  try {
	
	    css = _fs2.default.readFileSync(cssFile, 'utf-8');
	    request.log(['info', 'css'], css.length);
	  } catch (error) {
	
	    request.log(['error', 'css'], error);
	  }
	
	  request.log(['info'], request.url.href);
	
	  // Let react-router match the raw URL to generate the
	  // RouterContext here on the server
	  (0, _reactRouter.match)({
	    routes: _reactRoutes2.default,
	    location: request.url.href
	  }, function (error, redirectLocation, renderProps) {
	
	    if (error) {
	
	      request.log(['error', 'react-router'], error);
	      return reply(_boom2.default.serverTimeout(error));
	    } else if (redirectLocation) {
	
	      return reply.redirect(redirectLocation.pathname + redirectLocation.search).temporary();
	    } else if (renderProps) {
	
	      // Get initial store state
	      var initialState = void 0;
	      if (process.env.NODE_ENV === 'development') {
	
	        var statePath = '../../state.json';
	        var stateFile = _path2.default.resolve(__dirname, statePath);
	
	        try {
	
	          var devtoolState = JSON.parse(_fs2.default.readFileSync(stateFile, 'utf-8'));
	          var index = devtoolState.currentStateIndex;
	          initialState = devtoolState.computedStates[index].state;
	          request.log(['info', 'state'], initialState);
	        } catch (stateError) {
	
	          // This can fail silently if state.json doesn't exist
	          // request.log(['error', 'state'], stateError)
	
	        }
	      }
	      var store = (0, _configureStore2.default)(initialState);
	
	      // Get rendered router context
	      var children = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	      ));
	
	      // Get resulting store state
	      var preloadedState = store.getState();
	
	      // Inject the RouterContext into the props sent to the layout
	      var htmlProps = {
	        assets: assets,
	        children: children,
	        css: css,
	        preloadedState: preloadedState,
	        title: 'MyApp'
	      };
	
	      // Render the layout with props
	      return request.render('Html', htmlProps, defaultRenderOptions, function (errorLayout, output) {
	
	        if (errorLayout) {
	
	          request.log(['error', 'view'], errorLayout);
	          return reply(_boom2.default.serverTimeout(errorLayout));
	        }
	
	        return reply(output);
	      });
	    }
	
	    // If react-router couldn't match anything and threw no error
	    return reply(_boom2.default.notFound());
	  });
	};
	
	exports.default = routedHtml;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _html = __webpack_require__(8);
	
	var _html2 = _interopRequireDefault(_html);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = [{
	  method: 'GET',
	  path: '/static/{param*}',
	  handler: {
	    directory: {
	      path: 'build/public',
	      lookupCompressed: true
	    }
	  }
	},
	// Service workers and app cache
	{
	  method: 'GET',
	  path: '/sw.js',
	  handler: {
	    file: 'build/public/sw.js'
	  }
	}, {
	  method: 'GET',
	  path: '/appcache/{param*}',
	  handler: {
	    directory: {
	      path: 'build/public/appcache'
	    }
	  }
	},
	// Catch-all for react-router
	{
	  method: 'GET',
	  path: '/{param*}',
	  handler: _html2.default
	}];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAssets = getAssets;
	
	var _debug = __webpack_require__(20);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _fs = __webpack_require__(3);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _debug2.default)('my-app:server:utils');
	/* eslint-disable import/prefer-default-export */
	
	
	function _getAssets() {
	
	  log('Reading assets.json from filesystem');
	  var assetsFile = _path2.default.resolve(__dirname, '../build/assets.json');
	  try {
	
	    return JSON.parse(_fs2.default.readFileSync(assetsFile, 'utf-8'));
	  } catch (error) {
	
	    log('Error:', error);
	    var emptyAssets = {
	      vendor: {
	        js: ''
	      },
	      bundle: {
	        js: '',
	        css: ''
	      }
	    };
	    return emptyAssets;
	  }
	}
	
	// Cached for production
	var Assets = _getAssets();
	
	/**
	 * Returns the parsed contents of assets.json
	 *
	 * @public
	 * @returns {object} In development, reads and parses assets.json on every call.
	 * In production, reads and parses assets.json on start-up and returns from
	 * memory.
	 */
	function getAssets() {
	
	  if (process.env.NODE_ENV === 'production') {
	
	    return Assets;
	  }
	
	  return _getAssets();
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadStart = loadStart;
	exports.loadSuccess = loadSuccess;
	exports.loadFail = loadFail;
	
	var _actions = __webpack_require__(2);
	
	function loadStart() {
	
	  return {
	    type: _actions.INIT_LOAD_START
	  };
	}
	function loadSuccess() {
	
	  return {
	    type: _actions.INIT_LOAD_SUCCESS
	  };
	}
	
	function loadFail() {
	
	  return {
	    type: _actions.INIT_LOAD_FAIL
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Root = __webpack_require__(13);
	
	var _Root2 = _interopRequireDefault(_Root);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = function App(props) {
	
	  return _react2.default.createElement(
	    _Root2.default,
	    null,
	    _react2.default.createElement(
	      'div',
	      {
	        className: 'pt7 tc'
	      },
	      'This is the app.',
	      props.children
	    )
	  );
	};
	
	exports.default = App;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _reactRedux = __webpack_require__(5);
	
	var _init = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Root = function (_Component) {
	  _inherits(Root, _Component);
	
	  function Root() {
	    _classCallCheck(this, Root);
	
	    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
	  }
	
	  _createClass(Root, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dispatch = this.props.dispatch;
	
	      this.timeout = setTimeout(function () {
	
	        dispatch((0, _init.loadSuccess)());
	      }, 500);
	
	      // Can replace with API call checks in the future:
	      // {
	      //   loadedChannels: true,
	      //   loadedMessages: true,
	      // }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	
	      clearTimeout(this.timeout);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	
	      if (this.props.children) return this.props.children;
	      return null;
	    }
	  }]);
	
	  return Root;
	}(_react.Component);
	
	function mapStateToProps(state) {
	  var init = state.init;
	
	
	  return {
	    init: init
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Root);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	/* eslint-disable arrow-body-style */
	// import Debug from 'debug'
	// import { browserHistory } from 'react-router'
	// import { routerMiddleware } from 'react-router-redux'
	
	
	var _redux = __webpack_require__(7);
	
	var _reduxLogger = __webpack_require__(26);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reduxThunk = __webpack_require__(27);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _index = __webpack_require__(16);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(initialState) {
	
	  // only log redux actions in development
	  var middleware = [
	  // routerMiddleware(browserHistory),
	  _reduxThunk2.default];
	
	  if (process.env.NODE_ENV === 'development') {
	
	    // logger needs to be last
	    middleware.push((0, _reduxLogger2.default)());
	  }
	
	  var store = (0, _redux.createStore)(_index2.default, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware),
	
	  // https://github.com/zalmoxisus/redux-devtools-extension
	  (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
	    return f;
	  }));
	
	  // Enable Webpack hot module replacement for reducers
	  // if (module.hot) {
	
	  //   log('Module is hot!')
	  //   module.hot.accept('../reducers', () => {
	
	  //     const nextRootReducer = rootReducer
	  //     store.replaceReducer(nextRootReducer)
	
	  //   })
	
	  // }
	
	  return store;
	}
	
	exports.default = configureStore;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _App = __webpack_require__(12);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Walkie from './components/Walkie.js'
	
	var routes = _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default });
	exports.default = routes;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(7);
	
	var _init = __webpack_require__(17);
	
	var _init2 = _interopRequireDefault(_init);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rootReducer = (0, _redux.combineReducers)({
	  init: _init2.default
	});
	
	exports.default = rootReducer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialState = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _actions = __webpack_require__(2);
	
	// import { Map } from 'immutable'
	// import Debug from 'debug'
	
	// const log = Debug('my-app')
	
	
	var initialState = exports.initialState = {
	  isLoading: false,
	  loaded: false
	};
	
	function init() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	
	  // TODO: use global error reducer to catch all failure actions
	  // if (action.error) {
	
	  //   log('error:', action.error)
	
	  // }
	
	  switch (action.type) {
	
	    case _actions.INIT_LOAD_SUCCESS:
	      return _extends({}, state, {
	        isLoading: false,
	        loaded: true
	      });
	
	    case _actions.INIT_LOAD_START:
	      return _extends({}, state, {
	        isLoading: true,
	        loaded: false
	      });
	
	    case _actions.INIT_LOAD_FAIL:
	      return _extends({}, state, {
	        isLoading: false,
	        loaded: false
	      });
	
	    default:
	      return state;
	
	  }
	}
	
	exports.default = init;

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports) {

	module.exports = require("boom");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("hapi-react-views");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("vision");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map
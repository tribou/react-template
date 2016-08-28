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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _variables = __webpack_require__(18);
	
	var _variables2 = _interopRequireDefault(_variables);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	  assets: _react.PropTypes.shape({
	    bundle: _react.PropTypes.shape({
	      js: _react.PropTypes.string.isRequired
	    }),
	    vendor: _react.PropTypes.shape({
	      js: _react.PropTypes.string.isRequired
	    })
	  }),
	  css: _react.PropTypes.string.isRequired,
	  children: _react.PropTypes.any,
	  preloadedState: _react.PropTypes.object,
	  title: _react.PropTypes.string
	};
	
	var Html = function (_Component) {
	  _inherits(Html, _Component);
	
	  function Html() {
	    _classCallCheck(this, Html);
	
	    return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
	  }
	
	  _createClass(Html, [{
	    key: 'generatePreloadScript',
	    value: function generatePreloadScript(preloadedState) {
	
	      return 'window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	
	      var themeColor = _variables2.default.colorTheme;
	      var title = this.props.title;
	
	      var bundle = this.props.assets.bundle.js;
	      var vendor = this.props.assets.vendor.js;
	
	      var css = _react2.default.createElement('style', {
	        dangerouslySetInnerHTML: { __html: this.props.css }
	      });
	
	      var preloadScript = this.generatePreloadScript(this.props.preloadedState);
	
	      return _react2.default.createElement(
	        'html',
	        { lang: 'en' },
	        _react2.default.createElement(
	          'head',
	          null,
	          _react2.default.createElement('meta', { charSet: 'utf-8' }),
	          _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
	          _react2.default.createElement('meta', {
	            name: 'viewport',
	            content: 'width=device-width, initial-scale=1.0 maximum-scale=1.0'
	          }),
	          _react2.default.createElement('meta', {
	            name: 'description',
	            content: 'The best app ever.'
	          }),
	          _react2.default.createElement('meta', {
	            property: 'og:description',
	            content: 'The best app ever.'
	          }),
	          _react2.default.createElement('meta', { property: 'og:image', content: '/img/logo.png' }),
	          _react2.default.createElement('meta', { property: 'og:url', content: 'http://www.example.com' }),
	          _react2.default.createElement('meta', { name: 'msapplication-TileColor', content: themeColor }),
	          _react2.default.createElement('meta', { name: 'msapplication-TileImage', content: '/img/logo.png' }),
	          _react2.default.createElement('meta', { name: 'theme-color', content: themeColor }),
	          _react2.default.createElement(
	            'title',
	            null,
	            title
	          ),
	          _react2.default.createElement('link', { rel: 'shortcut icon', href: '/img/icon.png' }),
	          _react2.default.createElement('link', { rel: 'apple-touch-icon', href: '/img/logo.png' }),
	          _react2.default.createElement('link', { rel: 'apple-touch-icon-precomposed', href: '/img/logo@152.png' }),
	          css
	        ),
	        _react2.default.createElement(
	          'body',
	          null,
	          _react2.default.createElement('div', {
	            id: 'react-mount',
	            dangerouslySetInnerHTML: { __html: this.props.children }
	          }),
	          _react2.default.createElement('script', {
	            id: 'app-state',
	            type: 'application/javascript',
	            dangerouslySetInnerHTML: { __html: preloadScript }
	          }),
	          _react2.default.createElement('script', {
	            type: 'application/javascript',
	            src: vendor
	          }),
	          _react2.default.createElement('script', {
	            type: 'application/javascript',
	            src: bundle
	          })
	        )
	      );
	    }
	  }]);
	
	  return Html;
	}(_react.Component);
	
	Html.propTypes = propTypes;
	
	exports.default = Html;

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 18:
/***/ function(module, exports) {

	'use strict';
	
	// Global CSS variables passed via precss > postcss-custom-properties
	// https://github.com/postcss/postcss-custom-properties#variables
	
	var variables = {
	
	  colorDark: '#000000',
	  colorDarkFaded: 'rgba(0, 0, 0, 0.5)',
	  colorTheme: '#9F26B5',
	  colorThemeFaded: 'RGBA(159, 38, 181, 0.5)',
	  colorThemeSecondary: '#F38B00',
	  colorThemeTertiary: '#57C1E8',
	  colorGrayDark: '#e4e4e4',
	  colorGrayLight: '#f6f6f6',
	  colorWhite: '#ffffff',
	  colorWhiteFaded: 'rgba(255, 255, 255, 0.5)',
	
	  fontFamily: 'MyApp, Verdana, Sans-Serif',
	  fontWeight: 400,
	
	  imageLogoLgWidth: '519px',
	  imageLogoLgHeight: '537px',
	  imageMenuSettingsWidth: '60px',
	  imageMenuSettingsHeight: '75px',
	  imageNavMenuWidth: '51px',
	  imageNavMenuHeight: '66px',
	  imageTabAddWhiteWidth: '72px',
	  imageTabAddWhiteHeight: '75px',
	
	  screenLgMax: '1199px',
	  screenLgMaxHeight: '800px',
	  screenLgMin: '1200px',
	  screenMdMax: '1023px',
	  screenMdMin: '1024px',
	  screenSmMax: '767px',
	  screenSmMin: '768px',
	  screenXsMax: '320px',
	  screenXsMin: '321px',
	
	  zHeader: 10,
	  zModal: 50,
	  zModalBackdrop: 40
	
	};
	
	module.exports = variables;

/***/ }

/******/ });
//# sourceMappingURL=Html.js.map
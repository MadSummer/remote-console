'use strict';

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports) {

	'use strict';

	;(function (globle, undefined) {
		function RemoteConsole(obj) {
			this.config = obj;
			this.config.url = window.location.href;
		}
		RemoteConsole.prototype = {
			init: function init() {
				if (this.isPC() && !this.config.pc) return;
				if (!this.check()) return alert('浏览器不支持console');
				try {
					this.io();
					this.override();
				} catch (error) {}
			},
			check: function check() {
				try {
					console.log('😀😀😀😀');
					return true;
				} catch (error) {
					return false;
				}
			},
			override: function override() {
				var types = {
					_log: console.log,
					_info: console.info,
					_warn: console.warn,
					_error: console.error
				};
				var config = this.config;

				var _loop = function _loop(x) {
					var type = x.replace('_', '');
					console[type] = function () {
						var argsArr = [].concat(Array.prototype.slice.call(arguments));
						var clone = argsArr.map(function (v, i) {
							return v instanceof Object ? Object.create(v).__proto__ : v;
						});
						types[x].apply(console[type], argsArr);
						socket.emit('console', {
							type: type,
							console: clone,
							name: config.name
						});
					};
				};

				for (var x in types) {
					_loop(x);
				}
				if (window.onerror) {
					olderror = window.onerror;
					window.onerror = function (msg, url, line, col, error) {
						olderror.apply(null, Array.from(arguments));
						var err = msg + ' in ' + url + ' \n at line ' + line + ' and col ' + col + ' \n ';
						console.error(err);
					};
				} else {
					window.onerror = function (msg, url, line, col, error) {
						var err = msg + ' in ' + url + ' \n at line ' + line + ' and col ' + col + ' \n ';
						console.error(err);
					};
				}
			},
			io: function (_io) {
				function io() {
					return _io.apply(this, arguments);
				}

				io.toString = function () {
					return _io.toString();
				};

				return io;
			}(function () {
				if (!window.io) return;
				window.socket = io.connect(this.config.host);
				socket.on('run', function (code) {
					eval(code);
				});
				var config = this.config;
				socket.on('connected', function () {
					socket.emit('register', config);
				});
			}),
			isPC: function isPC() {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
					return false;
				} else {
					return true;
				}
			}
		};
		globle.rc = {
			init: function init(obj) {
				var rc = new RemoteConsole(obj);
				rc.init();
			}
		};
	})(window, undefined);

	/***/
}
/******/]);
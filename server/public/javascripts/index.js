'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
		}
		RemoteConsole.prototype = {
			init: function init() {
				if (!this.check()) return;
				if (this.config.upload) {
					this.io();
				}
				this.override();
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

				var _loop = function _loop(x) {
					var type = x.replace('_', '');
					console[type] = function () {
						var args = arguments;
						if (args.length == 1) {
							types[x](args[0]);
						} else {
							var flag = [].concat(_toConsumableArray(args)).every(function (t, i) {
								return typeof t === 'string';
							});
							if (flag) {
								types[x]([].concat(_toConsumableArray(args)).toString());
							} else {
								types[x]([].concat(_toConsumableArray(args)));
							}
						}
					};
				};

				for (var x in types) {
					_loop(x);
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
				socket.on('run', function (data) {
					try {
						eval(data);
					} catch (error) {
						console.log(error);
					}
				});
				socket.emit('conn', this.config.ext);
			})
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
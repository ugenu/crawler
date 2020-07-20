"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = void 0;

var _events = require("events");

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = require("cheerio");

var _electrolizer = require("@ugenu.io/electrolizer");

var Selectorizor = _interopRequireWildcard(require("./selectorizor"));

var Inject = _interopRequireWildcard(require("./inject"));

var _logger = _interopRequireDefault(require("@ugenu.io/logger"));

var UserIntervention = _interopRequireWildcard(require("./user-intervention"));

var _electron = require("electron");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = (0, _logger["default"])(['crawler', 'context'], process.env.DEBUG ? "debug" : "info");

var Context =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Context, _EventEmitter);

  /**
   * the http module to request pages / crawl
   */

  /**
   * the (headless) browser module capable of making browser crawling
   */

  /**
   * custom module to return an array of scraped values based on rules
   * @see Selectorizor.Instruction
   */

  /**
   * optional data to be preserved throughout the crawling process
   */

  /**
   * timeout to wait for user intervention
   */
  function Context(options) {
    var _this;

    _classCallCheck(this, Context);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Context).call(this));
    _this.options = options;

    _defineProperty(_assertThisInitialized(_this), "http", void 0);

    _defineProperty(_assertThisInitialized(_this), "browser", void 0);

    _defineProperty(_assertThisInitialized(_this), "selectorizor", void 0);

    _defineProperty(_assertThisInitialized(_this), "data", void 0);

    _defineProperty(_assertThisInitialized(_this), "userInterventionTimeout", 1000 * 60 * 60);

    _defineProperty(_assertThisInitialized(_this), "inject", void 0);

    _this.applyOptions();

    return _this;
  }

  _createClass(Context, [{
    key: "defaultElectrolizerBus",
    value: function defaultElectrolizerBus() {
      return _electron.webviewTag;
    }
    /**
     * applies the user options to context options
     */

  }, {
    key: "applyOptions",
    value: function applyOptions() {
      logger.debug("applying options %o", this.options);
      var axiosOptions = this.options ? this.options.http || {} : {};
      var electrolizerBus = this.options ? this.options.browser || this.defaultElectrolizerBus() : this.defaultElectrolizerBus();
      var injectOptions = this.options ? this.options.inject || [] : [];
      this.inject = injectOptions;
      this.http = _axios["default"].create(axiosOptions);
      this.browser = new _electrolizer.Electrolizer(electrolizerBus);
      this.selectorizor = Selectorizor.CreateSelectorizor(this);

      if (this.options && this.options.data) {
        this.data = this.options.data;
      }

      if (this.options && this.options.userInterventionTimeout) {
        this.userInterventionTimeout = this.options.userInterventionTimeout;
      }

      ;
    }
    /**
     * injects the targets that were created during construction
     */

  }, {
    key: "injectTargets",
    value: function () {
      var _injectTargets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Inject.Inject(this.inject, this);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function injectTargets() {
        return _injectTargets.apply(this, arguments);
      }

      return injectTargets;
    }()
    /**
     * powerhouse function that allows for intervention in case the crawlr cannot proceed
     * emits the 'request-user-intervention' event with the promise resolve and reject handlers
     * use this event to open up the contexts browser and complete a CAPTCHA, etc. run the resolve to finish and resume crawling
     * @emits request-user-intervention
     */

  }, {
    key: "requestUserIntervention",
    value: function () {
      var _requestUserIntervention = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(message, timeout) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return UserIntervention.Request(this, message, timeout);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function requestUserIntervention(_x, _x2) {
        return _requestUserIntervention.apply(this, arguments);
      }

      return requestUserIntervention;
    }()
    /**
     * resets the context 
     * can remove listeners with the hard option (probably shouldn't)
     * @param hard 
     */

  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var hard,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                hard = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
                logger.verbose('resetting the context');
                _context3.next = 4;
                return this.teardown();

              case 4:
                if (hard) {
                  this.removeAllListeners();
                }

                this.applyOptions();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
    /**
     * tears down the browser context
     */

  }, {
    key: "teardown",
    value: function () {
      var _teardown = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                logger.verbose('tearing down browser');
                _context4.next = 3;
                return this.browser.end();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function teardown() {
        return _teardown.apply(this, arguments);
      }

      return teardown;
    }()
    /**
     * async delay function
     * @param ms 
     */

  }, {
    key: "delay",
    value: function () {
      var _delay = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(ms) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return new Promise(function (resolve, reject) {
                  setTimeout(resolve, ms);
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function delay(_x3) {
        return _delay.apply(this, arguments);
      }

      return delay;
    }()
    /**
     * gets the current browser html
     */

  }, {
    key: "html",
    value: function () {
      var _html = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.browser.html();

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function html() {
        return _html.apply(this, arguments);
      }

      return html;
    }()
    /**
     * turns the html (provided or from browser) into a cheerio instance
     * @param providedHtml 
     */

  }, {
    key: "$",
    value: function () {
      var _$ = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(providedHtml) {
        var html;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!providedHtml) {
                  _context7.next = 4;
                  break;
                }

                _context7.t0 = providedHtml;
                _context7.next = 7;
                break;

              case 4:
                _context7.next = 6;
                return this.html();

              case 6:
                _context7.t0 = _context7.sent;

              case 7:
                html = _context7.t0;
                return _context7.abrupt("return", (0, _cheerio.load)(html));

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function $(_x4) {
        return _$.apply(this, arguments);
      }

      return $;
    }()
  }]);

  return Context;
}(_events.EventEmitter);

exports.Context = Context;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L2NvbnRleHQuY2xhc3MudHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiQ29udGV4dCIsIm9wdGlvbnMiLCJhcHBseU9wdGlvbnMiLCJ3ZWJ2aWV3VGFnIiwiZGVidWciLCJheGlvc09wdGlvbnMiLCJodHRwIiwiZWxlY3Ryb2xpemVyQnVzIiwiYnJvd3NlciIsImRlZmF1bHRFbGVjdHJvbGl6ZXJCdXMiLCJpbmplY3RPcHRpb25zIiwiaW5qZWN0IiwiYXhpb3MiLCJjcmVhdGUiLCJFbGVjdHJvbGl6ZXIiLCJzZWxlY3Rvcml6b3IiLCJTZWxlY3Rvcml6b3IiLCJDcmVhdGVTZWxlY3Rvcml6b3IiLCJkYXRhIiwidXNlckludGVydmVudGlvblRpbWVvdXQiLCJJbmplY3QiLCJtZXNzYWdlIiwidGltZW91dCIsIlVzZXJJbnRlcnZlbnRpb24iLCJSZXF1ZXN0IiwiaGFyZCIsInZlcmJvc2UiLCJ0ZWFyZG93biIsInJlbW92ZUFsbExpc3RlbmVycyIsImVuZCIsIm1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiaHRtbCIsInByb3ZpZGVkSHRtbCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyx3QkFBTyxDQUFDLFNBQUQsRUFBWSxTQUFaLENBQVAsRUFBK0JDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxLQUFaLEdBQW9CLE9BQXBCLEdBQThCLE1BQTdELENBQWY7O0lBdURhQyxPOzs7OztBQUNYOzs7O0FBS0E7Ozs7QUFLQTs7Ozs7QUFNQTs7OztBQUtBOzs7QUFPQSxtQkFBc0JDLE9BQXRCLEVBQTJDO0FBQUE7O0FBQUE7O0FBQ3pDO0FBRHlDLFVBQXJC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ZW50IjpbImltcG9ydCB7IE9wdGlvbnMgfSBmcm9tIFwiLi9vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IGxvYWQgfSBmcm9tIFwiY2hlZXJpb1wiO1xuaW1wb3J0IHsgRWxlY3Ryb2xpemVyIH0gZnJvbSAnQHVnZW51LmlvL2VsZWN0cm9saXplcic7XG5pbXBvcnQgKiBhcyBTZWxlY3Rvcml6b3IgZnJvbSBcIi4vc2VsZWN0b3Jpem9yXCI7XG5pbXBvcnQgKiBhcyBJbmplY3QgZnJvbSBcIi4vaW5qZWN0XCI7XG5pbXBvcnQgKiBhcyBSb3V0aW5lcyBmcm9tICcuLi9yb3V0aW5lJ1xuaW1wb3J0IExvZ2dlciBmcm9tICdAdWdlbnUuaW8vbG9nZ2VyJ1xuaW1wb3J0ICogYXMgVXNlckludGVydmVudGlvbiBmcm9tIFwiLi91c2VyLWludGVydmVudGlvblwiO1xuaW1wb3J0IHsgV2Vidmlld1RhZywgd2Vidmlld1RhZyB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoWydjcmF3bGVyJywgJ2NvbnRleHQnXSwgcHJvY2Vzcy5lbnYuREVCVUcgPyBcImRlYnVnXCIgOiBcImluZm9cIik7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBDb250ZXh0PFQ+IHtcbiAgLyoqXG4gICAqIHRoZSBldmVudCB0aGF0IHdpbGwgYmUgZW1pdHRlZCB3aGVuIGEgdXNlciBuZWVkcyB0byBpbnRlcnZlbmVcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gaGFuZGxlciBcbiAgICovXG4gIG9uKGV2ZW50OiAncmVxdWVzdC11c2VyLWludGVydmVudGlvbicsIGhhbmRsZXI6ICh0aGlzOiBDb250ZXh0PFQ+LCBtZXNzYWdlOiBVc2VySW50ZXJ2ZW50aW9uLk1lc3NhZ2UsIHJlc29sdmU6IFVzZXJJbnRlcnZlbnRpb24uSW50ZXJ2ZW50aW9uLCByZWplY3Q6IFVzZXJJbnRlcnZlbnRpb24uSW50ZXJ2ZW50aW9uKSA9PiBQcm9taXNlPHZvaWQ+KTogdGhpcztcblxuICAvKipcbiAgICogdGhlIGVycm9yIGV2ZW50IHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgY3Jhd2xpbmcgcHJvY2Vzc1xuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqIEBwYXJhbSBoYW5kbGVyIFxuICAgKi9cbiAgb24oZXZlbnQ6ICdlcnJvcicsIGhhbmRsZXI6IChlcnJvcjogRXJyb3IsIHN0YWdlOiBSb3V0aW5lcy5TdGFnZXMpID0+IHZvaWQpOiB0aGlzO1xuXG4gIC8qKlxuICAgKiB0aGUgZXZlbnQgdGhhdCB3aWxsIG9jY3VyIHdoZW4gdGhlIGNvbnRleHQgcmVhY2hlcyBkaWZmZXJlbnQgc3RhZ2VzIHdoaWxlIGJlaW5nIHJ1blxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqIEBwYXJhbSBoYW5kbGVyIFxuICAgKi9cbiAgb24oZXZlbnQ6IFJvdXRpbmVzLlN0YWdlcywgaGFuZGxlcjogKCkgPT4gdm9pZCk6IHRoaXNcbiAgXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gaGFuZGxlciBcbiAgICovXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdGhpcztcblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIGVtaXQoZXZlbnQ6IFJvdXRpbmVzLlN0YWdlcyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqIEBwYXJhbSBlcnJvciBcbiAgICogQHBhcmFtIHN0YWdlIFxuICAgKi9cbiAgZW1pdChldmVudDogJ2Vycm9yJywgZXJyb3I6IEVycm9yLCBzdGFnZTogUm91dGluZXMuU3RhZ2VzKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hhdCB0aGUgY29udGV4dCB3aWxsIGVtaXQgd2hlbiBhIHRoZSB1c2VyIG5lZWRzIHRvIGludGVyYWN0IHdpdGggdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICogQHBhcmFtIHJlc29sdmUgXG4gICAqIEBwYXJhbSByZWplY3QgXG4gICAqL1xuICBlbWl0KGV2ZW50OiAncmVxdWVzdC11c2VyLWludGVydmVudGlvbicsIG1lc3NhZ2U6ICBVc2VySW50ZXJ2ZW50aW9uLk1lc3NhZ2UsIHJlc29sdmU6IFVzZXJJbnRlcnZlbnRpb24uSW50ZXJ2ZW50aW9uLCByZWplY3Q6IFVzZXJJbnRlcnZlbnRpb24uSW50ZXJ2ZW50aW9uKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQ8VD4gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogdGhlIGh0dHAgbW9kdWxlIHRvIHJlcXVlc3QgcGFnZXMgLyBjcmF3bFxuICAgKi9cbiAgaHR0cCE6IEF4aW9zSW5zdGFuY2VcblxuICAvKipcbiAgICogdGhlIChoZWFkbGVzcykgYnJvd3NlciBtb2R1bGUgY2FwYWJsZSBvZiBtYWtpbmcgYnJvd3NlciBjcmF3bGluZ1xuICAgKi9cbiAgYnJvd3NlciE6IEVsZWN0cm9saXplcjxhbnk+XG5cbiAgLyoqXG4gICAqIGN1c3RvbSBtb2R1bGUgdG8gcmV0dXJuIGFuIGFycmF5IG9mIHNjcmFwZWQgdmFsdWVzIGJhc2VkIG9uIHJ1bGVzXG4gICAqIEBzZWUgU2VsZWN0b3Jpem9yLkluc3RydWN0aW9uXG4gICAqL1xuICBzZWxlY3Rvcml6b3IhOiBTZWxlY3Rvcml6b3IuU2VsZWN0b3Jpem9yQ29udGV4dEluamVjdGVkXG5cbiAgLyoqXG4gICAqIG9wdGlvbmFsIGRhdGEgdG8gYmUgcHJlc2VydmVkIHRocm91Z2hvdXQgdGhlIGNyYXdsaW5nIHByb2Nlc3NcbiAgICovXG4gIGRhdGEhOiBUXG5cbiAgLyoqXG4gICAqIHRpbWVvdXQgdG8gd2FpdCBmb3IgdXNlciBpbnRlcnZlbnRpb25cbiAgICovXG4gIHVzZXJJbnRlcnZlbnRpb25UaW1lb3V0OiBudW1iZXIgPSAxMDAwICogNjAgKiA2MDtcbiAgXG4gIHByaXZhdGUgaW5qZWN0ITogSW5qZWN0LlRhcmdldFtdXG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM/OiBPcHRpb25zPFQ+KXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXBwbHlPcHRpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIGRlZmF1bHRFbGVjdHJvbGl6ZXJCdXMoKTogV2Vidmlld1RhZyB7XG4gICAgcmV0dXJuIHdlYnZpZXdUYWc7XG4gIH1cblxuICAvKipcbiAgICogYXBwbGllcyB0aGUgdXNlciBvcHRpb25zIHRvIGNvbnRleHQgb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBhcHBseU9wdGlvbnMoKXtcbiAgICBsb2dnZXIuZGVidWcoYGFwcGx5aW5nIG9wdGlvbnMgJW9gLCB0aGlzLm9wdGlvbnMpO1xuICAgIGxldCBheGlvc09wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMuaHR0cCB8fCB7fSA6IHt9O1xuICAgIGxldCBlbGVjdHJvbGl6ZXJCdXMgPSB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMuYnJvd3NlciB8fCB0aGlzLmRlZmF1bHRFbGVjdHJvbGl6ZXJCdXMoKSA6IHRoaXMuZGVmYXVsdEVsZWN0cm9saXplckJ1cygpO1xuICAgIGxldCBpbmplY3RPcHRpb25zID0gdGhpcy5vcHRpb25zPyB0aGlzLm9wdGlvbnMuaW5qZWN0IHx8IFtdIDogW107XG5cbiAgICB0aGlzLmluamVjdCA9IGluamVjdE9wdGlvbnM7XG4gICAgdGhpcy5odHRwID0gYXhpb3MuY3JlYXRlKGF4aW9zT3B0aW9ucyk7XG4gICAgXG4gICAgdGhpcy5icm93c2VyID0gbmV3IEVsZWN0cm9saXplcihlbGVjdHJvbGl6ZXJCdXMpO1xuICAgIHRoaXMuc2VsZWN0b3Jpem9yID0gU2VsZWN0b3Jpem9yLkNyZWF0ZVNlbGVjdG9yaXpvcih0aGlzKTtcbiAgICBcbiAgICBpZih0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmRhdGEpe1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5vcHRpb25zLmRhdGE7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy51c2VySW50ZXJ2ZW50aW9uVGltZW91dCl7IHRoaXMudXNlckludGVydmVudGlvblRpbWVvdXQgPSB0aGlzLm9wdGlvbnMudXNlckludGVydmVudGlvblRpbWVvdXQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbmplY3RzIHRoZSB0YXJnZXRzIHRoYXQgd2VyZSBjcmVhdGVkIGR1cmluZyBjb25zdHJ1Y3Rpb25cbiAgICovXG4gIGFzeW5jIGluamVjdFRhcmdldHMoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gYXdhaXQgSW5qZWN0LkluamVjdCh0aGlzLmluamVjdCwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcG93ZXJob3VzZSBmdW5jdGlvbiB0aGF0IGFsbG93cyBmb3IgaW50ZXJ2ZW50aW9uIGluIGNhc2UgdGhlIGNyYXdsciBjYW5ub3QgcHJvY2VlZFxuICAgKiBlbWl0cyB0aGUgJ3JlcXVlc3QtdXNlci1pbnRlcnZlbnRpb24nIGV2ZW50IHdpdGggdGhlIHByb21pc2UgcmVzb2x2ZSBhbmQgcmVqZWN0IGhhbmRsZXJzXG4gICAqIHVzZSB0aGlzIGV2ZW50IHRvIG9wZW4gdXAgdGhlIGNvbnRleHRzIGJyb3dzZXIgYW5kIGNvbXBsZXRlIGEgQ0FQVENIQSwgZXRjLiBydW4gdGhlIHJlc29sdmUgdG8gZmluaXNoIGFuZCByZXN1bWUgY3Jhd2xpbmdcbiAgICogQGVtaXRzIHJlcXVlc3QtdXNlci1pbnRlcnZlbnRpb25cbiAgICovXG4gIGFzeW5jIHJlcXVlc3RVc2VySW50ZXJ2ZW50aW9uKG1lc3NhZ2U/OiBVc2VySW50ZXJ2ZW50aW9uLk1lc3NhZ2UsIHRpbWVvdXQ/OiBudW1iZXIpe1xuICAgIGF3YWl0IFVzZXJJbnRlcnZlbnRpb24uUmVxdWVzdCh0aGlzLCBtZXNzYWdlLCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldHMgdGhlIGNvbnRleHQgXG4gICAqIGNhbiByZW1vdmUgbGlzdGVuZXJzIHdpdGggdGhlIGhhcmQgb3B0aW9uIChwcm9iYWJseSBzaG91bGRuJ3QpXG4gICAqIEBwYXJhbSBoYXJkIFxuICAgKi9cbiAgYXN5bmMgcmVzZXQoaGFyZDogYm9vbGVhbiA9IGZhbHNlKXtcbiAgICBsb2dnZXIudmVyYm9zZSgncmVzZXR0aW5nIHRoZSBjb250ZXh0Jyk7XG4gICAgYXdhaXQgdGhpcy50ZWFyZG93bigpO1xuICAgIGlmKGhhcmQpeyB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpIH1cbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRlYXJzIGRvd24gdGhlIGJyb3dzZXIgY29udGV4dFxuICAgKi9cbiAgYXN5bmMgdGVhcmRvd24oKTogUHJvbWlzZTx2b2lkPntcbiAgICBsb2dnZXIudmVyYm9zZSgndGVhcmluZyBkb3duIGJyb3dzZXInKTtcbiAgICBhd2FpdCB0aGlzLmJyb3dzZXIuZW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogYXN5bmMgZGVsYXkgZnVuY3Rpb25cbiAgICogQHBhcmFtIG1zIFxuICAgKi9cbiAgYXN5bmMgZGVsYXkobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldHMgdGhlIGN1cnJlbnQgYnJvd3NlciBodG1sXG4gICAqL1xuICBhc3luYyBodG1sKCk6IFByb21pc2U8c3RyaW5nPntcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5icm93c2VyLmh0bWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0dXJucyB0aGUgaHRtbCAocHJvdmlkZWQgb3IgZnJvbSBicm93c2VyKSBpbnRvIGEgY2hlZXJpbyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcHJvdmlkZWRIdG1sIFxuICAgKi9cbiAgYXN5bmMgJChwcm92aWRlZEh0bWw/OiBzdHJpbmcpOiBQcm9taXNlPENoZWVyaW9TdGF0aWM+e1xuICAgIGxldCBodG1sID0gcHJvdmlkZWRIdG1sID8gcHJvdmlkZWRIdG1sIDogYXdhaXQgdGhpcy5odG1sKCk7XG4gICAgcmV0dXJuIGxvYWQoaHRtbCk7XG4gIH1cbn1cblxuIl19
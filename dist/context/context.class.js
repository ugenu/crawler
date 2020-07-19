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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
        var targets;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                targets = _toConsumableArray(this.inject);
                logger.verbose('adding jquery to injection targets');
                targets.push({
                  src: require.resolve('jquery'),
                  name: 'jQuery',
                  test: function test() {
                    //@ts-ignore
                    window.noGlobal = false; //@ts-ignore

                    var exists = typeof window.jQuery !== "undefined";
                    return exists;
                  }
                });
                _context.next = 5;
                return Inject.Inject(targets, this);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L2NvbnRleHQuY2xhc3MudHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiQ29udGV4dCIsIm9wdGlvbnMiLCJhcHBseU9wdGlvbnMiLCJ3ZWJ2aWV3VGFnIiwiZGVidWciLCJheGlvc09wdGlvbnMiLCJodHRwIiwiZWxlY3Ryb2xpemVyQnVzIiwiYnJvd3NlciIsImRlZmF1bHRFbGVjdHJvbGl6ZXJCdXMiLCJpbmplY3RPcHRpb25zIiwiaW5qZWN0IiwiYXhpb3MiLCJjcmVhdGUiLCJFbGVjdHJvbGl6ZXIiLCJzZWxlY3Rvcml6b3IiLCJTZWxlY3Rvcml6b3IiLCJDcmVhdGVTZWxlY3Rvcml6b3IiLCJkYXRhIiwidXNlckludGVydmVudGlvblRpbWVvdXQiLCJ0YXJnZXRzIiwidmVyYm9zZSIsInB1c2giLCJzcmMiLCJyZXF1aXJlIiwicmVzb2x2ZSIsIm5hbWUiLCJ0ZXN0Iiwid2luZG93Iiwibm9HbG9iYWwiLCJleGlzdHMiLCJqUXVlcnkiLCJJbmplY3QiLCJtZXNzYWdlIiwidGltZW91dCIsIlVzZXJJbnRlcnZlbnRpb24iLCJSZXF1ZXN0IiwiaGFyZCIsInRlYXJkb3duIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW5kIiwibXMiLCJQcm9taXNlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsImh0bWwiLCJwcm92aWRlZEh0bWwiLCJFdmVudEVtaXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyx3QkFBTyxDQUFDLFNBQUQsRUFBWSxTQUFaLENBQVAsRUFBK0JDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxLQUFaLEdBQW9CLE9BQXBCLEdBQThCLE1BQTdELENBQWY7O0lBdURhQyxPOzs7OztB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QUFNLENBQUN5QixPQUFQLENBQWUsc0JBQWY7O3VCQUNNLEtBQUtiLE9BQUwsQ0FBYWdDLEdBQWIsRTs7Ozs7Ozs7Ozs7Ozs7OztBQUdSOzs7Ozs7Ozs7O2dEQUlZQyxFOzs7Ozs7dUJBQ0osSUFBSUMsT0FBSixDQUFZLFVBQUNqQixPQUFELEVBQVVrQixNQUFWLEVBQXFCO0FBQ3JDQyxrQkFBQUEsVUFBVSxDQUFDbkIsT0FBRCxFQUFVZ0IsRUFBVixDQUFWO0FBQ0QsaUJBRkssQzs7Ozs7Ozs7Ozs7Ozs7OztBQUtSOzs7Ozs7Ozs7Ozs7Ozs7dUJBSWUsS0FBS2pDLE9BQUwsQ0FBYXFDLElBQWIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdmOzs7Ozs7Ozs7O2dEQUlRQyxZOzs7Ozs7cUJBQ0tBLFk7Ozs7OytCQUFlQSxZOzs7Ozs7dUJBQXFCLEtBQUtELElBQUwsRTs7Ozs7O0FBQTNDQSxnQkFBQUEsSTtrREFDRyxtQkFBS0EsSUFBTCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeElxQkUsb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBsb2FkIH0gZnJvbSBcImNoZWVyaW9cIjtcbmltcG9ydCB7IEVsZWN0cm9saXplciB9IGZyb20gJ0B1Z2VudS5pby9lbGVjdHJvbGl6ZXInO1xuaW1wb3J0ICogYXMgU2VsZWN0b3Jpem9yIGZyb20gXCIuL3NlbGVjdG9yaXpvclwiO1xuaW1wb3J0ICogYXMgSW5qZWN0IGZyb20gXCIuL2luamVjdFwiO1xuaW1wb3J0ICogYXMgUm91dGluZXMgZnJvbSAnLi4vcm91dGluZSdcbmltcG9ydCBMb2dnZXIgZnJvbSAnQHVnZW51LmlvL2xvZ2dlcidcbmltcG9ydCAqIGFzIFVzZXJJbnRlcnZlbnRpb24gZnJvbSBcIi4vdXNlci1pbnRlcnZlbnRpb25cIjtcbmltcG9ydCB7IFdlYnZpZXdUYWcsIHdlYnZpZXdUYWcgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyKFsnY3Jhd2xlcicsICdjb250ZXh0J10sIHByb2Nlc3MuZW52LkRFQlVHID8gXCJkZWJ1Z1wiIDogXCJpbmZvXCIpO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQ29udGV4dDxUPiB7XG4gIC8qKlxuICAgKiB0aGUgZXZlbnQgdGhhdCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiBhIHVzZXIgbmVlZHMgdG8gaW50ZXJ2ZW5lXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICogQHBhcmFtIGhhbmRsZXIgXG4gICAqL1xuICBvbihldmVudDogJ3JlcXVlc3QtdXNlci1pbnRlcnZlbnRpb24nLCBoYW5kbGVyOiAodGhpczogQ29udGV4dDxUPiwgbWVzc2FnZTogVXNlckludGVydmVudGlvbi5NZXNzYWdlLCByZXNvbHZlOiBVc2VySW50ZXJ2ZW50aW9uLkludGVydmVudGlvbiwgcmVqZWN0OiBVc2VySW50ZXJ2ZW50aW9uLkludGVydmVudGlvbikgPT4gUHJvbWlzZTx2b2lkPik6IHRoaXM7XG5cbiAgLyoqXG4gICAqIHRoZSBlcnJvciBldmVudCB3aGVuIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGNyYXdsaW5nIHByb2Nlc3NcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gaGFuZGxlciBcbiAgICovXG4gIG9uKGV2ZW50OiAnZXJyb3InLCBoYW5kbGVyOiAoZXJyb3I6IEVycm9yLCBzdGFnZTogUm91dGluZXMuU3RhZ2VzKSA9PiB2b2lkKTogdGhpcztcblxuICAvKipcbiAgICogdGhlIGV2ZW50IHRoYXQgd2lsbCBvY2N1ciB3aGVuIHRoZSBjb250ZXh0IHJlYWNoZXMgZGlmZmVyZW50IHN0YWdlcyB3aGlsZSBiZWluZyBydW5cbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gaGFuZGxlciBcbiAgICovXG4gIG9uKGV2ZW50OiBSb3V0aW5lcy5TdGFnZXMsIGhhbmRsZXI6ICgpID0+IHZvaWQpOiB0aGlzXG4gIFxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICogQHBhcmFtIGhhbmRsZXIgXG4gICAqL1xuICBvbihldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHRoaXM7XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICBlbWl0KGV2ZW50OiBSb3V0aW5lcy5TdGFnZXMpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKiBAcGFyYW0gZXJyb3IgXG4gICAqIEBwYXJhbSBzdGFnZSBcbiAgICovXG4gIGVtaXQoZXZlbnQ6ICdlcnJvcicsIGVycm9yOiBFcnJvciwgc3RhZ2U6IFJvdXRpbmVzLlN0YWdlcyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoYXQgdGhlIGNvbnRleHQgd2lsbCBlbWl0IHdoZW4gYSB0aGUgdXNlciBuZWVkcyB0byBpbnRlcmFjdCB3aXRoIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICogQHBhcmFtIG1lc3NhZ2UgXG4gICAqIEBwYXJhbSByZXNvbHZlIFxuICAgKiBAcGFyYW0gcmVqZWN0IFxuICAgKi9cbiAgZW1pdChldmVudDogJ3JlcXVlc3QtdXNlci1pbnRlcnZlbnRpb24nLCBtZXNzYWdlOiAgVXNlckludGVydmVudGlvbi5NZXNzYWdlLCByZXNvbHZlOiBVc2VySW50ZXJ2ZW50aW9uLkludGVydmVudGlvbiwgcmVqZWN0OiBVc2VySW50ZXJ2ZW50aW9uLkludGVydmVudGlvbik6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0PFQ+IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLyoqXG4gICAqIHRoZSBodHRwIG1vZHVsZSB0byByZXF1ZXN0IHBhZ2VzIC8gY3Jhd2xcbiAgICovXG4gIGh0dHAhOiBBeGlvc0luc3RhbmNlXG5cbiAgLyoqXG4gICAqIHRoZSAoaGVhZGxlc3MpIGJyb3dzZXIgbW9kdWxlIGNhcGFibGUgb2YgbWFraW5nIGJyb3dzZXIgY3Jhd2xpbmdcbiAgICovXG4gIGJyb3dzZXIhOiBFbGVjdHJvbGl6ZXI8YW55PlxuXG4gIC8qKlxuICAgKiBjdXN0b20gbW9kdWxlIHRvIHJldHVybiBhbiBhcnJheSBvZiBzY3JhcGVkIHZhbHVlcyBiYXNlZCBvbiBydWxlc1xuICAgKiBAc2VlIFNlbGVjdG9yaXpvci5JbnN0cnVjdGlvblxuICAgKi9cbiAgc2VsZWN0b3Jpem9yITogU2VsZWN0b3Jpem9yLlNlbGVjdG9yaXpvckNvbnRleHRJbmplY3RlZFxuXG4gIC8qKlxuICAgKiBvcHRpb25hbCBkYXRhIHRvIGJlIHByZXNlcnZlZCB0aHJvdWdob3V0IHRoZSBjcmF3bGluZyBwcm9jZXNzXG4gICAqL1xuICBkYXRhITogVFxuXG4gIC8qKlxuICAgKiB0aW1lb3V0IHRvIHdhaXQgZm9yIHVzZXIgaW50ZXJ2ZW50aW9uXG4gICAqL1xuICB1c2VySW50ZXJ2ZW50aW9uVGltZW91dDogbnVtYmVyID0gMTAwMCAqIDYwICogNjA7XG4gIFxuICBwcml2YXRlIGluamVjdCE6IEluamVjdC5UYXJnZXRbXVxuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zPzogT3B0aW9uczxUPil7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0RWxlY3Ryb2xpemVyQnVzKCk6IFdlYnZpZXdUYWcge1xuICAgIHJldHVybiB3ZWJ2aWV3VGFnO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGxpZXMgdGhlIHVzZXIgb3B0aW9ucyB0byBjb250ZXh0IG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgYXBwbHlPcHRpb25zKCl7XG4gICAgbG9nZ2VyLmRlYnVnKGBhcHBseWluZyBvcHRpb25zICVvYCwgdGhpcy5vcHRpb25zKTtcbiAgICBsZXQgYXhpb3NPcHRpb25zID0gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLmh0dHAgfHwge30gOiB7fTtcbiAgICBsZXQgZWxlY3Ryb2xpemVyQnVzID0gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLmJyb3dzZXIgfHwgdGhpcy5kZWZhdWx0RWxlY3Ryb2xpemVyQnVzKCkgOiB0aGlzLmRlZmF1bHRFbGVjdHJvbGl6ZXJCdXMoKTtcbiAgICBsZXQgaW5qZWN0T3B0aW9ucyA9IHRoaXMub3B0aW9ucz8gdGhpcy5vcHRpb25zLmluamVjdCB8fCBbXSA6IFtdO1xuXG4gICAgdGhpcy5pbmplY3QgPSBpbmplY3RPcHRpb25zO1xuICAgIHRoaXMuaHR0cCA9IGF4aW9zLmNyZWF0ZShheGlvc09wdGlvbnMpO1xuICAgIFxuICAgIHRoaXMuYnJvd3NlciA9IG5ldyBFbGVjdHJvbGl6ZXIoZWxlY3Ryb2xpemVyQnVzKTtcbiAgICB0aGlzLnNlbGVjdG9yaXpvciA9IFNlbGVjdG9yaXpvci5DcmVhdGVTZWxlY3Rvcml6b3IodGhpcyk7XG4gICAgXG4gICAgaWYodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5kYXRhKXtcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhO1xuICAgIH1cblxuICAgIGlmKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXNlckludGVydmVudGlvblRpbWVvdXQpeyB0aGlzLnVzZXJJbnRlcnZlbnRpb25UaW1lb3V0ID0gdGhpcy5vcHRpb25zLnVzZXJJbnRlcnZlbnRpb25UaW1lb3V0IH07XG4gIH1cblxuICAvKipcbiAgICogaW5qZWN0cyB0aGUgdGFyZ2V0cyB0aGF0IHdlcmUgY3JlYXRlZCBkdXJpbmcgY29uc3RydWN0aW9uXG4gICAqL1xuICBhc3luYyBpbmplY3RUYXJnZXRzKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgbGV0IHRhcmdldHMgPSBbLi4udGhpcy5pbmplY3RdO1xuXG4gICAgbG9nZ2VyLnZlcmJvc2UoJ2FkZGluZyBqcXVlcnkgdG8gaW5qZWN0aW9uIHRhcmdldHMnKTtcbiAgICBcbiAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgc3JjOiByZXF1aXJlLnJlc29sdmUoJ2pxdWVyeScpLFxuICAgICAgbmFtZTogJ2pRdWVyeScsXG4gICAgICB0ZXN0OiBmdW5jdGlvbigpe1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgd2luZG93Lm5vR2xvYmFsID0gZmFsc2U7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBsZXQgZXhpc3RzID0gdHlwZW9mIHdpbmRvdy5qUXVlcnkgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgIHJldHVybiBleGlzdHM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgSW5qZWN0LkluamVjdCh0YXJnZXRzLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwb3dlcmhvdXNlIGZ1bmN0aW9uIHRoYXQgYWxsb3dzIGZvciBpbnRlcnZlbnRpb24gaW4gY2FzZSB0aGUgY3Jhd2xyIGNhbm5vdCBwcm9jZWVkXG4gICAqIGVtaXRzIHRoZSAncmVxdWVzdC11c2VyLWludGVydmVudGlvbicgZXZlbnQgd2l0aCB0aGUgcHJvbWlzZSByZXNvbHZlIGFuZCByZWplY3QgaGFuZGxlcnNcbiAgICogdXNlIHRoaXMgZXZlbnQgdG8gb3BlbiB1cCB0aGUgY29udGV4dHMgYnJvd3NlciBhbmQgY29tcGxldGUgYSBDQVBUQ0hBLCBldGMuIHJ1biB0aGUgcmVzb2x2ZSB0byBmaW5pc2ggYW5kIHJlc3VtZSBjcmF3bGluZ1xuICAgKiBAZW1pdHMgcmVxdWVzdC11c2VyLWludGVydmVudGlvblxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdFVzZXJJbnRlcnZlbnRpb24obWVzc2FnZT86IFVzZXJJbnRlcnZlbnRpb24uTWVzc2FnZSwgdGltZW91dD86IG51bWJlcil7XG4gICAgYXdhaXQgVXNlckludGVydmVudGlvbi5SZXF1ZXN0KHRoaXMsIG1lc3NhZ2UsIHRpbWVvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0cyB0aGUgY29udGV4dCBcbiAgICogY2FuIHJlbW92ZSBsaXN0ZW5lcnMgd2l0aCB0aGUgaGFyZCBvcHRpb24gKHByb2JhYmx5IHNob3VsZG4ndClcbiAgICogQHBhcmFtIGhhcmQgXG4gICAqL1xuICBhc3luYyByZXNldChoYXJkOiBib29sZWFuID0gZmFsc2Upe1xuICAgIGxvZ2dlci52ZXJib3NlKCdyZXNldHRpbmcgdGhlIGNvbnRleHQnKTtcbiAgICBhd2FpdCB0aGlzLnRlYXJkb3duKCk7XG4gICAgaWYoaGFyZCl7IHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCkgfVxuICAgIHRoaXMuYXBwbHlPcHRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogdGVhcnMgZG93biB0aGUgYnJvd3NlciBjb250ZXh0XG4gICAqL1xuICBhc3luYyB0ZWFyZG93bigpOiBQcm9taXNlPHZvaWQ+e1xuICAgIGxvZ2dlci52ZXJib3NlKCd0ZWFyaW5nIGRvd24gYnJvd3NlcicpO1xuICAgIGF3YWl0IHRoaXMuYnJvd3Nlci5lbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhc3luYyBkZWxheSBmdW5jdGlvblxuICAgKiBAcGFyYW0gbXMgXG4gICAqL1xuICBhc3luYyBkZWxheShtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0cyB0aGUgY3VycmVudCBicm93c2VyIGh0bWxcbiAgICovXG4gIGFzeW5jIGh0bWwoKTogUHJvbWlzZTxzdHJpbmc+e1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJyb3dzZXIuaHRtbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHR1cm5zIHRoZSBodG1sIChwcm92aWRlZCBvciBmcm9tIGJyb3dzZXIpIGludG8gYSBjaGVlcmlvIGluc3RhbmNlXG4gICAqIEBwYXJhbSBwcm92aWRlZEh0bWwgXG4gICAqL1xuICBhc3luYyAkKHByb3ZpZGVkSHRtbD86IHN0cmluZyk6IFByb21pc2U8Q2hlZXJpb1N0YXRpYz57XG4gICAgbGV0IGh0bWwgPSBwcm92aWRlZEh0bWwgPyBwcm92aWRlZEh0bWwgOiBhd2FpdCB0aGlzLmh0bWwoKTtcbiAgICByZXR1cm4gbG9hZChodG1sKTtcbiAgfVxufVxuXG4iXX0=
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Runner = void 0;

var Context = _interopRequireWildcard(require("../context"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Runner =
/*#__PURE__*/
function () {
  function Runner(routines) {
    _classCallCheck(this, Runner);

    this.routines = routines;
  }
  /**
   * runs the setup routine with the supplied context
   * attempts to handle errors
   * @param context 
   */


  _createClass(Runner, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(context) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, middleware;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                context.emit('setup');
                _context.prev = 1;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = this.routines.setup[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                middleware = _step.value;
                _context.next = 11;
                return middleware(context);

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t1 = _context["catch"](1);
                console.log(_context.t1);
                context.emit('error', _context.t1, 'setup');

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 30], [5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function setup(_x) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
    /**
     * runs the crawl routine with the supplied context while also paginating (if necessary)
     * attempts to handle errors
     * @param context 
     */

  }, {
    key: "crawl",
    value: function () {
      var _crawl = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(context) {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, middleware;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return context.injectTargets();

              case 3:
                context.emit('crawl');
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 7;
                _iterator2 = this.routines.crawl[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 16;
                  break;
                }

                middleware = _step2.value;
                _context2.next = 13;
                return middleware(context);

              case 13:
                _iteratorNormalCompletion2 = true;
                _context2.next = 9;
                break;

              case 16:
                _context2.next = 22;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](7);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 22:
                _context2.prev = 22;
                _context2.prev = 23;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 25:
                _context2.prev = 25;

                if (!_didIteratorError2) {
                  _context2.next = 28;
                  break;
                }

                throw _iteratorError2;

              case 28:
                return _context2.finish(25);

              case 29:
                return _context2.finish(22);

              case 30:
                _context2.next = 35;
                break;

              case 32:
                _context2.prev = 32;
                _context2.t1 = _context2["catch"](0);
                context.emit('error', _context2.t1, 'crawl');

              case 35:
                _context2.next = 37;
                return this.paginate(context);

              case 37:
                if (_context2.sent) {
                  _context2.next = 0;
                  break;
                }

              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 32], [7, 18, 22, 30], [23,, 25, 29]]);
      }));

      function crawl(_x2) {
        return _crawl.apply(this, arguments);
      }

      return crawl;
    }()
    /**
     * runs the paginate routine if it was supplied
     * if an error occurs paginate will return false which stops crawling
     * @param context 
     */

  }, {
    key: "paginate",
    value: function () {
      var _paginate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(context) {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, middleware, result;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                context.emit('paginate');
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 5;
                _iterator3 = this.routines.paginate[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 17;
                  break;
                }

                middleware = _step3.value;
                _context3.next = 11;
                return middleware(context);

              case 11:
                result = _context3.sent;

                if (result) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return", false);

              case 14:
                _iteratorNormalCompletion3 = true;
                _context3.next = 7;
                break;

              case 17:
                _context3.next = 23;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](5);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 23:
                _context3.prev = 23;
                _context3.prev = 24;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 26:
                _context3.prev = 26;

                if (!_didIteratorError3) {
                  _context3.next = 29;
                  break;
                }

                throw _iteratorError3;

              case 29:
                return _context3.finish(26);

              case 30:
                return _context3.finish(23);

              case 31:
                return _context3.abrupt("return", this.routines.paginate.length > 0);

              case 34:
                _context3.prev = 34;
                _context3.t1 = _context3["catch"](0);
                context.emit('error', _context3.t1, 'paginate');
                return _context3.abrupt("return", false);

              case 38:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 34], [5, 19, 23, 31], [24,, 26, 30]]);
      }));

      function paginate(_x3) {
        return _paginate.apply(this, arguments);
      }

      return paginate;
    }()
    /**
     * tears down the context and performs any clean up
     * @param context 
     */

  }, {
    key: "teardown",
    value: function () {
      var _teardown = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(context) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                context.emit('teardown');
                _context4.next = 4;
                return context.teardown();

              case 4:
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                context.emit('error', _context4.t0, 'teardown');

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));

      function teardown(_x4) {
        return _teardown.apply(this, arguments);
      }

      return teardown;
    }()
    /**
     * takes an existing context object and runs the 
     * @param context 
     */

  }, {
    key: "runContext",
    value: function () {
      var _runContext = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(context) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.setup(context);

              case 2:
                _context5.next = 4;
                return this.crawl(context);

              case 4:
                _context5.next = 6;
                return this.teardown(context);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function runContext(_x5) {
        return _runContext.apply(this, arguments);
      }

      return runContext;
    }()
    /**
     * takes new context options, creates a context and runs the routines for it
     * may be removed / deprecated soon
     * @param options 
     */

  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(options) {
        var context;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                context = new Context.Context(options);
                _context6.next = 3;
                return this.runContext(context);

              case 3:
                return _context6.abrupt("return", context);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function run(_x6) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Runner;
}();

exports.Runner = Runner;
var _default = Runner;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW5uZXIvcnVubmVyLnRzIl0sIm5hbWVzIjpbIlJ1bm5lciIsInJvdXRpbmVzIiwiY29udGV4dCIsImVtaXQiLCJzZXR1cCIsIm1pZGRsZXdhcmUiLCJjb25zb2xlIiwibG9nIiwiaW5qZWN0VGFyZ2V0cyIsImNyYXdsIiwicGFnaW5hdGUiLCJyZXN1bHQiLCJsZW5ndGgiLCJ0ZWFyZG93biIsIm9wdGlvbnMiLCJDb250ZXh0IiwicnVuQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHYUEsTTs7O0FBQ1gsa0JBQXNCQyxRQUF0QixFQUFpRDtBQUFBOztBQUFBLFNBQTNCQSxRQUEyQixHQUEzQkEsUUFBMkI7QUFBRTtBQUVuRDs7Ozs7Ozs7Ozs7OytDQUtlQyxPOzs7Ozs7O0FBQ2JBLGdCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxPQUFiOzs7Ozs7NEJBRXdCLEtBQUtGLFFBQUwsQ0FBY0csSzs7Ozs7Ozs7QUFBNUJDLGdCQUFBQSxVOzt1QkFDQUEsVUFBVSxDQUFDSCxPQUFELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdsQkksZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBTCxnQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsT0FBYixlQUE2QixPQUE3Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUlKOzs7Ozs7Ozs7OztnREFLZUQsTzs7Ozs7Ozs7O3VCQUdIQSxPQUFPLENBQUNNLGFBQVIsRTs7O0FBQ05OLGdCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxPQUFiOzs7Ozs2QkFDc0IsS0FBS0YsUUFBTCxDQUFjUSxLOzs7Ozs7OztBQUE1QkosZ0JBQUFBLFU7O3VCQUNBQSxVQUFVLENBQUNILE9BQUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xCQSxnQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsT0FBYixnQkFBNkIsT0FBN0I7Ozs7dUJBR1UsS0FBS08sUUFBTCxDQUFjUixPQUFkLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHaEI7Ozs7Ozs7Ozs7O2dEQUtrQkEsTzs7Ozs7Ozs7QUFFZEEsZ0JBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLFVBQWI7Ozs7OzZCQUVzQixLQUFLRixRQUFMLENBQWNTLFE7Ozs7Ozs7O0FBQTVCTCxnQkFBQUEsVTs7dUJBQ2FBLFVBQVUsQ0FBQ0gsT0FBRCxDOzs7QUFBekJTLGdCQUFBQSxNOztvQkFDQUEsTTs7Ozs7a0RBQWdCLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrREFHZixLQUFLVixRQUFMLENBQWNTLFFBQWQsQ0FBdUJFLE1BQXZCLEdBQWdDLEM7Ozs7O0FBRXZDVixnQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsT0FBYixnQkFBNkIsVUFBN0I7a0RBQ08sSzs7Ozs7Ozs7Ozs7Ozs7OztBQUlYOzs7Ozs7Ozs7O2dEQUlrQkQsTzs7Ozs7O0FBRWRBLGdCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxVQUFiOzt1QkFDTUQsT0FBTyxDQUFDVyxRQUFSLEU7Ozs7Ozs7OztBQUVOWCxnQkFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsT0FBYixnQkFBNkIsVUFBN0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSjs7Ozs7Ozs7OztnREFJb0JELE87Ozs7Ozt1QkFDWixLQUFLRSxLQUFMLENBQVdGLE9BQVgsQzs7Ozt1QkFDQSxLQUFLTyxLQUFMLENBQVdQLE9BQVgsQzs7Ozt1QkFDQSxLQUFLVyxRQUFMLENBQWNYLE9BQWQsQzs7Ozs7Ozs7Ozs7Ozs7OztBQUdSOzs7Ozs7Ozs7OztnREFLZ0JZLE87Ozs7OztBQUNWWixnQkFBQUEsTyxHQUFVLElBQUlhLE9BQU8sQ0FBQ0EsT0FBWixDQUFvQkQsT0FBcEIsQzs7dUJBQ1IsS0FBS0UsVUFBTCxDQUFnQmQsT0FBaEIsQzs7O2tEQUNDQSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBSUlGLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDb250ZXh0IGZyb20gXCIuLi9jb250ZXh0XCI7XG5pbXBvcnQgKiBhcyBSb3V0aW5lIGZyb20gJy4uL3JvdXRpbmUnO1xuXG5leHBvcnQgY2xhc3MgUnVubmVyIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJvdXRpbmVzOiBSb3V0aW5lLlJvdXRpbmVzKXt9XG5cbiAgLyoqXG4gICAqIHJ1bnMgdGhlIHNldHVwIHJvdXRpbmUgd2l0aCB0aGUgc3VwcGxpZWQgY29udGV4dFxuICAgKiBhdHRlbXB0cyB0byBoYW5kbGUgZXJyb3JzXG4gICAqIEBwYXJhbSBjb250ZXh0IFxuICAgKi9cbiAgYXN5bmMgc2V0dXA8VD4oY29udGV4dDogQ29udGV4dC5Db250ZXh0PFQ+KXtcbiAgICBjb250ZXh0LmVtaXQoJ3NldHVwJyk7XG4gICAgdHJ5IHtcbiAgICAgIGZvcihsZXQgbWlkZGxld2FyZSBvZiB0aGlzLnJvdXRpbmVzLnNldHVwKXtcbiAgICAgICAgYXdhaXQgbWlkZGxld2FyZShjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBjb250ZXh0LmVtaXQoJ2Vycm9yJywgZXJyb3IsICdzZXR1cCcpO1xuICAgIH0gXG4gIH1cblxuICAvKipcbiAgICogcnVucyB0aGUgY3Jhd2wgcm91dGluZSB3aXRoIHRoZSBzdXBwbGllZCBjb250ZXh0IHdoaWxlIGFsc28gcGFnaW5hdGluZyAoaWYgbmVjZXNzYXJ5KVxuICAgKiBhdHRlbXB0cyB0byBoYW5kbGUgZXJyb3JzXG4gICAqIEBwYXJhbSBjb250ZXh0IFxuICAgKi9cbiAgYXN5bmMgY3Jhd2w8VD4oY29udGV4dDogQ29udGV4dC5Db250ZXh0PFQ+KXtcbiAgICBkbyB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjb250ZXh0LmluamVjdFRhcmdldHMoKTtcbiAgICAgICAgY29udGV4dC5lbWl0KCdjcmF3bCcpO1xuICAgICAgICBmb3IobGV0IG1pZGRsZXdhcmUgb2YgdGhpcy5yb3V0aW5lcy5jcmF3bCl7XG4gICAgICAgICAgYXdhaXQgbWlkZGxld2FyZShjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICBjb250ZXh0LmVtaXQoJ2Vycm9yJywgZXJyb3IsICdjcmF3bCcpO1xuICAgICAgfVxuXG4gICAgfSB3aGlsZShhd2FpdCB0aGlzLnBhZ2luYXRlKGNvbnRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBydW5zIHRoZSBwYWdpbmF0ZSByb3V0aW5lIGlmIGl0IHdhcyBzdXBwbGllZFxuICAgKiBpZiBhbiBlcnJvciBvY2N1cnMgcGFnaW5hdGUgd2lsbCByZXR1cm4gZmFsc2Ugd2hpY2ggc3RvcHMgY3Jhd2xpbmdcbiAgICogQHBhcmFtIGNvbnRleHQgXG4gICAqL1xuICBhc3luYyBwYWdpbmF0ZTxUPihjb250ZXh0OiBDb250ZXh0LkNvbnRleHQ8VD4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0cnkge1xuICAgICAgY29udGV4dC5lbWl0KCdwYWdpbmF0ZScpO1xuICAgICAgXG4gICAgICBmb3IobGV0IG1pZGRsZXdhcmUgb2YgdGhpcy5yb3V0aW5lcy5wYWdpbmF0ZSl7XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBtaWRkbGV3YXJlKGNvbnRleHQpO1xuICAgICAgICBpZighcmVzdWx0KXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucm91dGluZXMucGFnaW5hdGUubGVuZ3RoID4gMDtcbiAgICB9IGNhdGNoKGVycm9yKXtcbiAgICAgIGNvbnRleHQuZW1pdCgnZXJyb3InLCBlcnJvciwgJ3BhZ2luYXRlJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRlYXJzIGRvd24gdGhlIGNvbnRleHQgYW5kIHBlcmZvcm1zIGFueSBjbGVhbiB1cFxuICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICovXG4gIGFzeW5jIHRlYXJkb3duPFQ+KGNvbnRleHQ6IENvbnRleHQuQ29udGV4dDxUPil7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRleHQuZW1pdCgndGVhcmRvd24nKTtcbiAgICAgIGF3YWl0IGNvbnRleHQudGVhcmRvd24oKTtcbiAgICB9IGNhdGNoKGVycm9yKXtcbiAgICAgIGNvbnRleHQuZW1pdCgnZXJyb3InLCBlcnJvciwgJ3RlYXJkb3duJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRha2VzIGFuIGV4aXN0aW5nIGNvbnRleHQgb2JqZWN0IGFuZCBydW5zIHRoZSBcbiAgICogQHBhcmFtIGNvbnRleHQgXG4gICAqL1xuICBhc3luYyBydW5Db250ZXh0PFQ+KGNvbnRleHQ6IENvbnRleHQuQ29udGV4dDxUPil7XG4gICAgYXdhaXQgdGhpcy5zZXR1cChjb250ZXh0KTtcbiAgICBhd2FpdCB0aGlzLmNyYXdsKGNvbnRleHQpO1xuICAgIGF3YWl0IHRoaXMudGVhcmRvd24oY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogdGFrZXMgbmV3IGNvbnRleHQgb3B0aW9ucywgY3JlYXRlcyBhIGNvbnRleHQgYW5kIHJ1bnMgdGhlIHJvdXRpbmVzIGZvciBpdFxuICAgKiBtYXkgYmUgcmVtb3ZlZCAvIGRlcHJlY2F0ZWQgc29vblxuICAgKiBAcGFyYW0gb3B0aW9ucyBcbiAgICovXG4gIGFzeW5jIHJ1bjxCLCBUPihvcHRpb25zOiBDb250ZXh0Lk9wdGlvbnM8VD4pOiBQcm9taXNlPENvbnRleHQuQ29udGV4dDxUPj4ge1xuICAgIGxldCBjb250ZXh0ID0gbmV3IENvbnRleHQuQ29udGV4dChvcHRpb25zKTtcbiAgICBhd2FpdCB0aGlzLnJ1bkNvbnRleHQoY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUnVubmVyOyJdfQ==
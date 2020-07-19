"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inject = Inject;

var _logger = _interopRequireDefault(require("@ugenu.io/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = (0, _logger["default"])(['crawler', 'context', 'inject'], process.env.DEBUG ? "debug" : "info");
/**
 * Function to inject browser context with javascript libraries if the target.test is false
 * Returns the number of targets that were injected
 * @param targets 
 * @param context 
 */

function Inject(_x, _x2) {
  return _Inject.apply(this, arguments);
}

function _Inject() {
  _Inject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(targets, context) {
    var state, url, injected, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, target, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.debug('attempting to get browser url'); //@ts-ignore

            state = context.browser.state;

            if (!(state === "initial")) {
              _context.next = 5;
              break;
            }

            logger.info('no web page to inject scripts');
            return _context.abrupt("return", 0);

          case 5:
            _context.next = 7;
            return context.browser.evaluate(function () {
              return window.location.href;
            });

          case 7:
            url = _context.sent;
            logger.http("browser on %s", url);
            injected = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;
            _iterator = targets[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 38;
              break;
            }

            target = _step.value;
            logger.verbose("testing injection target ".concat(target.name));
            _context.next = 20;
            return context.browser.evaluate(target.test);

          case 20:
            result = _context.sent;

            if (result) {
              _context.next = 34;
              break;
            }

            logger.verbose("test failed, inject ".concat(target.name));
            _context.prev = 23;
            _context.next = 26;
            return context.browser.inject('js', target.src).run();

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](23);
            console.log(_context.t0);

          case 31:
            injected++;
            _context.next = 35;
            break;

          case 34:
            logger.verbose("test passed, will NOT inject ".concat(target.name));

          case 35:
            _iteratorNormalCompletion = true;
            _context.next = 15;
            break;

          case 38:
            _context.next = 44;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 44:
            _context.prev = 44;
            _context.prev = 45;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 47:
            _context.prev = 47;

            if (!_didIteratorError) {
              _context.next = 50;
              break;
            }

            throw _iteratorError;

          case 50:
            return _context.finish(47);

          case 51:
            return _context.finish(44);

          case 52:
            return _context.abrupt("return", injected);

          case 53:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 40, 44, 52], [23, 28], [45,, 47, 51]]);
  }));
  return _Inject.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2luamVjdC9pbmplY3QuZnVuY3Rpb24udHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiSW5qZWN0IiwidGFyZ2V0cyIsImNvbnRleHQiLCJkZWJ1ZyIsInN0YXRlIiwiYnJvd3NlciIsImluZm8iLCJldmFsdWF0ZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsImh0dHAiLCJpbmplY3RlZCIsInRhcmdldCIsInZlcmJvc2UiLCJuYW1lIiwidGVzdCIsInJlc3VsdCIsImluamVjdCIsInNyYyIsInJ1biIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFHQSxJQUFNQSxNQUFNLEdBQUcsd0JBQU8sQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixRQUF2QixDQUFQLEVBQXlDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsS0FBWixHQUFvQixPQUFwQixHQUE4QixNQUF2RSxDQUFmO0FBRUE7Ozs7Ozs7U0FNc0JDLE07Ozs7Ozs7MEJBQWYsaUJBQXlCQyxPQUF6QixFQUE0Q0MsT0FBNUM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMTixZQUFBQSxNQUFNLENBQUNPLEtBQVAsQ0FBYSwrQkFBYixFQURLLENBR0w7O0FBQ0lDLFlBQUFBLEtBSkMsR0FJT0YsT0FBTyxDQUFDRyxPQUFSLENBQWdCRCxLQUp2Qjs7QUFBQSxrQkFNRkEsS0FBSyxLQUFLLFNBTlI7QUFBQTtBQUFBO0FBQUE7O0FBT0hSLFlBQUFBLE1BQU0sQ0FBQ1UsSUFBUCxDQUFZLCtCQUFaO0FBUEcsNkNBUUksQ0FSSjs7QUFBQTtBQUFBO0FBQUEsbUJBV1dKLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkUsUUFBaEIsQ0FBeUI7QUFBQSxxQkFBTUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUF0QjtBQUFBLGFBQXpCLENBWFg7O0FBQUE7QUFXREMsWUFBQUEsR0FYQztBQWFMZixZQUFBQSxNQUFNLENBQUNnQixJQUFQLGtCQUE2QkQsR0FBN0I7QUFFSUUsWUFBQUEsUUFmQyxHQWVVLENBZlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQWlCYVosT0FqQmI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQkdhLFlBQUFBLE1BakJIO0FBa0JIbEIsWUFBQUEsTUFBTSxDQUFDbUIsT0FBUCxvQ0FBMkNELE1BQU0sQ0FBQ0UsSUFBbEQ7QUFsQkc7QUFBQSxtQkFvQmdCZCxPQUFPLENBQUNHLE9BQVIsQ0FBZ0JFLFFBQWhCLENBQXlCTyxNQUFNLENBQUNHLElBQWhDLENBcEJoQjs7QUFBQTtBQW9CQ0MsWUFBQUEsTUFwQkQ7O0FBQUEsZ0JBc0JDQSxNQXRCRDtBQUFBO0FBQUE7QUFBQTs7QUF1QkR0QixZQUFBQSxNQUFNLENBQUNtQixPQUFQLCtCQUFzQ0QsTUFBTSxDQUFDRSxJQUE3QztBQXZCQztBQUFBO0FBQUEsbUJBeUJPZCxPQUFPLENBQUNHLE9BQVIsQ0FBZ0JjLE1BQWhCLENBQXVCLElBQXZCLEVBQTZCTCxNQUFNLENBQUNNLEdBQXBDLEVBQXlDQyxHQUF6QyxFQXpCUDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBMkJDQyxZQUFBQSxPQUFPLENBQUNDLEdBQVI7O0FBM0JEO0FBNkJEVixZQUFBQSxRQUFRO0FBN0JQO0FBQUE7O0FBQUE7QUErQkRqQixZQUFBQSxNQUFNLENBQUNtQixPQUFQLHdDQUErQ0QsTUFBTSxDQUFDRSxJQUF0RDs7QUEvQkM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZDQW1DRUgsUUFuQ0Y7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENvbnRleHQgZnJvbSAnLi4vLi4vY29udGV4dCc7XG5pbXBvcnQgeyBUYXJnZXQgfSBmcm9tIFwiLi90YXJnZXQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJ0B1Z2VudS5pby9sb2dnZXInXG5pbXBvcnQgeyBFbGVjdHJvbGl6ZXJCdXMgfSBmcm9tICdAdWdlbnUuaW8vZWxlY3Ryb2xpemVyJztcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyKFsnY3Jhd2xlcicsICdjb250ZXh0JywgJ2luamVjdCddLCBwcm9jZXNzLmVudi5ERUJVRyA/IFwiZGVidWdcIiA6IFwiaW5mb1wiKTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBpbmplY3QgYnJvd3NlciBjb250ZXh0IHdpdGggamF2YXNjcmlwdCBsaWJyYXJpZXMgaWYgdGhlIHRhcmdldC50ZXN0IGlzIGZhbHNlXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGFyZ2V0cyB0aGF0IHdlcmUgaW5qZWN0ZWRcbiAqIEBwYXJhbSB0YXJnZXRzIFxuICogQHBhcmFtIGNvbnRleHQgXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBJbmplY3Q8VD4odGFyZ2V0czogVGFyZ2V0W10sIGNvbnRleHQ6IENvbnRleHQuQ29udGV4dDxUPik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGxvZ2dlci5kZWJ1ZygnYXR0ZW1wdGluZyB0byBnZXQgYnJvd3NlciB1cmwnKTtcblxuICAvL0B0cy1pZ25vcmVcbiAgbGV0IHN0YXRlID0gY29udGV4dC5icm93c2VyLnN0YXRlIGFzIHN0cmluZztcblxuICBpZihzdGF0ZSA9PT0gXCJpbml0aWFsXCIpe1xuICAgIGxvZ2dlci5pbmZvKCdubyB3ZWIgcGFnZSB0byBpbmplY3Qgc2NyaXB0cycpO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgbGV0IHVybCA9IGF3YWl0IGNvbnRleHQuYnJvd3Nlci5ldmFsdWF0ZSgoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgbG9nZ2VyLmh0dHAoYGJyb3dzZXIgb24gJXNgLCB1cmwpO1xuXG4gIGxldCBpbmplY3RlZCA9IDA7XG5cbiAgZm9yKGxldCB0YXJnZXQgb2YgdGFyZ2V0cyl7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYHRlc3RpbmcgaW5qZWN0aW9uIHRhcmdldCAke3RhcmdldC5uYW1lfWApO1xuXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbnRleHQuYnJvd3Nlci5ldmFsdWF0ZSh0YXJnZXQudGVzdCk7XG4gICAgXG4gICAgaWYoIXJlc3VsdCl7XG4gICAgICBsb2dnZXIudmVyYm9zZShgdGVzdCBmYWlsZWQsIGluamVjdCAke3RhcmdldC5uYW1lfWApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY29udGV4dC5icm93c2VyLmluamVjdCgnanMnLCB0YXJnZXQuc3JjKS5ydW4oKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGluamVjdGVkKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGB0ZXN0IHBhc3NlZCwgd2lsbCBOT1QgaW5qZWN0ICR7dGFyZ2V0Lm5hbWV9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluamVjdGVkO1xufSJdfQ==
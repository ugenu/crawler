"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = Request;

var _default = require("./default.message");

var _logger = _interopRequireDefault(require("@ugenu.io/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = (0, _logger["default"])(['crawler', 'context', 'intervention'], process.env.DEBUG ? "debug" : "info");
/**
 * emit a request that the user needs to interact with the browser before crawling can continue
 * @param context 
 * @param message 
 */

function Request(_x, _x2, _x3) {
  return _Request.apply(this, arguments);
}

function _Request() {
  _Request = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(context, message, timeout) {
    var requestMessage, rejectTimeout;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!message) {
              _context.next = 4;
              break;
            }

            _context.t0 = message;
            _context.next = 7;
            break;

          case 4:
            _context.next = 6;
            return (0, _default.DefaultMessage)(context);

          case 6:
            _context.t0 = _context.sent;

          case 7:
            requestMessage = _context.t0;

            /** use the timeout provided, otherwise use the context's timeout option */
            rejectTimeout = timeout ? timeout : context.userInterventionTimeout;
            _context.next = 11;
            return new Promise(function (resolve, reject) {
              /** our boolean for checking if the script handled intervention or not */
              var intervened = false;
              /** our wrapper that sets the intervened boolean when either reject or resolve is called */

              var wrapper = function wrapper(fn) {
                return function intervene(reason) {
                  intervened = true;
                  return fn(reason);
                };
              };
              /** emit the event but find out if there was anyone listening */


              var hasListeners = context.emit('request-user-intervention', requestMessage, wrapper(resolve), wrapper(reject));
              /** if no listeners we should warn the user, but otherwise continue */

              if (!hasListeners) {
                logger.warn('no listeners for user intervention. This will be an error soon.');
                return resolve();
              }

              setTimeout(function () {
                /** if some sort of intervention occurred then we don't need to do anything */
                if (intervened) {
                  return;
                }

                ;
                /** otherwise lets reject the promise so we can throw an error */

                return reject('user intervention did not happen in time');
              }, rejectTimeout);
            });

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Request.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L3VzZXItaW50ZXJ2ZW50aW9uL3JlcXVlc3QuZnVuY3Rpb24udHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiUmVxdWVzdCIsImNvbnRleHQiLCJtZXNzYWdlIiwidGltZW91dCIsInJlcXVlc3RNZXNzYWdlIiwicmVqZWN0VGltZW91dCIsInVzZXJJbnRlcnZlbnRpb25UaW1lb3V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnRlcnZlbmVkIiwid3JhcHBlciIsImZuIiwiaW50ZXJ2ZW5lIiwicmVhc29uIiwiaGFzTGlzdGVuZXJzIiwiZW1pdCIsIndhcm4iLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBR0E7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLHdCQUFPLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsY0FBdkIsQ0FBUCxFQUErQ0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLEtBQVosR0FBb0IsT0FBcEIsR0FBOEIsTUFBN0UsQ0FBZjtBQUVBOzs7Ozs7U0FLc0JDLE87Ozs7Ozs7MEJBQWYsaUJBQTBCQyxPQUExQixFQUErQ0MsT0FBL0MsRUFBa0VDLE9BQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVnQkQsT0FGaEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsMEJBRTBCQSxPQUYxQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQUUwQyw2QkFBZUQsT0FBZixDQUYxQzs7QUFBQTtBQUFBOztBQUFBO0FBRURHLFlBQUFBLGNBRkM7O0FBSUw7QUFDSUMsWUFBQUEsYUFMQyxHQUtlRixPQUFPLEdBQUdBLE9BQUgsR0FBYUYsT0FBTyxDQUFDSyx1QkFMM0M7QUFBQTtBQUFBLG1CQU9RLElBQUlDLE9BQUosQ0FBa0IsVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBeUI7QUFDdEQ7QUFDQSxrQkFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBRUE7O0FBQ0Esa0JBQUlDLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVNDLEVBQVQsRUFBZ0M7QUFDNUMsdUJBQU8sU0FBU0MsU0FBVCxDQUFtQkMsTUFBbkIsRUFBdUM7QUFDNUNKLGtCQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUVBLHlCQUFPRSxFQUFFLENBQUNFLE1BQUQsQ0FBVDtBQUNELGlCQUpEO0FBS0QsZUFORDtBQVFBOzs7QUFDQSxrQkFBSUMsWUFBWSxHQUFHZCxPQUFPLENBQUNlLElBQVIsQ0FBYSwyQkFBYixFQUEwQ1osY0FBMUMsRUFBMERPLE9BQU8sQ0FBQ0gsT0FBRCxDQUFqRSxFQUE0RUcsT0FBTyxDQUFDRixNQUFELENBQW5GLENBQW5CO0FBRUE7O0FBQ0Esa0JBQUcsQ0FBQ00sWUFBSixFQUFpQjtBQUNmbkIsZ0JBQUFBLE1BQU0sQ0FBQ3FCLElBQVAsQ0FBWSxpRUFBWjtBQUNBLHVCQUFPVCxPQUFPLEVBQWQ7QUFDRDs7QUFFRFUsY0FBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjtBQUNBLG9CQUFHUixVQUFILEVBQWM7QUFBRTtBQUFROztBQUFBO0FBRXhCOztBQUNBLHVCQUFPRCxNQUFNLENBQUMsMENBQUQsQ0FBYjtBQUVELGVBUFMsRUFPUEosYUFQTyxDQUFWO0FBUUQsYUE5QlksQ0FQUjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IERlZmF1bHRNZXNzYWdlIH0gZnJvbSBcIi4vZGVmYXVsdC5tZXNzYWdlXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJbnRlcnZlbnRpb24gfSBmcm9tIFwiLi9pbnRlcnZlbnRpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJ0B1Z2VudS5pby9sb2dnZXInXG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcihbJ2NyYXdsZXInLCAnY29udGV4dCcsICdpbnRlcnZlbnRpb24nXSwgcHJvY2Vzcy5lbnYuREVCVUcgPyBcImRlYnVnXCIgOiBcImluZm9cIik7XG5cbi8qKlxuICogZW1pdCBhIHJlcXVlc3QgdGhhdCB0aGUgdXNlciBuZWVkcyB0byBpbnRlcmFjdCB3aXRoIHRoZSBicm93c2VyIGJlZm9yZSBjcmF3bGluZyBjYW4gY29udGludWVcbiAqIEBwYXJhbSBjb250ZXh0IFxuICogQHBhcmFtIG1lc3NhZ2UgXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBSZXF1ZXN0PFQ+KGNvbnRleHQ6IENvbnRleHQ8VD4sIG1lc3NhZ2U/OiBNZXNzYWdlLCB0aW1lb3V0PzogbnVtYmVyKTogUHJvbWlzZTx2b2lkPntcbiAgLyoqIG1ha2UgdGhlIHJlcXVlc3QgbWVzc2FnZSB0aGUgZGVmYXVsdCBpZiBvbmUgd2FzIG5vdCBwYXNzZWQgdXBvbiBpbnZva2luZyAqL1xuICBsZXQgcmVxdWVzdE1lc3NhZ2UgPSBtZXNzYWdlID8gbWVzc2FnZSA6IGF3YWl0IERlZmF1bHRNZXNzYWdlKGNvbnRleHQpO1xuXG4gIC8qKiB1c2UgdGhlIHRpbWVvdXQgcHJvdmlkZWQsIG90aGVyd2lzZSB1c2UgdGhlIGNvbnRleHQncyB0aW1lb3V0IG9wdGlvbiAqL1xuICBsZXQgcmVqZWN0VGltZW91dCA9IHRpbWVvdXQgPyB0aW1lb3V0IDogY29udGV4dC51c2VySW50ZXJ2ZW50aW9uVGltZW91dFxuICBcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgLyoqIG91ciBib29sZWFuIGZvciBjaGVja2luZyBpZiB0aGUgc2NyaXB0IGhhbmRsZWQgaW50ZXJ2ZW50aW9uIG9yIG5vdCAqL1xuICAgIGxldCBpbnRlcnZlbmVkID0gZmFsc2U7XG5cbiAgICAvKiogb3VyIHdyYXBwZXIgdGhhdCBzZXRzIHRoZSBpbnRlcnZlbmVkIGJvb2xlYW4gd2hlbiBlaXRoZXIgcmVqZWN0IG9yIHJlc29sdmUgaXMgY2FsbGVkICovXG4gICAgbGV0IHdyYXBwZXIgPSBmdW5jdGlvbihmbjogYW55KTogSW50ZXJ2ZW50aW9uIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpbnRlcnZlbmUocmVhc29uPzogYW55IHwgdm9pZCl7XG4gICAgICAgIGludGVydmVuZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmbihyZWFzb24pO1xuICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgLyoqIGVtaXQgdGhlIGV2ZW50IGJ1dCBmaW5kIG91dCBpZiB0aGVyZSB3YXMgYW55b25lIGxpc3RlbmluZyAqL1xuICAgIGxldCBoYXNMaXN0ZW5lcnMgPSBjb250ZXh0LmVtaXQoJ3JlcXVlc3QtdXNlci1pbnRlcnZlbnRpb24nLCByZXF1ZXN0TWVzc2FnZSwgd3JhcHBlcihyZXNvbHZlKSwgd3JhcHBlcihyZWplY3QpKTtcblxuICAgIC8qKiBpZiBubyBsaXN0ZW5lcnMgd2Ugc2hvdWxkIHdhcm4gdGhlIHVzZXIsIGJ1dCBvdGhlcndpc2UgY29udGludWUgKi9cbiAgICBpZighaGFzTGlzdGVuZXJzKXtcbiAgICAgIGxvZ2dlci53YXJuKCdubyBsaXN0ZW5lcnMgZm9yIHVzZXIgaW50ZXJ2ZW50aW9uLiBUaGlzIHdpbGwgYmUgYW4gZXJyb3Igc29vbi4nKVxuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8qKiBpZiBzb21lIHNvcnQgb2YgaW50ZXJ2ZW50aW9uIG9jY3VycmVkIHRoZW4gd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZyAqL1xuICAgICAgaWYoaW50ZXJ2ZW5lZCl7IHJldHVybiB9O1xuXG4gICAgICAvKiogb3RoZXJ3aXNlIGxldHMgcmVqZWN0IHRoZSBwcm9taXNlIHNvIHdlIGNhbiB0aHJvdyBhbiBlcnJvciAqL1xuICAgICAgcmV0dXJuIHJlamVjdCgndXNlciBpbnRlcnZlbnRpb24gZGlkIG5vdCBoYXBwZW4gaW4gdGltZScpO1xuXG4gICAgfSwgcmVqZWN0VGltZW91dCk7XG4gIH0pO1xufSJdfQ==
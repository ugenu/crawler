"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selectorizor = Selectorizor;

var _logger = _interopRequireDefault(require("@ugenu.io/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = (0, _logger["default"])(['crawler', 'context', 'selectorizor'], process.env.DEBUG ? "debug" : "info");

function Selectorizor(_x, _x2, _x3) {
  return _Selectorizor.apply(this, arguments);
}

function _Selectorizor() {
  _Selectorizor = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, context, _) {
    var key, instruction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = logger;
            _context.next = 3;
            return context.browser.evaluate(function () {
              return window.location.href;
            });

          case 3:
            _context.t1 = _context.sent;

            _context.t0.http.call(_context.t0, 'browser currently on %s', _context.t1);

            logger.debug("running selectorizor with options %o", options);

            for (key in options.selectors) {
              instruction = options.selectors[key]; //@ts-ignore

              instruction.fn = instruction.fn ? String(instruction.fn) : false;
            }

            _context.next = 9;
            return context.browser.evaluate(function (selectorizor) {
              //@ts-ignore
              var $ = window.$;
              var root = $(selectorizor.root);
              var results = [];
              root.each(function (i, e) {
                //@ts-ignore
                var dom = window.$(e);
                var result = {};

                var _loop = function _loop(_key) {
                  var instructions = selectorizor.selectors[_key];
                  var useTrim = instructions.trim ? instructions.trim : false;
                  var useHtml = instructions.html ? instructions.html : false;

                  if (instructions.selector && !instructions.attr) {
                    var el = dom.find(instructions.selector);
                    var text = el.text() ? el.text() : "";
                    var html = el.html() ? el.html() : "";

                    var _value = useHtml ? html : text;

                    _value = useTrim ? $.trim(_value) : _value;
                    result[_key] = _value;
                  }

                  if (instructions.selector && instructions.attr) {
                    result[_key] = dom.find(instructions.selector).attr(instructions.attr);
                  }

                  if (instructions.iterate) {
                    //@ts-ignore
                    result[_key] = dom.find(instructions.iterate).map(function (i, e) {
                      var el = $(e);
                      var text = el.text() ? el.text() : "";
                      var html = el.html() ? el.html() : "";
                      var value = useHtml ? html : text;
                      value = useTrim ? $.trim(value) : value;
                      return value;
                    }).get();
                  }

                  if (instructions.fn) {
                    var fn = function fn(value) {};

                    eval("fn = ".concat(instructions.fn));

                    if (instructions.iterate) {
                      result[_key] = result[_key].map(fn);
                    } else {
                      result[_key] = fn(result[_key]);
                    }
                  }
                };

                for (var _key in selectorizor.selectors) {
                  _loop(_key);
                }

                results.push(result);
              });
              return results;
            }, options);

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Selectorizor.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L3NlbGVjdG9yaXpvci9zZWxlY3Rvcml6b3IuZnVuY3Rpb24udHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiU2VsZWN0b3Jpem9yIiwib3B0aW9ucyIsImNvbnRleHQiLCJfIiwiYnJvd3NlciIsImV2YWx1YXRlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaHR0cCIsImRlYnVnIiwia2V5Iiwic2VsZWN0b3JzIiwiaW5zdHJ1Y3Rpb24iLCJmbiIsIlN0cmluZyIsInNlbGVjdG9yaXpvciIsIiQiLCJyb290IiwicmVzdWx0cyIsImVhY2giLCJpIiwiZSIsImRvbSIsInJlc3VsdCIsImluc3RydWN0aW9ucyIsInVzZVRyaW0iLCJ0cmltIiwidXNlSHRtbCIsImh0bWwiLCJzZWxlY3RvciIsImF0dHIiLCJlbCIsImZpbmQiLCJ0ZXh0IiwidmFsdWUiLCJpdGVyYXRlIiwibWFwIiwiZ2V0IiwiZXZhbCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7Ozs7Ozs7QUFHQSxJQUFNQSxNQUFNLEdBQUcsd0JBQU8sQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixjQUF2QixDQUFQLEVBQStDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsS0FBWixHQUFvQixPQUFwQixHQUE4QixNQUE3RSxDQUFmOztTQUVzQkMsWTs7Ozs7OzswQkFBZixpQkFBcUNDLE9BQXJDLEVBQXVEQyxPQUF2RCxFQUFvRkMsQ0FBcEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQ0xQLE1BREs7QUFBQTtBQUFBLG1CQUN3Q00sT0FBTyxDQUFDRSxPQUFSLENBQWdCQyxRQUFoQixDQUF5QjtBQUFBLHFCQUFNQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQXRCO0FBQUEsYUFBekIsQ0FEeEM7O0FBQUE7QUFBQTs7QUFBQSx3QkFDRUMsSUFERixtQkFDTyx5QkFEUDs7QUFFTGIsWUFBQUEs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XCIuLi9jb250ZXh0LmNsYXNzXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0ICQsIHsgfSBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJ0B1Z2VudS5pby9sb2dnZXInXG5pbXBvcnQgeyBFbGVjdHJvbGl6ZXJCdXMgfSBmcm9tIFwiQHVnZW51LmlvL2VsZWN0cm9saXplclwiO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoWydjcmF3bGVyJywgJ2NvbnRleHQnLCAnc2VsZWN0b3Jpem9yJ10sIHByb2Nlc3MuZW52LkRFQlVHID8gXCJkZWJ1Z1wiIDogXCJpbmZvXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gU2VsZWN0b3Jpem9yPE8sIEMsIFI+KG9wdGlvbnM6IE9wdGlvbnMsIGNvbnRleHQ6IENvbnRleHQuQ29udGV4dDxDPiwgXzogUik6IFByb21pc2U8UltdPntcbiAgbG9nZ2VyLmh0dHAoJ2Jyb3dzZXIgY3VycmVudGx5IG9uICVzJywgYXdhaXQgY29udGV4dC5icm93c2VyLmV2YWx1YXRlKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmICkpO1xuICBsb2dnZXIuZGVidWcoYHJ1bm5pbmcgc2VsZWN0b3Jpem9yIHdpdGggb3B0aW9ucyAlb2AsIG9wdGlvbnMpO1xuICBmb3IobGV0IGtleSBpbiBvcHRpb25zLnNlbGVjdG9ycyl7XG4gICAgbGV0IGluc3RydWN0aW9uID0gb3B0aW9ucy5zZWxlY3RvcnNba2V5XTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBpbnN0cnVjdGlvbi5mbiA9IGluc3RydWN0aW9uLmZuID8gU3RyaW5nKGluc3RydWN0aW9uLmZuKSA6IGZhbHNlO1xuICB9XG5cbiAgXG4gIHJldHVybiBhd2FpdCBjb250ZXh0LmJyb3dzZXIuZXZhbHVhdGUoZnVuY3Rpb24oc2VsZWN0b3Jpem9yOiBPcHRpb25zKXtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgJCA9IHdpbmRvdy4kIGFzIEpRdWVyeVN0YXRpYztcbiAgICBsZXQgcm9vdCA9ICQoc2VsZWN0b3Jpem9yLnJvb3QpO1xuICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgcm9vdC5lYWNoKGZ1bmN0aW9uKGksIGUpe1xuICAgICAgLy9AdHMtaWdub3JlXG4gICAgICBsZXQgZG9tID0gd2luZG93LiQoZSk7XG4gICAgICBsZXQgcmVzdWx0OiB7W3Byb3A6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgICAgZm9yKGxldCBrZXkgaW4gc2VsZWN0b3Jpem9yLnNlbGVjdG9ycyl7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbnMgPSBzZWxlY3Rvcml6b3Iuc2VsZWN0b3JzW2tleV07XG4gICAgICAgIGxldCB1c2VUcmltID0gaW5zdHJ1Y3Rpb25zLnRyaW0gPyBpbnN0cnVjdGlvbnMudHJpbSA6IGZhbHNlO1xuICAgICAgICBsZXQgdXNlSHRtbCA9IGluc3RydWN0aW9ucy5odG1sID8gaW5zdHJ1Y3Rpb25zLmh0bWwgOiBmYWxzZTtcblxuICAgICAgICBpZihpbnN0cnVjdGlvbnMuc2VsZWN0b3IgJiYgIWluc3RydWN0aW9ucy5hdHRyKXtcbiAgICAgICAgICBsZXQgZWwgPSBkb20uZmluZChpbnN0cnVjdGlvbnMuc2VsZWN0b3IpO1xuICAgICAgICAgIGxldCB0ZXh0ID0gZWwudGV4dCgpID8gZWwudGV4dCgpIDogXCJcIjtcbiAgICAgICAgICBsZXQgaHRtbCA9IGVsLmh0bWwoKSA/IGVsLmh0bWwoKSA6IFwiXCI7XG4gICAgICAgICAgbGV0IHZhbHVlID0gdXNlSHRtbCA/IGh0bWwgOiB0ZXh0O1xuICAgICAgICAgIHZhbHVlID0gdXNlVHJpbSA/ICQudHJpbSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaW5zdHJ1Y3Rpb25zLnNlbGVjdG9yICYmIGluc3RydWN0aW9ucy5hdHRyKXtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGRvbS5maW5kKGluc3RydWN0aW9ucy5zZWxlY3RvcikuYXR0cihpbnN0cnVjdGlvbnMuYXR0cik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpbnN0cnVjdGlvbnMuaXRlcmF0ZSl7XG4gICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBkb20uZmluZChpbnN0cnVjdGlvbnMuaXRlcmF0ZSkubWFwKGZ1bmN0aW9uKGksIGUpe1xuICAgICAgICAgICAgbGV0IGVsID0gJChlKTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWwudGV4dCgpID8gZWwudGV4dCgpIDogXCJcIjtcbiAgICAgICAgICAgIGxldCBodG1sID0gZWwuaHRtbCgpID8gZWwuaHRtbCgpIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHVzZUh0bWwgPyBodG1sIDogdGV4dDtcbiAgICAgICAgICAgIHZhbHVlID0gdXNlVHJpbSA/ICQudHJpbSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9KS5nZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluc3RydWN0aW9ucy5mbil7XG4gICAgICAgICAgbGV0IGZuOiAodmFsdWU6IGFueSkgPT4gYW55ID0gZnVuY3Rpb24odmFsdWU6IGFueSl7fVxuICAgICAgICAgIGV2YWwoYGZuID0gJHtpbnN0cnVjdGlvbnMuZm59YCk7XG5cbiAgICAgICAgICBpZihpbnN0cnVjdGlvbnMuaXRlcmF0ZSl7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHJlc3VsdFtrZXldLm1hcChmbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZm4ocmVzdWx0W2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0sIG9wdGlvbnMpO1xufVxuIl19
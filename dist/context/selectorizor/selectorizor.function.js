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
              var root = document.querySelectorAll(selectorizor.root);
              var results = [];
              root.forEach(function (e, i) {
                var dom = e;
                var result = {};

                var _loop = function _loop(_key) {
                  var instructions = selectorizor.selectors[_key];
                  var useTrim = instructions.trim ? instructions.trim : false;
                  var useHtml = instructions.html ? instructions.html : false;

                  if (instructions.selector && !instructions.attr) {
                    var el = dom.querySelector(instructions.selector);

                    if (el) {
                      var text = el.textContent ? el.textContent : "";
                      var html = el.innerHTML ? el.innerHTML : "";

                      var _value = useHtml ? html : text;

                      _value = useTrim ? _value.trim() : _value;
                      result[_key] = _value;
                    }
                  }

                  if (instructions.selector && instructions.attr) {
                    var _el = dom.querySelector(instructions.selector);

                    if (_el) {
                      result[_key] = _el.getAttribute(instructions.attr);
                    }
                  }

                  if (instructions.iterate) {
                    var els = dom.querySelectorAll(instructions.iterate);
                    var _value2 = [];
                    els.forEach(function (el, i) {
                      var text = el.textContent ? el.textContent : "";
                      var html = el.innerHTML ? el.innerHTML : "";
                      var innerValue = useHtml ? html : text;
                      innerValue = useTrim ? innerValue.trim() : innerValue;

                      _value2.push(innerValue);
                    });
                    result[_key] = _value2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L3NlbGVjdG9yaXpvci9zZWxlY3Rvcml6b3IuZnVuY3Rpb24udHMiXSwibmFtZXMiOlsibG9nZ2VyIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiU2VsZWN0b3Jpem9yIiwib3B0aW9ucyIsImNvbnRleHQiLCJfIiwiYnJvd3NlciIsImV2YWx1YXRlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaHR0cCIsImRlYnVnIiwia2V5Iiwic2VsZWN0b3JzIiwiaW5zdHJ1Y3Rpb24iLCJmbiIsIlN0cmluZyIsInNlbGVjdG9yaXpvciIsInJvb3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZXN1bHRzIiwiZm9yRWFjaCIsImUiLCJpIiwiZG9tIiwicmVzdWx0IiwiaW5zdHJ1Y3Rpb25zIiwidXNlVHJpbSIsInRyaW0iLCJ1c2VIdG1sIiwiaHRtbCIsInNlbGVjdG9yIiwiYXR0ciIsImVsIiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJ0ZXh0Q29udGVudCIsImlubmVySFRNTCIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiaXRlcmF0ZSIsImVscyIsImlubmVyVmFsdWUiLCJwdXNoIiwiZXZhbCIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUdBLElBQU1BLE1BQU0sR0FBRyx3QkFBTyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLGNBQXZCLENBQVAsRUFBK0NDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxLQUFaLEdBQW9CLE9BQXBCLEdBQThCLE1BQTdFLENBQWY7O1NBRXNCQyxZOzs7Ozs7OzBCQUFmLGlCQUFxQ0MsT0FBckMsRUFBdURDLE9BQXZELEVBQW9GQyxDQUFwRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFDTFAsTUFESztBQUFBO0FBQUEsbUJBQ3dDTSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JDLFFBQWhCLENBQXlCO0FBQUEscUJBQU1DLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBdEI7QUFBQSxhQUF6QixDQUR4Qzs7QUFBQTtBQUFBOztBQUFBLHdCQUNFQyxJQURGLG1CQUNPLHlCQURQOztBQUVMYixZQUFBQSxNQUFNLENBQUNjLEtBQVAseUNBQXFEVCxPQUFyRDs7QUFDQSxpQkFBUVUsR0FBUixJQUFlVixPQUFPLENBQUNXLFNBQXZCLEVBQWlDO0FBQzNCQyxjQUFBQSxXQUQyQixHQUNiWixPQUFPLENBQUNXLFNBQVIsQ0FBa0JELEdBQWxCLENBRGEsRUFFL0I7O0FBQ0FFLGNBQUFBLFdBQVcsQ0FBQ0MsRUFBWixHQUFpQkQsV0FBVyxDQUFDQyxFQUFaLEdBQWlCQyxNQUFNLENBQUNGLFdBQVcsQ0FBQ0MsRUFBYixDQUF2QixHQUEwQyxLQUEzRDtBQUNEOztBQVBJO0FBQUEsbUJBU1FaLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkMsUUFBaEIsQ0FBeUIsVUFBU1csWUFBVCxFQUErQjtBQUVuRSxrQkFBSUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCSCxZQUFZLENBQUNDLElBQXZDLENBQVg7QUFDQSxrQkFBSUcsT0FBYyxHQUFHLEVBQXJCO0FBRUFILGNBQUFBLElBQUksQ0FBQ0ksT0FBTCxDQUFhLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFjO0FBRXpCLG9CQUFJQyxHQUFHLEdBQUdGLENBQVY7QUFFQSxvQkFBSUcsTUFBNkIsR0FBRyxFQUFwQzs7QUFKeUIsMkNBTWpCZCxJQU5pQjtBQU92QixzQkFBSWUsWUFBWSxHQUFHVixZQUFZLENBQUNKLFNBQWIsQ0FBdUJELElBQXZCLENBQW5CO0FBQ0Esc0JBQUlnQixPQUFPLEdBQUdELFlBQVksQ0FBQ0UsSUFBYixHQUFvQkYsWUFBWSxDQUFDRSxJQUFqQyxHQUF3QyxLQUF0RDtBQUNBLHNCQUFJQyxPQUFPLEdBQUdILFlBQVksQ0FBQ0ksSUFBYixHQUFvQkosWUFBWSxDQUFDSSxJQUFqQyxHQUF3QyxLQUF0RDs7QUFFQSxzQkFBR0osWUFBWSxDQUFDSyxRQUFiLElBQXlCLENBQUNMLFlBQVksQ0FBQ00sSUFBMUMsRUFBK0M7QUFDN0Msd0JBQUlDLEVBQUUsR0FBR1QsR0FBRyxDQUFDVSxhQUFKLENBQWtCUixZQUFZLENBQUNLLFFBQS9CLENBQVQ7O0FBQ0Esd0JBQUdFLEVBQUgsRUFBTTtBQUNKLDBCQUFJRSxJQUFJLEdBQUdGLEVBQUUsQ0FBQ0csV0FBSCxHQUFpQkgsRUFBRSxDQUFDRyxXQUFwQixHQUFrQyxFQUE3QztBQUNBLDBCQUFJTixJQUFJLEdBQUdHLEVBQUUsQ0FBQ0ksU0FBSCxHQUFlSixFQUFFLENBQUNJLFNBQWxCLEdBQThCLEVBQXpDOztBQUNBLDBCQUFJQyxNQUFLLEdBQUdULE9BQU8sR0FBR0MsSUFBSCxHQUFVSyxJQUE3Qjs7QUFDQUcsc0JBQUFBLE1BQUssR0FBR1gsT0FBTyxHQUFHVyxNQUFLLENBQUNWLElBQU4sRUFBSCxHQUFrQlUsTUFBakM7QUFDQWIsc0JBQUFBLE1BQU0sQ0FBQ2QsSUFBRCxDQUFOLEdBQWMyQixNQUFkO0FBQ0Q7QUFDRjs7QUFFRCxzQkFBR1osWUFBWSxDQUFDSyxRQUFiLElBQXlCTCxZQUFZLENBQUNNLElBQXpDLEVBQThDO0FBQzVDLHdCQUFJQyxHQUFFLEdBQUdULEdBQUcsQ0FBQ1UsYUFBSixDQUFrQlIsWUFBWSxDQUFDSyxRQUEvQixDQUFUOztBQUNBLHdCQUFHRSxHQUFILEVBQU07QUFDSlIsc0JBQUFBLE1BQU0sQ0FBQ2QsSUFBRCxDQUFOLEdBQWNzQixHQUFFLENBQUNNLFlBQUgsQ0FBZ0JiLFlBQVksQ0FBQ00sSUFBN0IsQ0FBZDtBQUNEO0FBQ0Y7O0FBRUQsc0JBQUdOLFlBQVksQ0FBQ2MsT0FBaEIsRUFBd0I7QUFDdEIsd0JBQUlDLEdBQUcsR0FBR2pCLEdBQUcsQ0FBQ0wsZ0JBQUosQ0FBcUJPLFlBQVksQ0FBQ2MsT0FBbEMsQ0FBVjtBQUVBLHdCQUFJRixPQUFlLEdBQUcsRUFBdEI7QUFFQUcsb0JBQUFBLEdBQUcsQ0FBQ3BCLE9BQUosQ0FBWSxVQUFDWSxFQUFELEVBQUtWLENBQUwsRUFBVztBQUNyQiwwQkFBSVksSUFBSSxHQUFHRixFQUFFLENBQUNHLFdBQUgsR0FBaUJILEVBQUUsQ0FBQ0csV0FBcEIsR0FBa0MsRUFBN0M7QUFDQSwwQkFBSU4sSUFBSSxHQUFHRyxFQUFFLENBQUNJLFNBQUgsR0FBZUosRUFBRSxDQUFDSSxTQUFsQixHQUE4QixFQUF6QztBQUNBLDBCQUFJSyxVQUFVLEdBQUdiLE9BQU8sR0FBR0MsSUFBSCxHQUFVSyxJQUFsQztBQUNBTyxzQkFBQUEsVUFBVSxHQUFHZixPQUFPLEdBQUdlLFVBQVUsQ0FBQ2QsSUFBWCxFQUFILEdBQXVCYyxVQUEzQzs7QUFDQUosc0JBQUFBLE9BQUssQ0FBQ0ssSUFBTixDQUFXRCxVQUFYO0FBQ0QscUJBTkQ7QUFRQWpCLG9CQUFBQSxNQUFNLENBQUNkLElBQUQsQ0FBTixHQUFjMkIsT0FBZDtBQUNEOztBQUVELHNCQUFHWixZQUFZLENBQUNaLEVBQWhCLEVBQW1CO0FBQ2pCLHdCQUFJQSxFQUF1QixHQUFHLFNBQTFCQSxFQUEwQixDQUFTd0IsS0FBVCxFQUFvQixDQUFFLENBQXBEOztBQUNBTSxvQkFBQUEsSUFBSSxnQkFBU2xCLFlBQVksQ0FBQ1osRUFBdEIsRUFBSjs7QUFFQSx3QkFBR1ksWUFBWSxDQUFDYyxPQUFoQixFQUF3QjtBQUN0QmYsc0JBQUFBLE1BQU0sQ0FBQ2QsSUFBRCxDQUFOLEdBQWNjLE1BQU0sQ0FBQ2QsSUFBRCxDQUFOLENBQVlrQyxHQUFaLENBQWdCL0IsRUFBaEIsQ0FBZDtBQUNELHFCQUZELE1BRU87QUFDTFcsc0JBQUFBLE1BQU0sQ0FBQ2QsSUFBRCxDQUFOLEdBQWNHLEVBQUUsQ0FBQ1csTUFBTSxDQUFDZCxJQUFELENBQVAsQ0FBaEI7QUFDRDtBQUNGO0FBdERzQjs7QUFNekIscUJBQUksSUFBSUEsSUFBUixJQUFlSyxZQUFZLENBQUNKLFNBQTVCLEVBQXNDO0FBQUEsd0JBQTlCRCxJQUE4QjtBQWlEckM7O0FBRURTLGdCQUFBQSxPQUFPLENBQUN1QixJQUFSLENBQWFsQixNQUFiO0FBQ0QsZUExREQ7QUE0REEscUJBQU9MLE9BQVA7QUFDRCxhQWxFWSxFQWtFVm5CLE9BbEVVLENBVFI7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ29udGV4dCBmcm9tIFwiLi4vY29udGV4dC5jbGFzc1wiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSAnQHVnZW51LmlvL2xvZ2dlcidcblxuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoWydjcmF3bGVyJywgJ2NvbnRleHQnLCAnc2VsZWN0b3Jpem9yJ10sIHByb2Nlc3MuZW52LkRFQlVHID8gXCJkZWJ1Z1wiIDogXCJpbmZvXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gU2VsZWN0b3Jpem9yPE8sIEMsIFI+KG9wdGlvbnM6IE9wdGlvbnMsIGNvbnRleHQ6IENvbnRleHQuQ29udGV4dDxDPiwgXzogUik6IFByb21pc2U8UltdPntcbiAgbG9nZ2VyLmh0dHAoJ2Jyb3dzZXIgY3VycmVudGx5IG9uICVzJywgYXdhaXQgY29udGV4dC5icm93c2VyLmV2YWx1YXRlKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmICkpO1xuICBsb2dnZXIuZGVidWcoYHJ1bm5pbmcgc2VsZWN0b3Jpem9yIHdpdGggb3B0aW9ucyAlb2AsIG9wdGlvbnMpO1xuICBmb3IobGV0IGtleSBpbiBvcHRpb25zLnNlbGVjdG9ycyl7XG4gICAgbGV0IGluc3RydWN0aW9uID0gb3B0aW9ucy5zZWxlY3RvcnNba2V5XTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBpbnN0cnVjdGlvbi5mbiA9IGluc3RydWN0aW9uLmZuID8gU3RyaW5nKGluc3RydWN0aW9uLmZuKSA6IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IGNvbnRleHQuYnJvd3Nlci5ldmFsdWF0ZShmdW5jdGlvbihzZWxlY3Rvcml6b3I6IE9wdGlvbnMpe1xuXG4gICAgbGV0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yaXpvci5yb290KTtcbiAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgIHJvb3QuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgIFxuICAgICAgbGV0IGRvbSA9IGU7XG5cbiAgICAgIGxldCByZXN1bHQ6IHtbcHJvcDogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmb3IobGV0IGtleSBpbiBzZWxlY3Rvcml6b3Iuc2VsZWN0b3JzKXtcbiAgICAgICAgbGV0IGluc3RydWN0aW9ucyA9IHNlbGVjdG9yaXpvci5zZWxlY3RvcnNba2V5XTtcbiAgICAgICAgbGV0IHVzZVRyaW0gPSBpbnN0cnVjdGlvbnMudHJpbSA/IGluc3RydWN0aW9ucy50cmltIDogZmFsc2U7XG4gICAgICAgIGxldCB1c2VIdG1sID0gaW5zdHJ1Y3Rpb25zLmh0bWwgPyBpbnN0cnVjdGlvbnMuaHRtbCA6IGZhbHNlO1xuXG4gICAgICAgIGlmKGluc3RydWN0aW9ucy5zZWxlY3RvciAmJiAhaW5zdHJ1Y3Rpb25zLmF0dHIpe1xuICAgICAgICAgIGxldCBlbCA9IGRvbS5xdWVyeVNlbGVjdG9yKGluc3RydWN0aW9ucy5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYoZWwpe1xuICAgICAgICAgICAgbGV0IHRleHQgPSBlbC50ZXh0Q29udGVudCA/IGVsLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgICAgIGxldCBodG1sID0gZWwuaW5uZXJIVE1MID8gZWwuaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHVzZUh0bWwgPyBodG1sIDogdGV4dDtcbiAgICAgICAgICAgIHZhbHVlID0gdXNlVHJpbSA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihpbnN0cnVjdGlvbnMuc2VsZWN0b3IgJiYgaW5zdHJ1Y3Rpb25zLmF0dHIpe1xuICAgICAgICAgIGxldCBlbCA9IGRvbS5xdWVyeVNlbGVjdG9yKGluc3RydWN0aW9ucy5zZWxlY3Rvcik7XG4gICAgICAgICAgaWYoZWwpe1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbC5nZXRBdHRyaWJ1dGUoaW5zdHJ1Y3Rpb25zLmF0dHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluc3RydWN0aW9ucy5pdGVyYXRlKXtcbiAgICAgICAgICBsZXQgZWxzID0gZG9tLnF1ZXJ5U2VsZWN0b3JBbGwoaW5zdHJ1Y3Rpb25zLml0ZXJhdGUpO1xuICAgICAgICAgIFxuICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBlbC50ZXh0Q29udGVudCA/IGVsLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgICAgIGxldCBodG1sID0gZWwuaW5uZXJIVE1MID8gZWwuaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgICAgICAgIGxldCBpbm5lclZhbHVlID0gdXNlSHRtbCA/IGh0bWwgOiB0ZXh0O1xuICAgICAgICAgICAgaW5uZXJWYWx1ZSA9IHVzZVRyaW0gPyBpbm5lclZhbHVlLnRyaW0oKSA6IGlubmVyVmFsdWU7XG4gICAgICAgICAgICB2YWx1ZS5wdXNoKGlubmVyVmFsdWUpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluc3RydWN0aW9ucy5mbil7XG4gICAgICAgICAgbGV0IGZuOiAodmFsdWU6IGFueSkgPT4gYW55ID0gZnVuY3Rpb24odmFsdWU6IGFueSl7fVxuICAgICAgICAgIGV2YWwoYGZuID0gJHtpbnN0cnVjdGlvbnMuZm59YCk7XG5cbiAgICAgICAgICBpZihpbnN0cnVjdGlvbnMuaXRlcmF0ZSl7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHJlc3VsdFtrZXldLm1hcChmbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZm4ocmVzdWx0W2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0sIG9wdGlvbnMpO1xufVxuIl19
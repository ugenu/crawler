"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Crawler = void 0;

var _context2 = require("./context");

var _runner = require("./runner");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * the crawler class, simplified and ready to use
 */
var Crawler =
/*#__PURE__*/
function () {
  function Crawler(options) {
    _classCallCheck(this, Crawler);

    this.options = options;

    _defineProperty(this, "context", new _context2.Context(this.options));

    _defineProperty(this, "runner", _runner.Runner);

    _defineProperty(this, "routines", {
      setup: [],
      crawl: [],
      paginate: []
    });
  }
  /** the shared context object, gets refreshed each run for memory sake */


  _createClass(Crawler, [{
    key: "setup",

    /**
     * add a setup middleware that will run ONCE before crawling
     * @example
     *  crawler.setup(async context => {
     *    // perform any login or form submission
     *  });
     * @param routine 
     */
    value: function setup(routine) {
      this.routines.setup.push(routine);
    }
    /**
     * add a crawl middleware that will run in order of insertion
     * any manipulation of the data can be done here and that is what .run() will return
     * @example
     *  crawler.crawl(async context => {
     *    //make any requests that extract data 
     *    context.data.push(result);
     *  });
     * @param routine 
     */

  }, {
    key: "crawl",
    value: function crawl(routine) {
      this.routines.crawl.push(routine);
    }
    /**
     * add a pagination middleware that will determine if you should crawl again
     * return TRUE if you want to crawl again (last middleware should return true as well)
     * return false if there is no need to perform the crawl routine(s) again
     * also use this to navigate to the next page for results by clicking any links/submitting any forms within the browser or http context
     * @example
     *  crawler.paginate(async context => {
     *    if(context.data.length > 30){ return true; }
     *    await context.browser.click('.next-page').wait('.results');
     *    return false;
     *  });
     * @param routine 
     */

  }, {
    key: "paginate",
    value: function paginate(routine) {
      this.routines.paginate.push(routine);
    }
    /**
     * runs the crawler routine applying the shared context and returning the data
     * will probably impliment metrics to return that instead
     */

  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var runner;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.context.reset();

              case 2:
                runner = new this.runner(this.routines);
                _context.next = 5;
                return runner.runContext(this.context);

              case 5:
                return _context.abrupt("return", this.context.data);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Crawler;
}();

exports.Crawler = Crawler;
var _default = Crawler;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmF3bGVyLmNsYXNzLnRzIl0sIm5hbWVzIjpbIkNyYXdsZXIiLCJvcHRpb25zIiwiQ29udGV4dCIsIlJ1bm5lciIsInNldHVwIiwiY3Jhd2wiLCJwYWdpbmF0ZSIsInJvdXRpbmUiLCJyb3V0aW5lcyIsInB1c2giLCJjb250ZXh0IiwicmVzZXQiLCJydW5uZXIiLCJydW5Db250ZXh0IiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHYUEsTzs7O0FBQ1gsbUJBQXNCQyxPQUF0QixFQUFpRDtBQUFBOztBQUFBLFNBQTNCQSxPQUEyQixHQUEzQkEsT0FBMkI7O0FBQUEscUNBRzlCLElBQUlDLGlCQUFKLENBQVksS0FBS0QsT0FBakIsQ0FIOEI7O0FBQUEsb0NBTXpCRSxjQU55Qjs7QUFBQSxzQ0FRakI7QUFDOUJDLE1BQUFBLEtBQUssRUFBRSxFQUR1QjtBQUU5QkMsTUFBQUEsS0FBSyxFQUFFLEVBRnVCO0FBRzlCQyxNQUFBQSxRQUFRLEVBQUU7QUFIb0IsS0FSaUI7QUFBRTtBQUVuRDs7Ozs7O0FBWUE7Ozs7Ozs7OzBCQVFNQyxPLEVBQTZCO0FBQ2pDLFdBQUtDLFFBQUwsQ0FBY0osS0FBZCxDQUFvQkssSUFBcEIsQ0FBeUJGLE9BQXpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7OzswQkFVTUEsTyxFQUE2QjtBQUNqQyxXQUFLQyxRQUFMLENBQWNILEtBQWQsQ0FBb0JJLElBQXBCLENBQXlCRixPQUF6QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBYVNBLE8sRUFBZ0M7QUFDdkMsV0FBS0MsUUFBTCxDQUFjRixRQUFkLENBQXVCRyxJQUF2QixDQUE0QkYsT0FBNUI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFLUSxLQUFLRyxPQUFMLENBQWFDLEtBQWIsRTs7O0FBQ0ZDLGdCQUFBQSxNLEdBQVMsSUFBSSxLQUFLQSxNQUFULENBQWdCLEtBQUtKLFFBQXJCLEM7O3VCQUNQSSxNQUFNLENBQUNDLFVBQVAsQ0FBa0IsS0FBS0gsT0FBdkIsQzs7O2lEQUNDLEtBQUtBLE9BQUwsQ0FBYUksSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUlUZCxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCwgT3B0aW9ucyBhcyBDb250ZXh0T3B0aW9ucyB9IGZyb20gXCIuL2NvbnRleHRcIjtcbmltcG9ydCB7IFJvdXRpbmVzLCBNaWRkbGV3YXJlIH0gZnJvbSAnLi9yb3V0aW5lJztcbmltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vcnVubmVyJztcblxuLyoqXG4gKiB0aGUgY3Jhd2xlciBjbGFzcywgc2ltcGxpZmllZCBhbmQgcmVhZHkgdG8gdXNlXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmF3bGVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IENvbnRleHRPcHRpb25zPFQ+KXt9XG5cbiAgLyoqIHRoZSBzaGFyZWQgY29udGV4dCBvYmplY3QsIGdldHMgcmVmcmVzaGVkIGVhY2ggcnVuIGZvciBtZW1vcnkgc2FrZSAqL1xuICByZWFkb25seSBjb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5vcHRpb25zKTtcblxuICAvKiogdGhlIHJ1bm5lciBjbGFzcyB0aGF0IHdlIHdpbGwgYmUgdXNpbmcgdG8gcnVuIHRoZSByb3V0aW5lczsgb3ZlcnJpZGFibGUgKi9cbiAgcnVubmVyOiB0eXBlb2YgUnVubmVyID0gUnVubmVyO1xuXG4gIHByaXZhdGUgcm91dGluZXM6IFJvdXRpbmVzPFQ+ID0ge1xuICAgIHNldHVwOiBbXSxcbiAgICBjcmF3bDogW10sXG4gICAgcGFnaW5hdGU6IFtdLFxuICB9O1xuXG4gIC8qKlxuICAgKiBhZGQgYSBzZXR1cCBtaWRkbGV3YXJlIHRoYXQgd2lsbCBydW4gT05DRSBiZWZvcmUgY3Jhd2xpbmdcbiAgICogQGV4YW1wbGVcbiAgICogIGNyYXdsZXIuc2V0dXAoYXN5bmMgY29udGV4dCA9PiB7XG4gICAqICAgIC8vIHBlcmZvcm0gYW55IGxvZ2luIG9yIGZvcm0gc3VibWlzc2lvblxuICAgKiAgfSk7XG4gICAqIEBwYXJhbSByb3V0aW5lIFxuICAgKi9cbiAgc2V0dXAocm91dGluZTogTWlkZGxld2FyZTx2b2lkLCBUPil7XG4gICAgdGhpcy5yb3V0aW5lcy5zZXR1cC5wdXNoKHJvdXRpbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIGNyYXdsIG1pZGRsZXdhcmUgdGhhdCB3aWxsIHJ1biBpbiBvcmRlciBvZiBpbnNlcnRpb25cbiAgICogYW55IG1hbmlwdWxhdGlvbiBvZiB0aGUgZGF0YSBjYW4gYmUgZG9uZSBoZXJlIGFuZCB0aGF0IGlzIHdoYXQgLnJ1bigpIHdpbGwgcmV0dXJuXG4gICAqIEBleGFtcGxlXG4gICAqICBjcmF3bGVyLmNyYXdsKGFzeW5jIGNvbnRleHQgPT4ge1xuICAgKiAgICAvL21ha2UgYW55IHJlcXVlc3RzIHRoYXQgZXh0cmFjdCBkYXRhIFxuICAgKiAgICBjb250ZXh0LmRhdGEucHVzaChyZXN1bHQpO1xuICAgKiAgfSk7XG4gICAqIEBwYXJhbSByb3V0aW5lIFxuICAgKi9cbiAgY3Jhd2wocm91dGluZTogTWlkZGxld2FyZTx2b2lkLCBUPil7XG4gICAgdGhpcy5yb3V0aW5lcy5jcmF3bC5wdXNoKHJvdXRpbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHBhZ2luYXRpb24gbWlkZGxld2FyZSB0aGF0IHdpbGwgZGV0ZXJtaW5lIGlmIHlvdSBzaG91bGQgY3Jhd2wgYWdhaW5cbiAgICogcmV0dXJuIFRSVUUgaWYgeW91IHdhbnQgdG8gY3Jhd2wgYWdhaW4gKGxhc3QgbWlkZGxld2FyZSBzaG91bGQgcmV0dXJuIHRydWUgYXMgd2VsbClcbiAgICogcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIG5vIG5lZWQgdG8gcGVyZm9ybSB0aGUgY3Jhd2wgcm91dGluZShzKSBhZ2FpblxuICAgKiBhbHNvIHVzZSB0aGlzIHRvIG5hdmlnYXRlIHRvIHRoZSBuZXh0IHBhZ2UgZm9yIHJlc3VsdHMgYnkgY2xpY2tpbmcgYW55IGxpbmtzL3N1Ym1pdHRpbmcgYW55IGZvcm1zIHdpdGhpbiB0aGUgYnJvd3NlciBvciBodHRwIGNvbnRleHRcbiAgICogQGV4YW1wbGVcbiAgICogIGNyYXdsZXIucGFnaW5hdGUoYXN5bmMgY29udGV4dCA9PiB7XG4gICAqICAgIGlmKGNvbnRleHQuZGF0YS5sZW5ndGggPiAzMCl7IHJldHVybiB0cnVlOyB9XG4gICAqICAgIGF3YWl0IGNvbnRleHQuYnJvd3Nlci5jbGljaygnLm5leHQtcGFnZScpLndhaXQoJy5yZXN1bHRzJyk7XG4gICAqICAgIHJldHVybiBmYWxzZTtcbiAgICogIH0pO1xuICAgKiBAcGFyYW0gcm91dGluZSBcbiAgICovXG4gIHBhZ2luYXRlKHJvdXRpbmU6IE1pZGRsZXdhcmU8Ym9vbGVhbiwgVD4pe1xuICAgIHRoaXMucm91dGluZXMucGFnaW5hdGUucHVzaChyb3V0aW5lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBydW5zIHRoZSBjcmF3bGVyIHJvdXRpbmUgYXBwbHlpbmcgdGhlIHNoYXJlZCBjb250ZXh0IGFuZCByZXR1cm5pbmcgdGhlIGRhdGFcbiAgICogd2lsbCBwcm9iYWJseSBpbXBsaW1lbnQgbWV0cmljcyB0byByZXR1cm4gdGhhdCBpbnN0ZWFkXG4gICAqL1xuICBhc3luYyBydW4oKTogUHJvbWlzZTxUPntcbiAgICBhd2FpdCB0aGlzLmNvbnRleHQucmVzZXQoKTtcbiAgICBsZXQgcnVubmVyID0gbmV3IHRoaXMucnVubmVyKHRoaXMucm91dGluZXMpO1xuICAgIGF3YWl0IHJ1bm5lci5ydW5Db250ZXh0KHRoaXMuY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5kYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyYXdsZXI7Il19
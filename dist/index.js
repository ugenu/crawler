"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Crawler", {
  enumerable: true,
  get: function get() {
    return _crawler.Crawler;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _crawler["default"];
  }
});
exports.Runner = exports.Context = exports.Routine = void 0;

var Routine = _interopRequireWildcard(require("./routine"));

exports.Routine = Routine;

var Context = _interopRequireWildcard(require("./context"));

exports.Context = Context;

var Runner = _interopRequireWildcard(require("./runner"));

exports.Runner = Runner;

var _crawler = _interopRequireWildcard(require("./crawler.class"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJvdXRpbmUgZnJvbSAnLi9yb3V0aW5lJ1xuaW1wb3J0ICogYXMgQ29udGV4dCBmcm9tICcuL2NvbnRleHQnXG5pbXBvcnQgKiBhcyBSdW5uZXIgZnJvbSAnLi9ydW5uZXInXG5cbmV4cG9ydCB7IENyYXdsZXIsIGRlZmF1bHQgYXMgZGVmYXVsdCB9IGZyb20gJy4vY3Jhd2xlci5jbGFzcydcblxuZXhwb3J0IHtcbiAgUm91dGluZSxcbiAgQ29udGV4dCxcbiAgUnVubmVyXG59Il19
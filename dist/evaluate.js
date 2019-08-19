"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Evaluate(fn, callback) {
    var self = this;
    var cb = callback;
    var options = {};
    if (arguments.length === 3) {
        cb = arguments[2];
        options = arguments[1];
    }
    self
        //@ts-ignore
        .evaluate(fn, options)
        .then(function (result) {
        return cb(undefined, result);
    })
        .catch(cb);
}
exports.Evaluate = Evaluate;
exports.default = Evaluate;

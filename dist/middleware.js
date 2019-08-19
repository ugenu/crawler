"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("async");
var Middleware = /** @class */ (function () {
    function Middleware() {
        this.instructions = [];
    }
    Object.defineProperty(Middleware.prototype, "length", {
        get: function () {
            return this.instructions.length;
        },
        enumerable: true,
        configurable: true
    });
    Middleware.prototype.use = function (instruction) {
        if (Array.isArray(instruction)) {
            return instruction.forEach(this.use.bind(this));
        }
        if (typeof instruction !== "function") {
            throw new Error('instruction must be a function');
        }
        this.instructions.push(instruction);
    };
    Middleware.prototype.middlewareCallbackHandler = function (context, callback, error, options) {
        if (error) {
            return callback(error);
        }
        if (options) {
            if (options.restart) {
                return this.run(context, callback);
            }
        }
        return callback();
    };
    Middleware.prototype.middlewareIterator = function (context, instruction, callback) {
        try {
            instruction(context, this.middlewareCallbackHandler.bind(this, context, callback));
        }
        catch (error) {
            return callback(error);
        }
    };
    Middleware.prototype.run = function (context, callback) {
        async_1.eachSeries(this.instructions, this.middlewareIterator.bind(this, context), callback);
    };
    return Middleware;
}());
exports.Middleware = Middleware;
exports.default = Middleware;

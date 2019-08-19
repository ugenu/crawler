"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nightmare_1 = __importDefault(require("nightmare"));
var extend_1 = __importDefault(require("extend"));
var evaluate_1 = require("./evaluate");
function MiddlewareContext(crawlerOptions, contextOptions) {
    var shared = {
        session: new nightmare_1.default(crawlerOptions.nightmare),
        evaluate: function () { }
    };
    shared.evaluate = evaluate_1.Evaluate.bind(shared.session);
    return extend_1.default(true, shared, contextOptions);
}
exports.MiddlewareContext = MiddlewareContext;
exports.default = MiddlewareContext;

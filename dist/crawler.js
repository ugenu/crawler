"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var middleware_1 = __importDefault(require("./middleware"));
var extend_1 = __importDefault(require("extend"));
var async_1 = require("async");
var context_1 = require("./context");
var Crawler = /** @class */ (function (_super) {
    __extends(Crawler, _super);
    /**
     * constructs the crawler object
     * @param options
     */
    function Crawler(options) {
        var _this = _super.call(this) || this;
        /**
         * our public middleware instructions separated by steps
         */
        _this.setup = new middleware_1.default();
        _this.crawl = new middleware_1.default();
        _this.teardown = new middleware_1.default();
        /**
         * our options object
         */
        _this.options = _this.defaultOptions;
        _this.options = extend_1.default(true, _this.defaultOptions, options);
        return _this;
    }
    Object.defineProperty(Crawler.prototype, "defaultOptions", {
        /**
         * our default options
         */
        get: function () {
            return {
                nightmare: {},
            };
        },
        enumerable: true,
        configurable: true
    });
    Crawler.prototype.teardownAddition = function (context, callback) {
        context.session.end().then(callback).catch(callback);
    };
    Crawler.prototype.runMiddleware = function (context, middleware, index, callback) {
        middleware.run(context, callback);
    };
    Crawler.prototype.prepareForRun = function () {
        this.teardown.use(this.teardownAddition);
    };
    Crawler.prototype.run = function (contextOptions, callback) {
        var context = context_1.MiddlewareContext(this.options, contextOptions);
        this.prepareForRun();
        async_1.eachOfSeries([this.setup, this.crawl, this.teardown], this.runMiddleware.bind(this, context), function (error) {
            return callback(error, context);
        });
    };
    return Crawler;
}(events_1.EventEmitter));
exports.Crawler = Crawler;
exports.default = Crawler;

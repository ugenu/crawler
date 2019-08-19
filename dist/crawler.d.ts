/// <reference types="node" />
import { EventEmitter } from "events";
import Middleware from "./middleware";
import { IConstructorOptions } from "nightmare";
import { MiddlewareContext } from "./context";
export interface CrawlerRunCallback {
    (error: Error | undefined | null, context: MiddlewareContext): void;
}
export interface CrawlerConstructorOptions {
    [prop: string]: any;
    nightmare?: IConstructorOptions;
}
export interface CrawlerSteps {
    setup: Middleware;
    crawl: Middleware;
    teardown: Middleware;
}
export declare class Crawler extends EventEmitter {
    /**
     * our public middleware instructions separated by steps
     */
    setup: Middleware;
    crawl: Middleware;
    teardown: Middleware;
    /**
     * our options object
     */
    options: CrawlerConstructorOptions;
    /**
     * constructs the crawler object
     * @param options
     */
    constructor(options?: CrawlerConstructorOptions);
    /**
     * our default options
     */
    private readonly defaultOptions;
    private teardownAddition;
    private runMiddleware;
    private prepareForRun;
    run(contextOptions: {
        [prop: string]: any;
    }, callback: CrawlerRunCallback): void;
}
export default Crawler;
